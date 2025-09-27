// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Test route
router.get('/test', (req, res) => {
    res.send('API is working!');
});

// Route: POST /api/auth/register
router.post("/register", register);

// Route: POST /api/auth/login
router.post("/login", login);

module.exports = router;


const protect = require("../middlewares/authMiddleware");

router.get("/protected", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
