'use server';

import { redirect } from 'next/navigation';
import { isWithinExpirationDate } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import { setCookieByKey } from '@/actions/cookies';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { lucia } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { signInPath } from '@/paths';

const passwordResetSchema = z
  .object({
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

export const passwordReset = async (
  verificationToken: string,
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { password } = passwordResetSchema.parse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    const tokenHash = encodeHex(
      await sha256(new TextEncoder().encode(verificationToken))
    );

    const token = await prisma.resetToken.findUnique({
      where: {
        tokenHash,
      },
    });

    if (token) {
      await prisma.resetToken.delete({
        where: {
          tokenHash,
        },
      });
    }

    if (!token || !isWithinExpirationDate(token.expiresAt)) {
      return toFormState(
        'ERROR',
        'Expired or invalid verification token'
      );
    }

    await lucia.invalidateUserSessions(token.userId);
    const hashedPassword = await new Argon2id().hash(password);

    await prisma.user.update({
      where: {
        id: token.userId,
      },
      data: {
        hashedPassword,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  setCookieByKey('toast', 'Successfully reset password');
  redirect(signInPath());
};
