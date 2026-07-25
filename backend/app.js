/**
 * app.js
 *
 * Express application factory.
 *
 * This module is responsible solely for configuring the Express application:
 * middleware, routes, and the global error handler. It does NOT start the HTTP
 * server (that is server.js's responsibility), which keeps the app testable —
 * you can import this module in tests without binding to a port.
 *
 * Route versioning strategy
 * ─────────────────────────
 * All routes are mounted through the single versioned dispatcher at routes/index.js.
 *
 *   routes/index.js          ← mounts /v1, /v2, … version prefixes
 *     routes/v1/index.js     ← owns /health and all v1 feature routers
 *       routes/v1/authRoutes.js
 *
 * To add a new API version, create routes/v2/index.js and register it in
 * routes/index.js — this file never needs to change.
 */

import { env } from './config/env.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec, swaggerUiOptions } from './config/swagger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import apiRouter from './routes/index.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';

const app = express();

// ── Core Middleware ───────────────────────────────────────────────────────────

/** Express security headers using Helmet (CSP adjusted for Swagger UI compatibility) */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

/** Request logging middleware */
app.use(requestLogger);

/** General rate limiting for all API endpoints */
app.use('/api', generalLimiter);

/** Parse incoming requests with JSON payloads */
app.use(express.json());

/** Parse URL-encoded form bodies */
app.use(express.urlencoded({ extended: true }));

/**
 * CORS — allow the Vite dev server (or any origin in development).
 * Tighten this to the production domain before deploying.
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// ── API Documentation ─────────────────────────────────────────────────────────

/** Serve Interactive OpenAPI / Swagger UI documentation at /api/docs */
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * Mount the versioned API router at /api.
 *
 * The router internally dispatches to /v1, /v2, etc., so the final URLs are:
 *   GET    /api/v1/health
 *   POST   /api/v1/auth/register
 *   POST   /api/v1/auth/login
 *   GET    /api/v1/auth/profile
 *   GET    /api/v1/admin/dashboard
 *   GET    /api/v1/farmer/dashboard
 *   GET    /api/v1/common/profile
 */
app.use('/api', apiRouter);

// ── 404 Handler ───────────────────────────────────────────────────────────────

/** Catch-all for routes that do not match any registered handler */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found.',
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────

/**
 * Must be registered AFTER all routes.
 * Express identifies it as an error handler by the 4-argument signature.
 */
app.use(errorMiddleware);

export default app;
