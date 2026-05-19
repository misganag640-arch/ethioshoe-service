# EthioShoe Clean 🇪🇹👟

Modern full-stack shoe cleaning & washing service web app for Ethiopia.

## Stack
- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion + React Router + React Query + Redux Toolkit + Axios
- **Backend:** Node.js + Express + MongoDB (Mongoose) + JWT + Multer + Nodemailer + Socket.io
- **Admin Panel:** React (Vite)
- **Payments:** Telebirr, Chapa, CBE Birr, Cash on Delivery
- **Deployment:** Vercel (frontend) · Render/Railway (backend) · MongoDB Atlas

## Folder Structure
```
ethioshoe/
├── frontend/        # Customer-facing React app
├── backend/         # Express REST API + Socket.io
├── admin-panel/     # Admin React dashboard
├── database/        # Seeds & migration helpers
├── uploads/         # Uploaded shoe images (gitignored in prod)
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, JWT secret, Chapa key, etc.
npm install
npm run dev            # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

### Admin Panel
```bash
cd admin-panel
npm install
npm run dev            # http://localhost:5174
```

## Features
- 🔐 JWT auth with email verification & password reset
- 📦 Full order flow (pickup → washing → drying → ready → delivered)
- 🇪🇹 Ethiopian phone validation, Addis Ababa sub-cities, Amharic/English toggle
- 💳 Telebirr / Chapa / CBE Birr / COD
- 🌗 Dark / light mode
- 📱 PWA-ready, mobile-first
- 📊 Admin analytics dashboard
- 💬 Live chat + Telegram/WhatsApp quick contact
- 🎨 Glassmorphism, Framer Motion animations, premium sneaker aesthetic

## License
MIT
