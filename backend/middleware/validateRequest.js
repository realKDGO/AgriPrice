/**
 * middleware/validateRequest.js
 *
 * Generic Zod request validation middleware factory.
 *
 * Accepts a Zod schema and returns an Express middleware function that:
 *   1. Parses and validates req.body against the schema.
 *   2. Replaces req.body with the parsed (type-safe, trimmed) data on success.
 *   3. Returns HTTP 400 with a structured error list on failure.
 *
 * Keeping validation here instead of in controllers enforces the
 * single-responsibility principle — controllers never see invalid data.
 *
 * Swapping Zod for another library (e.g. Joi, Yup) in the future only
 * requires changing this one file.
 *
 * Usage:
 *   import { validateRequest } from '../middleware/validateRequest.js';
 *   import { registerSchema } from '../validators/authValidator.js';
 *
 *   router.post('/register', validateRequest(registerSchema), registerUser);
 */

import { ZodError } from 'zod';

/**
 * Express middleware factory that validates req.body against a Zod schema.
 *
 * @param {import('zod').ZodSchema} schema - A Zod schema to validate against.
 * @returns {import('express').RequestHandler}
 */
const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    // Map Zod issues to a flat, client-friendly error array
    const errors = result.error.errors.map((issue) => ({
      field: issue.path.join('.') || 'unknown',
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
  }

  // Replace req.body with the Zod-parsed value (trimmed strings, coerced types)
  req.body = result.data;
  next();
};

export { validateRequest };
