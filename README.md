# 🦔 Hedgehod Kit - JWT Authentication Starter

**Hedgehod Kit** is a plug-and-play backend JWT authentication system for Node.js + Express apps. Easily add secure login, signup, OTP-based email recovery, and protected profile routes.

## 🔧 Features

- ✅ JWT Auth (Signup, Signin, Profile)
- ✅ Firebase Admin for OTP mail service
- ✅ Middleware-based route protection
- ✅ Mongoose User Model structure
- ✅ Modular & beginner-friendly structure

## 📦 Installation

```bash
npm install hedgehod-kit
```

## 🚀 Usage

```js
// In your main server file (e.g., app.js or index.js)
const express = require("express");
const authRoutes = require("hedgehod-kit");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes); // Signup, Signin, Profile, etc.

app.listen(3000, () => console.log("Server running on port 3000"));
```

## 🗂️ Project Structure

```
hedgehod-kit/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── index.js
├── .env (user creates)
├── package.json
└── README.md
```

## 🌱 Environment Setup

Create a `.env` file in your root project with variables like:

```
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_secret_key
FIREBASE_PROJECT_ID=...
...
```

## 📧 Forgot Password via Email OTP

- Uses Firebase Admin SDK to send OTPs to user email.
- OTP verification and password reset handled via secure routes.

## 🧪 Test Your Integration

Use tools like Postman to test these routes:

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `GET /api/auth/profile` (with JWT)
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

## 📜 License

MIT

---

🔗 [GitHub](https://github.com/SuryaNarayananDev/hedgehod-kit) | 🧰 Maintained by Suryanarayanan