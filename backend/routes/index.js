'use strict';

const { Router } = require('express');
const router = Router();

// ── Health Check ─────────────────────────────────────────────────
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── Feature Routes ────────────────────────────────────────────────
// TODO: Mount feature routers as the project grows. Example:
// const priceRoutes = require('./priceRoutes');
// router.use('/prices', priceRoutes);

module.exports = router;
