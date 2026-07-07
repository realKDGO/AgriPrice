# AgriPrice

> Crop Forecasting and Market Decision Support System for Rizal Province.

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React 18 + Vite          |
| Routing    | React Router v6          |
| HTTP Client| Axios                    |
| Backend    | Node.js + Express.js     |
| Database   | MySQL                    |
| Dev Tools  | Nodemon, Morgan, dotenv  |

---

## Project Structure

```
AgriPrice/
├── frontend/          # React (Vite) app
├── backend/           # Node.js + Express API
├── database/          # SQL migration & seed scripts
├── docs/              # Project documentation
├── .gitignore
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js
- npm
- MySQL

---

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/AgriPrice.git
cd AgriPrice
```

---

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

**Verify**: `GET http://localhost:5000/api/health` → `{ "status": "ok" }`

---

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

### 4. Database Setup
```bash

mysql -u root -p < database/migrations/001_init.sql
mysql -u root -p < database/seeds/001_seed.sql
```


---

## License

For academic/educational use only.
