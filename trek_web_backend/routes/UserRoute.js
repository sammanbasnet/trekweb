const express = require("express");
const router = express.Router();
const { 
    getAllUsers, 
    updateUserStatus, 
    deleteUser, 
    getUserById 
} = require("../controllers/UserController");

// Middleware to check if user is admin (you'll need to implement this)
const requireAdmin = (req, res, next) => {
    // For now, we'll allow all requests. You should implement proper admin authentication
    // This should check if the user's role is "admin"
    next();
};

// Get all users (admin only)
router.get("/", requireAdmin, getAllUsers);

// Get user by ID (admin only)
router.get("/:id", requireAdmin, getUserById);

// Update user status (admin only)
router.put("/:id/status", requireAdmin, updateUserStatus);

// Delete user (admin only)
router.delete("/:id", requireAdmin, deleteUser);

module.exports = router; 