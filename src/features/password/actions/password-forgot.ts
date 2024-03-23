'use server';

import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { createPasswordResetLink } from '../../password/services/password';

const passwordForgotSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Is required' })
    .max(191)
    .email(),
});

export const passwordForgot = async (
  _formState: FormState,
  formData: FormData
) => {
  try {
    const { email } = passwordForgotSchema.parse({
      email: formData.get('email'),
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toFormState('ERROR', 'Incorrect email');
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
