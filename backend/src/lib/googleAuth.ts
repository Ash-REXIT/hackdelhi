import type { User } from '@prisma/client';
import { prisma } from './prisma';

/** Known Google accounts and their workspace routing (FinOps vs client portal). */
export const GOOGLE_ACCOUNT_MAP: Record<
  string,
  { role: 'FINOPS' | 'CLIENT'; clientCode?: string }
> = {
  'ashwinpranav360@gmail.com': { role: 'FINOPS' },
  'interdell11@gmail.com': { role: 'CLIENT', clientCode: 'CL001' },
};

type GoogleProfile = {
  id: string;
  displayName?: string;
  photos?: { value?: string }[];
};

export async function resolveOrCreateGoogleUser(
  email: string,
  profile: GoogleProfile
): Promise<User> {
  const normalized = email.trim().toLowerCase();

  let user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user) {
    user = await prisma.user.findUnique({ where: { email } });
  }

  if (user) {
    if (!user.googleId || profile.photos?.[0]?.value) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: profile.id,
          image: profile.photos?.[0]?.value ?? user.image,
          name: user.name || profile.displayName || null,
        },
      });
    }
    return user;
  }

  const mapping = GOOGLE_ACCOUNT_MAP[normalized];
  if (!mapping) {
    throw new Error('This Google account is not authorized for FlowInvoice AI');
  }

  let clientId: string | null = null;
  if (mapping.clientCode) {
    const client = await prisma.client.findUnique({
      where: { clientCode: mapping.clientCode },
    });
    clientId = client?.id ?? null;
  }

  return prisma.user.create({
    data: {
      email: normalized,
      name: profile.displayName ?? null,
      image: profile.photos?.[0]?.value ?? null,
      googleId: profile.id,
      role: mapping.role,
      clientId,
    },
  });
}
