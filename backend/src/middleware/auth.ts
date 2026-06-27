import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { config } from '../lib/config';
import { prisma } from '../lib/prisma';
import { AppError } from './errorHandler';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  clientId: string | null;
}

declare global {
  namespace Express {
    interface Request {
      tiaUser?: AuthUser;
    }
  }
}

export function signToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, clientId: user.clientId },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.token;

    if (!token) {
      throw new AppError(401, 'Authentication required');
    }

    const payload = jwt.verify(token, config.jwtSecret) as AuthUser;
    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new AppError(401, 'User not found');

    req.tiaUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clientId: user.clientId,
    };
    next();
  } catch (err) {
    if (err instanceof AppError) return next(err);
    next(new AppError(401, 'Invalid or expired token'));
  }
}

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.tiaUser) return next(new AppError(401, 'Authentication required'));
    if (!roles.includes(req.tiaUser.role)) {
      return next(new AppError(403, 'Insufficient permissions'));
    }
    next();
  };
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.token;
  if (!token) return next();

  try {
    const payload = jwt.verify(token, config.jwtSecret) as AuthUser;
    req.tiaUser = payload;
  } catch {
    // ignore invalid token for optional auth
  }
  next();
}
