/**
 * routes/v1/farmerRoutes.js
 *
 * Version 1 — Farmer-only routes.
 */

import { Router } from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

// Apply authentication + authorization to every route in this file
router.use(protect, authorize('FARMER'));

// ── Farmer Routes ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /farmer/dashboard:
 *   get:
 *     summary: Farmer Dashboard Overview
 *     description: Restricted endpoint for users with FARMER role only. Returns market intelligence feature summary.
 *     tags:
 *       - Farmer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Farmer dashboard data retrieved successfully.
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
 *                   example: Welcome to the Farmer Dashboard.
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: This endpoint is restricted to FARMER users.
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Crop Price Overview", "Market Price Forecasting", "Decision Support Recommendations"]
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden. User lacks FARMER role.
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
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Farmer Dashboard.',
    data: {
      description: 'This endpoint is restricted to FARMER users.',
      features: [
        'Crop Price Overview',
        'Market Price Forecasting',
        'Historical Price Data',
        'Decision Support Recommendations',
      ],
    },
  });
});

export default router;
