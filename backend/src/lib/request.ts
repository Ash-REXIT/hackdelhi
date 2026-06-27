import { Request } from 'express';
import { AuthUser } from '../middleware/auth';

declare module 'express-serve-static-core' {
  interface Request {
    tiaUser?: AuthUser;
  }
}

export function getParam(req: Request, name: string): string {
  const value = req.params[name];
  return Array.isArray(value) ? value[0] : (value ?? '');
}

export function routeParams(req: Request): Record<string, string> {
  return req.params as Record<string, string>;
}
