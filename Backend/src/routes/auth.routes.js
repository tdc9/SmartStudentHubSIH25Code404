const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

// ===============================
// Helper: Generate JWT
// ===============================
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP || '7d' }
  );
};

// ===============================
// @route   POST /api/auth/register
// @desc    Register new student
// ===============================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, institute } = req.body;

    // ❌ Prevent signup for non-student roles
    if (!institute) {
      return res.status(400).json({ success: false, message: "Institute is required for students" });
    }

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student", // enforce student only
      institute
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        institute: user.institute
      }
    });
  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// @route   POST /api/auth/login
// @desc    Login student/faculty/gov
// ===============================
// ===============================
// @route   POST /api/auth/login
// ===============================
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Email, password, and role are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Role enforcement
    if (user.role !== role) {
      return res.status(403).json({ 
        success: false, 
        message: `You are registered as ${user.role}, not ${role}` 
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// ===============================
// Middleware to verify JWT
// ===============================
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ success: false, message: "No token provided" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user payload
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ===============================
// @route   GET /api/auth/me
// @desc    Get current user (protected)
// ===============================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Me route error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// @route   PUT /api/auth/me
// @desc    Update current user profile
// ===============================
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    // prevent role/email/password from being updated directly
    delete updates.password;
    delete updates.role;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("❌ Update me route error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ===============================
// @route   GET /api/auth/logout
// @desc    Clear token cookie
// ===============================
router.get("/logout", (req, res) => {
  return res.clearCookie("token").json({ success: true, message: "Logged out" });
});

module.exports = router;
