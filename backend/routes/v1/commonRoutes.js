/**
 * routes/v1/commonRoutes.js
 *
 * Version 1 — Shared routes accessible by any authenticated role.
 */

import { Router } from 'express';
import { protect } from '../../middleware/authMiddleware.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

// Apply authentication + authorization to every route in this file
router.use(protect, authorize('ADMIN', 'FARMER'));

// ── Common Routes ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /common/profile:
 *   get:
 *     summary: Shared User Profile Overview
 *     description: Accessible by any authenticated role (ADMIN or FARMER). Returns user identity and role context.
 *     tags:
 *       - Common
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile information returned successfully.
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
 *                   example: Common profile accessed successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: This endpoint is accessible by both ADMIN and FARMER users.
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: f47ac10b-58cc-4372-a567-0e02b2c3d479
 *                         email:
 *                           type: string
 *                           format: email
 *                           example: user@example.com
 *                         role:
 *                           type: string
 *                           example: FARMER
 *       401:
 *         description: Unauthorized. Missing or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden. User role not authorized.
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
router.get('/profile', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Common profile accessed successfully.',
    data: {
      description: 'This endpoint is accessible by both ADMIN and FARMER users.',
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
});

export default router;
