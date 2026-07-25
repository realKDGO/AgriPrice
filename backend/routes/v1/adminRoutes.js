/**
 * routes/v1/adminRoutes.js
 *
 * Version 1 — Admin-only routes.
 */

import { Router } from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

// Apply authentication + authorization to every route in this file
router.use(protect, authorize('ADMIN'));

// ── Admin Routes ──────────────────────────────────────────────────────────────

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Admin Dashboard Overview
 *     description: Restricted endpoint for users with ADMIN role only. Returns administrative feature summary.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome to the Admin Dashboard.
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: This endpoint is restricted to ADMIN users.
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["User Management", "Municipality Configuration", "System Reports"]
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden. User lacks ADMIN role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/dashboard', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Admin Dashboard.',
    data: {
      description: 'This endpoint is restricted to ADMIN users.',
      features: [
        'User Management',
        'Municipality Configuration',
        'Crop Price Oversight',
        'System Reports',
        'Forecasting Model Control',
      ],
    },
  });
});

export default router;
