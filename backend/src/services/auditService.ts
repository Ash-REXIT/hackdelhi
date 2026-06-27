import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export async function logAudit(
  action: string,
  entity: string,
  entityId?: string,
  userId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string
) {
  return prisma.auditLog.create({
    data: {
      action,
      entity,
      entityId,
      userId,
      details: details as Prisma.InputJsonValue | undefined,
      ipAddress,
    },
  });
}
