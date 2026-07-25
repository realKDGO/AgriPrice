/**
 * middleware/errorMiddleware.js
 *
 * Centralised Express error-handling middleware.
 *
 * Express distinguishes an error handler from a regular middleware by its
 * four-argument signature (err, req, res, next). This must be registered as
 * the LAST middleware in app.js so it catches errors forwarded by next(err)
 * from anywhere in the stack.
 *
 * Response shape:
 * {
 *   "success": false,
 *   "message": "<human-readable message>",
 *   "stack": "<stack trace>"   // development only
 * }
 */

/**
 * Global error handler middleware.
 *
 * @param {Error & { statusCode?: number }} err
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next  - Required by Express (4-arg signature).
 */
// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  // Prefer an explicit statusCode set on the error object, fall back to the
  // current response status (which may have been set by a prior handler),
  // and default to 500 if neither is meaningful.
  const statusCode =
    err.statusCode && err.statusCode >= 400
      ? err.statusCode
      : res.statusCode >= 400
      ? res.statusCode
      : 500;

  const responseBody = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  // Expose the stack trace only in non-production environments to avoid
  // leaking implementation details to clients.
  if (process.env.NODE_ENV !== 'production') {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};

export { errorMiddleware };
