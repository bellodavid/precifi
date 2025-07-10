/**
 * Environment configuration
 * 
 * This file manages environment-specific configuration values.
 * Use this file to set up API endpoints, feature flags, etc.
 */

type Environment = 'development' | 'staging' | 'production';

// Default to development if not set
const currentEnv = (process.env.EXPO_PUBLIC_ENV || 'development') as Environment;

interface EnvConfig {
  apiUrl: string;
  enableAnalytics: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const envConfigs: Record<Environment, EnvConfig> = {
  development: {
    apiUrl: 'https://api-dev.precifi.com',
    enableAnalytics: false,
    logLevel: 'debug',
  },
  staging: {
    apiUrl: 'https://api-staging.precifi.com',
    enableAnalytics: true,
    logLevel: 'info',
  },
  production: {
    apiUrl: 'https://api.precifi.com',
    enableAnalytics: true,
    logLevel: 'error',
  },
};

export const env = envConfigs[currentEnv];
export const isDev = currentEnv === 'development';
export const isProd = currentEnv === 'production';
export const isStaging = currentEnv === 'staging';
