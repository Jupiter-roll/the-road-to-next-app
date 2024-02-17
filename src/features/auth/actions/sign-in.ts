'use server';

import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { FormState, transformError } from '@/utils/transform-error';
import { Argon2id } from 'oslo/password';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { lucia } from '@/services/lucia';
import { dashboardPath } from '@/utils/paths';

const signInSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(191),
});

export const signIn = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { username, password } = signInSchema.parse({
      username: formData.get('username'),
      password: formData.get('password'),
    });

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return {
        status: 'ERROR' as const,
        fieldErrors: {},
        message: 'Incorrect username or password',
        timestamp: Date.now(),
      };
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      password
    );

    if (!validPassword) {
      return {
        status: 'ERROR' as const,
        fieldErrors: {},
        message: 'Incorrect username or password',
        timestamp: Date.now(),
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return transformError(error);
  }

  redirect(dashboardPath());
};
