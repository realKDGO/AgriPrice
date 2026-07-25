/**
 * validators/authValidator.js
 *
 * Zod validation schemas for the Authentication module.
 *
 * Each schema maps to exactly one route. Schemas are kept here so that:
 *   - Route files stay clean (import schema → pass to validateRequest).
 *   - Adding or changing a validation rule has a single, obvious location.
 *   - Schemas can be unit-tested independently of Express.
 *
 * How to add schemas for future modules (Crops, Historical Prices, etc.):
 *   1. Create validators/<module>Validator.js
 *   2. Define and export one schema per route that needs body validation.
 *   3. Import the schema in the corresponding route file and wrap the
 *      controller with: validateRequest(<schema>)
 */

import { z } from 'zod';

// ─── Register Schema ──────────────────────────────────────────────────────────

/**
 * Schema for POST /api/v1/auth/register
 *
 * Coerces municipalityId to a number so the route accepts both
 * numeric JSON values and numeric strings from form bodies.
 */
const registerSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required.' })
    .trim()
    .min(2, 'First name must be at least 2 characters.')
    .max(50, 'First name must not exceed 50 characters.'),

  lastName: z
    .string({ required_error: 'Last name is required.' })
    .trim()
    .min(2, 'Last name must be at least 2 characters.')
    .max(50, 'Last name must not exceed 50 characters.'),

  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .toLowerCase()
    .email('Invalid email address.')
    .max(255, 'Email must not exceed 255 characters.'),

  password: z
    .string({ required_error: 'Password is required.' })
    .min(8, 'Password must contain at least 8 characters.')
    .max(100, 'Password must not exceed 100 characters.'),

  municipalityId: z.coerce
    .number({
      required_error: 'municipalityId is required.',
      invalid_type_error: 'municipalityId must be a number.',
    })
    .int('municipalityId must be an integer.')
    .positive('municipalityId must be a positive integer.'),
});

// ─── Login Schema ─────────────────────────────────────────────────────────────

/**
 * Schema for POST /api/v1/auth/login
 */
const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .toLowerCase()
    .email('Invalid email address.'),

  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, 'Password is required.'),
});

export { registerSchema, loginSchema };
