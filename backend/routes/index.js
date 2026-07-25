/**
 * routes/index.js
 *
 * Global route dispatcher — API versioning entry point.
 *
 * This file mounts each versioned router under its version prefix.
 * It is the only file imported by app.js for route registration.
 *
 * Current versions:
 *   /api/v1  →  routes/v1/index.js
 *
 * To add v2 in the future:
 *   import v2Router from './v2/index.js';
 *   router.use('/v2', v2Router);
 *
 * The v1 router and all its routes remain completely unchanged.
 */

import { Router } from 'express';
import v1Router from './v1/index.js';

const router = Router();

// ── API Versions ──────────────────────────────────────────────────────────────

/** Version 1 — all routes prefixed with /api/v1 (mounted in app.js at /api) */
router.use('/v1', v1Router);

export default router;
