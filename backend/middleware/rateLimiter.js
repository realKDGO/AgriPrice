/**
 * middleware/rateLimiter.js
 *
 * Dedicated rate limiting middleware using express-rate-limit.
 *
 * Implements two distinct rate limiters to protect the API from abuse:
 * 1. authLimiter: Strict limit for registration and login to mitigate brute-force attacks.
 * 2. generalLimiter: Standard limit for general API endpoints to prevent Denial of Service (DoS).
 *
 * Configurations are loaded from environment variables with safe defaults.
 */

import rateLimit from 'express-rate-limit';

// Load configurations with sensible defaults
const WINDOW_MINUTES = Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15;
const GENERAL_MAX = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;
const AUTH_MAX = Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5;

// Convert minutes to milliseconds for express-rate-limit
const windowMs = WINDOW_MINUTES * 60 * 1000;

/**
 * Strict Rate Limiter for Authentication endpoints (Register / Login).
 * Limits users to 5 attempts per 15 minutes by default.
 */
export const authLimiter = rateLimit({
  windowMs,
  max: AUTH_MAX,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: `Too many authentication attempts. Please try again after ${WINDOW_MINUTES} minutes.`
  },
  // If the client IP should be extracted via a reverse proxy (like Supabase/Nginx),
  // trust proxy must be configured on the Express app (app.set('trust proxy', 1)).
});

/**
 * General Rate Limiter for all other API endpoints.
 * Limits users to 100 requests per 15 minutes by default.
 * Excludes health check requests to prevent false positives from uptime monitors.
 */
export const generalLimiter = rateLimit({
  windowMs,
  max: GENERAL_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Exclude health check from general rate limits
    const path = req.baseUrl + req.path;
    return path.endsWith('/health') || path.includes('/api/v1/health') || path.includes('/api/health');
  },
  message: {
    success: false,
    message: `Too many requests from this IP. Please try again after ${WINDOW_MINUTES} minutes.`
  }
});
