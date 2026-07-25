/**
 * middleware/authMiddleware.js
 *
 * JWT authentication guard middleware.
 *
 * Protects routes that require an authenticated user. Reads the JWT from the
 * standard "Authorization: Bearer <token>" header, verifies its signature, and
 * attaches the decoded payload to `req.user` so downstream handlers can access
 * the authenticated user's id, email, and role without repeating verification.
 *
 * On failure the middleware short-circuits the request pipeline and returns a
 * 401 Unauthorized response with a consistent JSON body — it never calls next()
 * with the error so that the global error handler does not inadvertently expose
 * stack traces for auth failures.
 */

import jwt from 'jsonwebtoken';

/**
 * Express middleware that validates the Bearer token in the Authorization header.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Ensure the header exists and follows the "Bearer <token>" scheme
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorised. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify signature and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to the request object for downstream use
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    // Handle expired tokens with a more specific message
    const message =
      error.name === 'TokenExpiredError'
        ? 'Not authorised. Token has expired.'
        : 'Not authorised. Invalid token.';

    return res.status(401).json({ success: false, message });
  }
};

export { protect };
