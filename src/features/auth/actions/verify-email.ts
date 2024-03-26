'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { getCurrentAuthOrRedirect } from '../queries/get-current-auth-or-redirect';
import { verifyVerificationCode } from '../services/email-verification';

const verifyEmailSchema = z.object({
  code: z.string().min(1),
});

export const verifyEmail = async (
  _formState: FormState,
  formData: FormData
) => {
  const { user } = await getCurrentAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
    checkActiveOrganization: false,
  });

  try {
    const { code } = verifyEmailSchema.parse({
      code: formData.get('code'),
    });

    const validCode = await verifyVerificationCode(user, code);
    if (!validCode) {
      return toFormState('ERROR', 'Invalid or expired code');
    }

    await lucia.invalidateUserSessions(user.id);
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }

  redirect(ticketsPath());
};
