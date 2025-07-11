import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
  clearError: () => void;
}

interface User {
  id: string;
  email: string;
  name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
    // Simulate checking for existing auth token
    const checkAuthStatus = async () => {
      try {
        // For demo purposes, set as authenticated
        setIsAuthenticated(true);
        setUser({
          id: "1",
          email: "john.doe@example.com",
          name: "John Doe",
        });
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate login API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsAuthenticated(true);
      setUser({
        id: "1",
        email,
        name: "John Doe",
      });
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate registration API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsAuthenticated(true);
      setUser({
        id: "1",
        email,
        name,
      });
    } catch (error) {
      setError("Registration failed. Please try again.");
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        user,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
