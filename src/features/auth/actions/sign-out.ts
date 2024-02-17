'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from '@/services/lucia';
import { validateRequest } from '../queries/validate-request';
import { signInPath } from '@/utils/paths';

export const signOut = async (_formData: FormData) => {
  const { session } = await validateRequest();

  if (!session) {
    redirect(signInPath());
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect(signInPath());
};
