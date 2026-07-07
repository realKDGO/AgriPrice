-- ============================================================
-- AgriPrice Database
-- Seed: 001_seed.sql
-- Description: Sample data for development and testing
-- Run AFTER migrations: mysql -u root -p < database/seeds/001_seed.sql
-- ============================================================

USE agriprice;

-- ── Sample Commodities ─────────────────────────────────────────
INSERT INTO commodities (name, category, unit) VALUES
  ('Rice (Local)',      'Grains',      'kg'),
  ('Rice (Imported)',   'Grains',      'kg'),
  ('Corn',             'Grains',      'kg'),
  ('White Onion',      'Vegetables',  'kg'),
  ('Red Onion',        'Vegetables',  'kg'),
  ('Tomato',           'Vegetables',  'kg'),
  ('Garlic (Local)',   'Spices',      'kg'),
  ('Sugar (Refined)',  'Condiments',  'kg'),
  ('Cooking Oil',      'Condiments',  'liter')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- ── Sample Price Records ────────────────────────────────────────
INSERT INTO price_records (commodity_id, price, market, recorded_at) VALUES
  (1,  52.00, 'Divisoria Market, Manila',   '2026-07-01'),
  (1,  54.50, 'Carbon Market, Cebu',        '2026-07-01'),
  (2,  48.00, 'Divisoria Market, Manila',   '2026-07-01'),
  (4, 180.00, 'Divisoria Market, Manila',   '2026-07-01'),
  (4, 175.00, 'Bankerohan Market, Davao',   '2026-07-01'),
  (6,  80.00, 'Divisoria Market, Manila',   '2026-07-01'),
  (8,  68.00, 'Divisoria Market, Manila',   '2026-07-01'),
  (9, 120.00, 'Divisoria Market, Manila',   '2026-07-01');
