'use strict';

/**
 * notFound.js — 404 handler.
 *
 * Catches any request that did not match a defined route
 * and returns a consistent JSON 404 response.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error); // Pass to errorHandler
};

module.exports = notFound;
