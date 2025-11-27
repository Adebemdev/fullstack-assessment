import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
if (!process.env.JWT_SECRET) {
  throw new Error(
    'FATAL ERROR: JWT_SECRET is not defined in environment variables.'
  );
}

const JWT_SECRET: Secret = process.env.JWT_SECRET;

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(400).json({ message: 'Unauthorized' });
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRole(role: 'admin' | 'staff') {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== role)
      return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
