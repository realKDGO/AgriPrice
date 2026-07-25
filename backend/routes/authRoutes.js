/**
 * routes/authRoutes.js
 *
 * Authentication routes.
 *
 * Maps HTTP verbs + paths to their corresponding controller functions.
 * The /profile route is protected by the `protect` middleware, which
 * verifies the JWT before the controller runs.
 *
 * Mounted at /api/auth in app.js, giving full paths of:
 *   POST   /api/auth/register
 *   POST   /api/auth/login
 *   GET    /api/auth/profile
 */

import { Router } from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// ── Public Routes ─────────────────────────────────────────────────────────────

/** Register a new user account */
router.post('/register', registerUser);

/** Authenticate and receive a JWT */
router.post('/login', loginUser);

// ── Protected Routes ──────────────────────────────────────────────────────────

/** Get the authenticated user's profile (requires valid JWT) */
router.get('/profile', protect, getProfile);

export default router;
