/**
 * controllers/authController.js
 *
 * Authentication controller.
 *
 * Each function is intentionally thin — it only handles HTTP concerns
 * (reading from req, writing to res) and delegates all business logic
 * to the service layer (services/authService.js).
 *
 * Errors thrown by the service propagate via next(err) to the global
 * error handler (middleware/errorMiddleware.js), which formats them and
 * returns the correct HTTP status code.
 */

import * as authService from '../services/authService.js';

/**
 * @route   POST /api/auth/register
 * @access  Public
 * @desc    Register a new user account.
 */
const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   POST /api/auth/login
 * @access  Public
 * @desc    Authenticate an existing user and return a JWT.
 */
const loginUser = async (req, res, next) => {
  try {
    const { token, user } = await authService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: { token, user },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route   GET /api/auth/profile
 * @access  Private (requires valid JWT via protect middleware)
 * @desc    Return the profile of the currently authenticated user.
 */
const getProfile = async (req, res, next) => {
  try {
    // req.user.id is set by the protect middleware after verifying the JWT
    const user = await authService.getUserProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export { registerUser, loginUser, getProfile };
