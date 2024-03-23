'use server';

import { z } from 'zod';
import {
  FormState,
  fromErrorToFormState,
  toFormState,
} from '@/components/form/utils/to-form-state';
import { prisma } from '@/lib/prisma';
import { createPasswordResetLink } from '../../password/services/password';
import { sendEmailPasswordReset } from '../emails/send-email-password-reset';

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

    await sendEmailPasswordReset(
      user.username,
      user.email,
      passwordResetLink
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }

  return toFormState('SUCCESS', 'Check your email for a reset link');
};
