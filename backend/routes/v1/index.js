/**
 * routes/v1/index.js
 *
 * Version 1 — Route hub.
 *
 * This file is the single entry point for every v1 route. It mounts each
 * feature router under its path segment and registers the v1 health endpoint.
 *
 * It is itself mounted at /api/v1 by routes/index.js, so the resulting
 * full paths become:
 *
 *   GET    /api/v1/health
 *   POST   /api/v1/auth/register
 *   POST   /api/v1/auth/login
 *   GET    /api/v1/auth/profile
 *   GET    /api/v1/admin/dashboard     (ADMIN only)
 *   GET    /api/v1/farmer/dashboard    (FARMER only)
 *   GET    /api/v1/common/profile      (ADMIN + FARMER)
 */

import { Router } from 'express';
import authRoutes   from './authRoutes.js';
import adminRoutes  from './adminRoutes.js';
import farmerRoutes from './farmerRoutes.js';
import commonRoutes from './commonRoutes.js';

const router = Router();

// ── Health Check ──────────────────────────────────────────────────────────────

/**
 * @swagger
 * /health:
 *   get:
 *     summary: System health check
 *     description: Liveness probe for monitoring API status, version, and uptime.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is online and healthy.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 version:
 *                   type: string
 *                   example: v1
 *                 message:
 *                   type: string
 *                   example: AgriPrice API is running.
 *                 environment:
 *                   type: string
 *                   example: development
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-07-23T14:20:00.000Z
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    version: 'v1',
    message: 'AgriPrice API is running.',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// ── Feature Routes ────────────────────────────────────────────────────────────

/** Authentication — register, login, profile */
router.use('/auth', authRoutes);

/** Admin-only routes — requires ADMIN role */
router.use('/admin', adminRoutes);

/** Farmer-only routes — requires FARMER role */
router.use('/farmer', farmerRoutes);

/** Shared routes — accessible by any authenticated role */
router.use('/common', commonRoutes);

export default router;
