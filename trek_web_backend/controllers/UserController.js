const Customer = require("../models/Customer");

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await Customer.find({}).select('-password'); // Exclude password from response
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Update user status (admin only)
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Active', 'Inactive'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Must be "Active" or "Inactive"' });
        }

        const user = await Customer.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Customer.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Get user by ID (admin only)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Customer.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

module.exports = {
    getAllUsers,
    updateUserStatus,
    deleteUser,
    getUserById
}; 