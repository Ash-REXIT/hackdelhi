import type { BackendRole } from '@/types/api';

export function homePathForRole(role: BackendRole): string {
  if (role === 'FINOPS') return '/workspace';
  if (role === 'CLIENT') return '/portal';
  if (role === 'FINANCE') return '/operations';
  return '/';
}
