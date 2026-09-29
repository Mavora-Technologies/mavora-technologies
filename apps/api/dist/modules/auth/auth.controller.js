"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required.'
                });
            }
            const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
            const result = await auth_service_1.AuthService.authenticateUser(email, password, ipAddress);
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        }
        catch (error) {
            console.error('Login error:', error);
            return res.status(401).json({
                success: false,
                message: error.message || 'Authentication failed.'
            });
        }
    }
    static async logout(req, res) {
        try {
            return res.status(200).json({
                success: true,
                message: 'Logged out successfully.'
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Logout error.'
            });
        }
    }
    static async me(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authenticated.' });
            }
            return res.status(200).json({ success: true, data: req.user });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    }
}
exports.AuthController = AuthController;
