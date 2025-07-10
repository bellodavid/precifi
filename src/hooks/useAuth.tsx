/**
 * Authentication Hook
 * 
 * Custom hook for managing authentication state and operations
 */

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { apiClient } from '../api/client';
import { logger } from '../utils/logger';
import { env, isDev } from '../config/env';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: LoginCredentials & { name: string }) => Promise<void>;
  clearError: () => void;
}

const TOKEN_STORAGE_KEY = 'auth_token';
const USER_STORAGE_KEY = 'auth_user';

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider hook that creates auth object and handles state
function useProvideAuth(): AuthContextType {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Load stored authentication data on startup
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_STORAGE_KEY),
          SecureStore.getItemAsync(USER_STORAGE_KEY),
        ]);

        if (storedToken && storedUser) {
          const user = JSON.parse(storedUser) as User;
          apiClient.setAuthToken(storedToken);
          
          setState({
            user,
            token: storedToken,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
          
          logger.info('Restored authentication from storage');
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        logger.error('Failed to load authentication from storage', error);
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: 'Failed to restore session'
        }));
      }
    };

    loadStoredAuth();
  }, []);

  const storeAuthData = async (token: string, user: User) => {
    try {
      await Promise.all([
        SecureStore.setItemAsync(TOKEN_STORAGE_KEY, token),
        SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user)),
      ]);
    } catch (error) {
      logger.error('Failed to store authentication data', error);
    }
  };

  const clearStoredAuthData = async () => {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY),
        SecureStore.deleteItemAsync(USER_STORAGE_KEY),
      ]);
    } catch (error) {
      logger.error('Failed to clear authentication data', error);
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      let token: string;
      let user: User;
      
      if (isDev) {
        // Mock authentication for development
        logger.debug('Using mock authentication for development');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock user and token
        token = 'mock-token-' + Date.now();
        user = {
          id: 'mock-user-id',
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'User',
        };
        
        logger.debug('Mock login successful', { user });
      } else {
        // Real API call for production
        const response = await apiClient.post<{ token: string; user: User }>('/auth/login', credentials);
        ({ token, user } = response);
      }
      
      // Set token in API client
      apiClient.setAuthToken(token);
      
      // Store auth data securely
      await storeAuthData(token, user);
      
      setState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      logger.info('User logged in successfully', { userId: user.id });
    } catch (error: any) {
      logger.error('Login failed', error);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isAuthenticated: false,
        error: error.message || 'Failed to login. Please try again.'
      }));
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Clear token from API client
      apiClient.clearAuthToken();
      
      // Clear stored auth data
      await clearStoredAuthData();
      
      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
      
      logger.info('User logged out successfully');
    } catch (error) {
      logger.error('Logout failed', error);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: 'Failed to logout. Please try again.'
      }));
    }
  }, []);

  const register = useCallback(async (userData: LoginCredentials & { name: string }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      let token: string;
      let user: User;
      
      if (isDev) {
        // Mock authentication for development
        logger.debug('Using mock authentication for development');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock user and token
        token = 'mock-token-' + Date.now();
        user = {
          id: 'mock-user-id',
          email: userData.email,
          name: userData.name,
        };
        
        logger.debug('Mock registration successful', { user });
      } else {
        // Real API call for production
        const response = await apiClient.post<{ token: string; user: User }>('/auth/register', userData);
        ({ token, user } = response);
      }
      
      // Set token in API client
      apiClient.setAuthToken(token);
      
      // Store auth data securely
      await storeAuthData(token, user);
      
      setState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      
      logger.info('User registered successfully', { userId: user.id });
    } catch (error: any) {
      logger.error('Registration failed', error);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error.message || 'Failed to register. Please try again.'
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    register,
    clearError,
  };
}
