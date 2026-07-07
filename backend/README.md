# AgriPrice Backend

## Tech Stack
- **Node.js** + **Express.js**
- **MySQL2** (promise-based)
- **dotenv**, **cors**, **morgan**

## Quick Start

```bash
cp .env.example .env   # Fill in your credentials
npm install
npm run dev            # http://localhost:5000
```

## Health Check

```
GET /api/health → { status: "ok", timestamp: "..." }
```

## Folder Structure

```
backend/
├── config/         # DB connection pool
├── controllers/    # Route handler logic
├── middleware/     # Error handler, 404, auth (future)
├── models/         # SQL query functions (per table)
├── routes/         # Express routers (per resource)
├── services/       # Business logic layer
├── utils/          # Response helpers, constants
├── server.js       # App entry point
└── .env.example    # Environment variable template
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Files | camelCase | `priceController.js` |
| Routes | kebab-case | `/api/price-records` |
| DB tables | snake_case | `price_records` |
| Env vars | UPPER_SNAKE | `DB_PASSWORD` |
