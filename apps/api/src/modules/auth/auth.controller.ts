import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from '../../middleware/rbac.middleware';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required.'
        });
      }

      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
      const result = await AuthService.authenticateUser(email, password, ipAddress);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      });
    } catch (error: any) {
      console.error('Login error:', error);
      return res.status(401).json({
        success: false,
        message: error.message || 'Authentication failed.'
      });
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response) {
    try {
      return res.status(200).json({
        success: true,
        message: 'Logged out successfully.'
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Logout error.'
      });
    }
  }

  static async me(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated.' });
      }
      return res.status(200).json({ success: true, data: req.user });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
  }
}