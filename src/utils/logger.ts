/**
 * Logger utility
 * 
 * A centralized logging system that respects environment settings
 * and provides consistent logging across the app.
 */

import { env } from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private currentLogLevel: number;

  constructor() {
    this.currentLogLevel = LOG_LEVELS[env.logLevel];
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= this.currentLogLevel;
  }

  private formatMessage(message: string, data?: any): string {
    if (data) {
      try {
        const dataString = typeof data === 'object' 
          ? JSON.stringify(data, null, 2)
          : String(data);
        return `${message} ${dataString}`;
      } catch (e) {
        return `${message} [Unstringifiable data]`;
      }
    }
    return message;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(`[DEBUG] ${this.formatMessage(message, data)}`);
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${this.formatMessage(message, data)}`);
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${this.formatMessage(message, data)}`);
    }
  }

  error(message: string, error?: Error | any): void {
    if (this.shouldLog('error')) {
      if (error instanceof Error) {
        console.error(`[ERROR] ${message}`, {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      } else {
        console.error(`[ERROR] ${this.formatMessage(message, error)}`);
      }
    }
  }
}

export const logger = new Logger();
