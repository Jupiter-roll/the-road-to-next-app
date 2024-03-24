import { renderAsync } from '@react-email/render';
import EmailVerification from '@/emails/auth/email-verification';
import { resend } from '@/lib/resend';

export const sendEmailVerification = async (
  username: string,
  email: string,
  verificationCode: string
) => {
  const emailHtml = await renderAsync(
    <EmailVerification
      username={username}
      verificationCode={verificationCode}
    />
  );

  resend.emails.send({
    from: 'app@road-to-next.com',
    to: email,
    subject: 'Email Verification from TicketBounty',
    html: emailHtml,
  });
};
