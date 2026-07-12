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


## Quick Start

### Prerequisites
- Node.js
- npm
- MySQL

---

### 1. Clone the repository
```bash
git clone https://github.com/realKDGO/AgriPrice.git
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

## License

For academic/educational use only.
