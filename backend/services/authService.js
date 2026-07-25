/**
 * services/authService.js
 *
 * Authentication business logic layer.
 *
 * All database access and domain rules live here so that controllers stay thin.
 * Each function throws a plain Error with a `statusCode` property so that the
 * global error middleware (middleware/errorMiddleware.js) can return the correct
 * HTTP status without any try/catch boilerplate in the controller.
 *
 * NOTE: Input format validation (required fields, email format, length limits) is
 * handled upstream by Zod middleware (middleware/validateRequest.js + validators/).
 * This layer only enforces business rules — duplicate emails, foreign key existence,
 * and domain-specific constraints that require database access.
 */

import prisma from '../config/prisma.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Creates and throws a descriptive HTTP error.
 *
 * @param {string} message   - Human-readable error message.
 * @param {number} [status=500] - HTTP status code.
 */
const httpError = (message, status = 500) => {
  const err = new Error(message);
  err.statusCode = status;
  throw err;
};

// validateRegistrationInput removed — format validation is handled by
// Zod middleware (validateRequest + validators/authValidator.js)
// before the request ever reaches this service.

// ─── Shared select shape ──────────────────────────────────────────────────────

/**
 * Prisma `select` object that returns the safe public user fields.
 * The `passwordHash` field is intentionally omitted.
 */
const USER_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  createdAt: true,
  municipality: {
    select: {
      id: true,
      name: true,
    },
  },
};

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Register a new farmer account.
 *
 * @param {{ firstName, lastName, email, password, municipalityId }} body
 * @returns {Promise<object>} The newly created user (no passwordHash).
 */
const registerUser = async ({ firstName, lastName, email, password, municipalityId }) => {
  // Input has already been validated and sanitised by Zod middleware.
  // email is lowercased by the schema; municipalityId is coerced to a number.
  const sanitisedEmail = email;
  const mid = municipalityId;

  // 2. Check for duplicate email
  const existing = await prisma.user.findUnique({ where: { email: sanitisedEmail } });
  if (existing) httpError('An account with this email already exists.', 409);

  // 3. Verify municipality exists
  const municipality = await prisma.municipality.findUnique({ where: { id: mid } });
  if (!municipality) httpError('The selected municipality does not exist.', 404);

  // 4. Hash the password
  const passwordHash = await hashPassword(password);

  // 5. Create the user record
  const user = await prisma.user.create({
    data: {
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: sanitisedEmail,
      passwordHash,
      municipalityId: mid,
    },
    select: USER_SELECT,
  });

  return user;
};

/**
 * Authenticate a user and issue a JWT.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
const loginUser = async ({ email, password }) => {
  // Input has already been validated and sanitised by Zod middleware.
  // email is lowercased by the schema.
  const sanitisedEmail = email;

  // 2. Find user — include passwordHash for comparison (not returned to caller)
  const user = await prisma.user.findUnique({
    where: { email: sanitisedEmail },
    select: {
      ...USER_SELECT,
      passwordHash: true, // needed for comparison; stripped before returning
    },
  });

  // Deliberately vague message to avoid user enumeration
  if (!user) httpError('Invalid email or password.', 401);

  // 3. Compare passwords
  const match = await comparePassword(password, user.passwordHash);
  if (!match) httpError('Invalid email or password.', 401);

  // 4. Generate JWT
  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  // 5. Strip passwordHash before returning
  const { passwordHash: _omit, ...safeUser } = user;

  return { token, user: safeUser };
};

/**
 * Fetch the full profile of an authenticated user by their id.
 *
 * @param {string} userId - The user's UUID from the decoded JWT payload.
 * @returns {Promise<object>} The user profile (no passwordHash).
 */
const getUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: USER_SELECT,
  });

  if (!user) httpError('User not found.', 404);

  return user;
};

export { registerUser, loginUser, getUserProfile };
