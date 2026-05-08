# 💬 Chatify — Real-Time Chat App

A full-stack real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

---

## 🚀 Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS v4** + DaisyUI
- **Zustand** — state management
- **Socket.IO Client** — real-time messaging
- **React Router DOM** — client-side routing
- **Axios** — HTTP requests
- **React Hot Toast** — notifications
- **Lucide React** — icons

### Backend
- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **Socket.IO** — WebSocket server
- **JWT** — authentication
- **bcryptjs** — password hashing
- **Cloudinary** — image/media uploads
- **Cookie Parser** — cookie-based auth
- **dotenv** — environment config

---

## 📁 Project Structure

```
root/
├── backend/
│   ├── index.js              # Entry point
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── message.routes.js
│   └── lib/
│       ├── db.js             # MongoDB connection
│       └── socket.js         # Socket.IO setup
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        └── main.jsx          # React entry point
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm start
```

### 3. Set up the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:5001`.

---

## ✨ Features

- 🔐 User authentication (signup/login/logout) with JWT & cookies
- 💬 Real-time messaging with Socket.IO
- 🖼️ Image sharing via Cloudinary
- 👥 Online user presence tracking
- 📱 Responsive UI with Tailwind CSS & DaisyUI

---

## 📜 API Endpoints

### Auth Routes — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login |
| POST | `/logout` | Logout |

### Message Routes — `/api/messages`
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:id` | Get messages with a user |
| POST | `/send/:id` | Send a message |

---

## 🛠️ Scripts

### Backend
```bash
npm start       # Start with nodemon (hot reload)
```

### Frontend
```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---
