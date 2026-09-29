"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
class UsersController {
    static async getUsers(req, res) {
        try {
            const allUsers = await users_service_1.UsersService.getAllUsers();
            return res.status(200).json({ success: true, data: allUsers });
        }
        catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
        }
    }
    static async getUserProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Unauthorized.' });
            }
            const user = await users_service_1.UsersService.getUserById(req.user.id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found.' });
            }
            return res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    }
    static async createUser(req, res) {
        try {
            const { name, email, role, password = 'TempPassword123!' } = req.body;
            // 1. Insert the user into the DB (Bypassing strict TS schema checks)
            const [newUser] = await db_1.db.insert(schema_1.users).values({
                name,
                email,
                role,
                password
            }).returning();
            // 2. Trigger the Audit Log immediately after success
            const adminName = req.user?.name || req.user?.email || 'System Admin';
            // Insert audit log (Bypassing strict TS schema checks)
            await db_1.db.insert(schema_1.auditLogs).values({
                performedBy: adminName,
                action: 'CREATE_USER',
                details: `Added new admin user: ${name} (${role})`
            });
            return res.status(201).json({ success: true, data: newUser });
        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ success: false, message: 'Server error creating user.' });
        }
    }
}
exports.UsersController = UsersController;
