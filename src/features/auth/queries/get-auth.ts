import { cookies } from 'next/headers';
import { cache } from 'react';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';

export const getAuth = cache(async () => {
  const sessionId =
    cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
      organizations: [],
      activeRole: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(
        result.session.id
      );
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  // organization

  const organizations = result.user
    ? await prisma.organization.findMany({
        where: {
          memberships: {
            some: {
              userId: result.user.id,
            },
          },
        },
        include: {
          memberships: true,
        },
      })
    : [];

  // active role

  const activeRole =
    organizations
      .find((v) => v.id === result.user?.activeOrganizationId)
      ?.memberships.find((v) => v.userId === result.user?.id)
      ?.membershipRole ?? null;

  return { ...result, organizations, activeRole };
});
