import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'SUPER_ADMIN' | 'DEVELOPER' | 'SOFTWARE_ENGINEER' | 'SALES' | 'RECEPTION';
    jobTitle?: string;
  };
}

export const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));

    if (!decoded || !decoded.id || !decoded.role) {
      return res.status(401).json({ success: false, message: 'Invalid or expired session token.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    const userRole = req.user.role;
    const fullAccessRoles = ['SUPER_ADMIN', 'DEVELOPER', 'SOFTWARE_ENGINEER'];

    // Full access roles (Mohammed, Jacobs, Valary) bypass specific role restrictions
    if (fullAccessRoles.includes(userRole) || allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Access denied. Role '${userRole}' does not have permission for this resource.`
    });
  };
};