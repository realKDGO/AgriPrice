/**
 * middleware/requestLogger.js
 *
 * Isolated request logging middleware.
 *
 * This module isolates the HTTP request logging configuration. Currently, it uses Morgan
 * to log requests in development mode. Isolating this configuration here allows us to
 * swap Morgan with Winston or Pino later by editing only this file, without modifying
 * app.js or route handlers.
 */

import morgan from 'morgan';
import { env } from '../config/env.js';

// Configure format based on the environment:
// - 'dev': Concise colored output for development (method, url, status, response time, response size).
// - null/noop: Disable verbose request logs in production to optimize performance and reduce log clutter.
const requestLogger = env.NODE_ENV === 'development'
  ? morgan('dev')
  : (req, res, next) => next();

export { requestLogger };
