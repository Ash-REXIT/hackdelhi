import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export async function addTimelineEvent(
  invoiceId: string,
  event: string,
  description?: string,
  metadata?: Record<string, unknown>
) {
  return prisma.invoiceTimelineEvent.create({
    data: {
      invoiceId,
      event,
      description,
      metadata: metadata as Prisma.InputJsonValue | undefined,
    },
  });
}
