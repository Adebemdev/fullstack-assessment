# Fullstack Assessment – Retail & Document Platform

A modern **full-stack Node + TypeScript + Prisma + SQLite +** application built as part of my technical assessment.  
This system includes:

- Retail product management
- Authentication (JWT Access + Refresh tokens)
- Role-based authorization (admin & staff)
- Clean backend architecture (services, controllers, routes)

---

## Project Structure

```
fullstack-assessment/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── prisma/
│   │   ├── server.ts
│   │   └── env
│   └── package.json
│
└── frontend/

```

---

# Backend Setup

### **1️ Install Dependencies**

```bash
cd backend
npm install
```

If reinstalling after deleting `node_modules`, use:

```bash
npm install --legacy-peer-deps
```

---

# 🗄 Environment Variables

Create a `.env` file inside **backend/**:

```
JWT_ACCESS_EXPIRES_IN=60m
JWT_REFRESH_EXPIRES_IN=7d
JWT_SECRET=7787810aea4d3c8f76c9dbaf3c41857d484b221b5baa6c77dc40b278d57eaede226776a3810584b10ae9ea00af85ff97e5e631c6c61f573cab6ec964ec33ff94
DATABASE_URL="file:./prisma/dev.db"
PORT=3000
```

Both quoted and unquoted values work.

---

# Database Setup (Prisma)

### **Generate Prisma Client**

```bash
npx prisma generate
```

### **Run Migrations**

```bash
npx prisma migrate dev
```

### **Seed Sample Data**

```bash
npm run seed
```

---

# 🛰 Run Backend Server

### Development (Nodemon)

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

# Authentication (JWT Access + Refresh Tokens)

### **Endpoints**

| Method | Endpoint         | Description                                         |
| ------ | ---------------- | --------------------------------------------------- |
| POST   | `/auth/register` | Register user                                       |
| POST   | `/auth/login`    | Login → returns `accessToken` + sets refresh cookie |
| POST   | `/auth/refresh`  | Refresh access token                                |
| GET    | `/auth/user`     | Get logged in user                                  |

---

## Testing Authentication in Postman

### 1. Login

POST → `/auth/login`

Body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### 2. Use accessToken

Copy token → Postman headers:

```
Authorization: Bearer <accessToken>
```

# Role-Based Permissions

### **Roles:**

- **admin**

  - Delete products
  - Add/edit products
  - View products

- **staff**
  - Add/edit products
  - View products
  - Cannot delete products

Middlewares:

- `authMiddleware` → validates JWT
- `roleMiddleware("admin")` → protects admin routes

---
