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

  let organizationId = cookies().get('organizationId')?.value ?? null;

  if (result.user && !organizationId) {
    const memberships = await prisma.membership.findMany({
      where: {
        userId: result.user.id,
      },
    });

    if (memberships.length > 0) {
      organizationId = memberships[0].organizationId;
    } else {
      throw new Error('User has no organization');
    }
  }

  return { ...result, currentOrganizationId: organizationId };
});
