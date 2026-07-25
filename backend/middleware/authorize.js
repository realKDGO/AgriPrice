/**
 * middleware/authorize.js
 *
 * Role-Based Access Control (RBAC) middleware factory.
 *
 * This middleware enforces authorization AFTER authentication has already
 * completed. It assumes `req.user` has been populated by the `protect`
 * middleware (middleware/authMiddleware.js) and reads `req.user.role` to
 * determine whether the caller is permitted to proceed.
 *
 * Usage:
 *   router.get('/admin/dashboard', protect, authorize('ADMIN'), handler);
 *   router.get('/common',          protect, authorize('ADMIN', 'FARMER'), handler);
 *
 * Adding a new role to the system in the future only requires:
 *   1. Extending the Role enum in schema.prisma (+ migration).
 *   2. Passing the new role string to authorize() on the appropriate routes.
 *      No changes to this file are needed.
 */

/**
 * Returns an Express middleware that permits only the specified roles.
 *
 * @param {...string} allowedRoles - One or more role strings (e.g. 'ADMIN', 'FARMER').
 * @returns {import('express').RequestHandler}
 */
const authorize = (...allowedRoles) => (req, res, next) => {
  // Guard: protect middleware must run first. If req.user is absent, something
  // is misconfigured in the route definition — surface it clearly.
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised. Authentication required.',
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to access this resource.',
    });
  }

  next();
};

export { authorize };
