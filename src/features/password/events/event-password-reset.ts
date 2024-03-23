import { inngest } from '@/lib/inngest';
import { sendEmailPasswordReset } from '../emails/send-email-password-reset';

export type PasswordResetEventArgs = {
  data: {
    username: string;
    email: string;
    passwordResetLink: string;
  };
};

export const passwordResetEvent = inngest.createFunction(
  { id: 'password-reset' },
  { event: 'app/password.reset' },
  async ({ event }) => {
    const { username, email, passwordResetLink } = event.data;

    await sendEmailPasswordReset(username, email, passwordResetLink);

    return { event, body: true };
  }
);
