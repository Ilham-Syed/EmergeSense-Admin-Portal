
import { model } from 'mongoose';
import UserService from '../services/user_services.js';

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const successResUser = await UserService.registerUser(name, email, password);

        res.json({
            success: true,
            message: "User registered successfully",
            data: successResUser
        });
    } catch (e) {
        throw e;
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.loginUser(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else {
            const isMatch = await user.comparePassword(password);

            if (isMatch === false) {
                throw new Error('Invalid password');
            }

            let tokendata = { _id: user._id, email: user.email, name: user.name };

            const token = await UserService.generateToken(tokendata, "arip", '24h');
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token: token
            });
        }
    } catch (e) {
        throw e;
    }
};

exports.uploadImage = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer token' -> 'token'

        if (!token) {
            return res.status(400).json({ message: 'JWT token is required' });
        }
        const { location } = req.body;
        const imagePath = req.file.path; // Assuming you're using multer for file uploads

        const { user: updatedUser, description,severity } = await UserService.uploadImage(token, imagePath, location);
        res.json({
            success: true,
            message: "Image uploaded successfully",
            data: updatedUser,
            description: description,
            severity: severity
        });
    } catch (e) {
        throw e;
    }
};

exports.getAllImageLocationsAndSeverity = async (req, res) => {
    try {
        const data = await UserService.getAllImageLocationsAndSeverity();
        res.json({
            success: true,
            data: data
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

