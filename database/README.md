# AgriPrice Database

## Setup Instructions

### 1. Create & run migrations
```bash
mysql -u root -p < migrations/001_init.sql
```

### 2. Load seed data (development only)
```bash
mysql -u root -p < seeds/001_seed.sql
```

---

## Folder Structure

```
database/
├── migrations/       # Numbered schema files — run in order
│   └── 001_init.sql  # Initial tables (commodities, price_records)
├── seeds/            # Sample data for development/testing
│   └── 001_seed.sql  # Sample Philippine commodity prices
└── README.md
```

---

## Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| Migration files | `NNN_description.sql` | `002_add_users.sql` |
| Table names | `snake_case`, plural | `price_records` |
| Column names | `snake_case` | `commodity_id`, `recorded_at` |
| Primary keys | `id` (INT UNSIGNED AUTO_INCREMENT) | `id` |
| Foreign keys | `{table_singular}_id` | `commodity_id` |
| Timestamps | `created_at`, `updated_at` (TIMESTAMP) | — |

---

## Useful MySQL Commands

```sql
-- Show all tables
SHOW TABLES;

-- Describe a table
DESCRIBE commodities;

-- Check all prices
SELECT c.name, pr.price, pr.market, pr.recorded_at
FROM price_records pr
JOIN commodities c ON c.id = pr.commodity_id
ORDER BY pr.recorded_at DESC;
```
