'use strict';

/**
 * errorHandler.js — Global error-handling middleware.
 *
 * Express identifies error-handling middleware by its 4-argument signature.
 * This MUST be the last middleware registered in server.js.
 *
 * Formats all errors into a consistent JSON response:
 * {
 *   "success": false,
 *   "message": "...",
 *   "stack": "..." (development only)
 * }
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Show stack trace only in development
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
