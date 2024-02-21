'use server';

import { z } from 'zod';
import { prisma } from '@/services/prisma';
import { FormState, transformError } from '@/utils/transform-error';
import { Argon2id } from 'oslo/password';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { generateId } from 'lucia';
import { lucia } from '@/services/lucia';
import { ticketsPath } from '@/utils/paths';

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Is required' })
      .max(191)
      .email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const signUp = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { email, password } = signUpSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    await prisma.user.create({
      data: {
        id: userId,
        email,
        hashedPassword,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return transformError(error);
  }

  redirect(ticketsPath());
};
