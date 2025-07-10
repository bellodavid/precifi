/**
 * API Client
 * 
 * A centralized API client for making HTTP requests
 */

import { env } from '../config/env';
import { logger } from '../utils/logger';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  setAuthToken(token: string): void {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }

  clearAuthToken(): void {
    const headers = { ...this.defaultHeaders };
    delete headers['Authorization'];
    this.defaultHeaders = headers;
  }

  private createUrl(endpoint: string, options?: RequestOptions): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (options?.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    
    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    const data = isJson ? await response.json() : await response.text();
    
    if (!response.ok) {
      const message = isJson && data.message ? data.message : `API Error: ${response.status}`;
      logger.error(`API Error: ${response.status}`, data);
      throw new ApiError(message, response.status, data);
    }
    
    return data as T;
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.createUrl(endpoint, options);
    
    try {
      logger.debug(`GET ${endpoint}`, options?.params);
      
      const controller = new AbortController();
      const timeoutId = options?.timeout 
        ? setTimeout(() => controller.abort(), options.timeout) 
        : null;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.defaultHeaders,
        signal: controller.signal,
        ...options,
      });
      
      if (timeoutId) clearTimeout(timeoutId);
      
      return this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`GET ${endpoint} failed`, error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    const url = this.createUrl(endpoint, options);
    
    try {
      logger.debug(`POST ${endpoint}`, { body: data, params: options?.params });
      
      const controller = new AbortController();
      const timeoutId = options?.timeout 
        ? setTimeout(() => controller.abort(), options.timeout) 
        : null;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: this.defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      });
      
      if (timeoutId) clearTimeout(timeoutId);
      
      return this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`POST ${endpoint} failed`, error);
      throw error;
    }
  }

  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    const url = this.createUrl(endpoint, options);
    
    try {
      logger.debug(`PUT ${endpoint}`, { body: data, params: options?.params });
      
      const controller = new AbortController();
      const timeoutId = options?.timeout 
        ? setTimeout(() => controller.abort(), options.timeout) 
        : null;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: this.defaultHeaders,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
        ...options,
      });
      
      if (timeoutId) clearTimeout(timeoutId);
      
      return this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`PUT ${endpoint} failed`, error);
      throw error;
    }
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = this.createUrl(endpoint, options);
    
    try {
      logger.debug(`DELETE ${endpoint}`, options?.params);
      
      const controller = new AbortController();
      const timeoutId = options?.timeout 
        ? setTimeout(() => controller.abort(), options.timeout) 
        : null;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: this.defaultHeaders,
        signal: controller.signal,
        ...options,
      });
      
      if (timeoutId) clearTimeout(timeoutId);
      
      return this.handleResponse<T>(response);
    } catch (error) {
      logger.error(`DELETE ${endpoint} failed`, error);
      throw error;
    }
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(env.apiUrl);
