'use server';

import { Argon2id } from 'oslo/password';
import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { getCurrentAuthOrRedirect } from '@/features/auth/queries/get-current-auth-or-redirect';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { createPasswordResetLink } from '../../password/services/password';

const passwordChangeSchema = z.object({
  password: z.string().min(6),
});

export const passwordChange = async (
  _formState: FormState,
  formData: FormData
) => {
  const auth = await getCurrentAuthOrRedirect();

  try {
    const { password } = passwordChangeSchema.parse({
      password: formData.get('password'),
    });

    const user = await prisma.user.findUnique({
      where: { email: auth.user.email },
    });

    if (!user) {
      // we should never reach this return statement
      return toFormState('ERROR', 'Invalid request');
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      password
    );

    if (!validPassword) {
      return toFormState('ERROR', 'Incorrect password');
    }

    const passwordResetLink = await createPasswordResetLink(user.id);

    await inngest.send({
      name: 'app/password.reset',
      data: {
        username: user.username,
        email: user.email,
        passwordResetLink,
      },
    });
  } catch (error) {
    return fromErrorToFormState(error);
  }

  return toFormState('SUCCESS', 'Check your email for a reset link');
};
