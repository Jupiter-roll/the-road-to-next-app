import { inngest } from '@/lib/inngest';
import { sendEmailVerification } from '../emails/send-email-verification';

export type EmailVerificationEventArgs = {
  data: {
    username: string;
    email: string;
    verificationCode: string;
  };
};

export const emailVerificationEvent = inngest.createFunction(
  { id: 'email-verification' },
  { event: 'app/auth.email-verification' },
  async ({ event }) => {
    const { username, email, verificationCode } = event.data;

    await sendEmailVerification(username, email, verificationCode);

    return { event, body: true };
  }
);
