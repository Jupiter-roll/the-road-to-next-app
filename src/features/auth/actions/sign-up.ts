'use server';

import { Prisma } from '@prisma/client';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { inngest } from '@/lib/inngest';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { ticketsPath } from '@/paths';
import { generateEmailVerificationCode } from '../services/email-verification';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(' '),
        'Username cannot contain spaces'
      ),
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
    const { username, email, password } = signUpSchema.parse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const hashedPassword = await new Argon2id().hash(password);
    const userId = generateId(15);

    const user = await prisma.user.create({
      data: {
        id: userId,
        username,
        email,
        hashedPassword,
        emailVerified: false,
      },
    });

    // has accepted invitation?

    const invitations = await prisma.invitation.findMany({
      where: {
        email,
        status: 'ACCEPTED_WITHOUT_ACCOUNT',
      },
    });

    if (invitations.length > 0) {
      await prisma.invitation.deleteMany({
        where: {
          email,
          status: 'ACCEPTED_WITHOUT_ACCOUNT',
        },
      });

      await prisma.membership.createMany({
        data: invitations.map((invitation) => ({
          organizationId: invitation.organizationId,
          userId,
          membershipRole: 'MEMBER',
        })),
      });
    }

    // email verification

    const verificationCode = await generateEmailVerificationCode(
      userId,
      email
    );

    console.log('HERE');

    await inngest.send({
      name: 'app/auth.email-verification',
      data: {
        username: user.username,
        email: user.email,
        verificationCode,
      },
    });

    // session

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return toFormState(
        'ERROR',
        'Either email or username is already in use'
      );
    }

    return fromErrorToFormState(error);
  }

  redirect(ticketsPath());
};
