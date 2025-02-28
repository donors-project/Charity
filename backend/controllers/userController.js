const User = require('../models/user');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const { full_name, email, password, role, address, phone, image } = req.body;
        const newUser = await User.create({ full_name, email, password, role, address, phone, image });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { full_name, email, password, role, address, phone, image } = req.body;
        await user.update({ full_name, email, password, role, address, phone, image });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
