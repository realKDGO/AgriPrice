# AgriPrice Documentation

This folder will contain project documentation as the capstone develops.

## Planned Documents

| Document | Description |
|----------|-------------|
| `api-reference.md` | REST API endpoint documentation |
| `erd.md` / `erd.png` | Entity-Relationship Diagram |
| `user-manual.md` | End-user guide |
| `deployment.md` | Hosting and deployment guide |
| `testing.md` | Test cases and QA procedures |

## API Conventions

- Base URL: `http://localhost:5000/api`
- All responses are JSON
- Success: `{ "success": true, "data": {...}, "message": "..." }`
- Error: `{ "success": false, "message": "...", "errors": [...] }`
- Dates: ISO 8601 (`YYYY-MM-DD`)
- Currency: Philippine Peso (PHP)
