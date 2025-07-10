/**
 * Authentication Constants
 * 
 * This file contains constants related to authentication.
 */

export const AUTH_ROUTES = {
  WELCOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
};

export const SOCIAL_AUTH_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email is already in use',
  WEAK_PASSWORD: 'Password is too weak',
  GENERAL_ERROR: 'Something went wrong. Please try again later.',
};

export const AUTH_MESSAGES = {
  LOGOUT_SUCCESS: 'You have been logged out successfully',
  REGISTER_SUCCESS: 'Registration successful! You can now log in',
  RESET_EMAIL_SENT: 'Password reset email has been sent',
};
