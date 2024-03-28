import { renderAsync } from '@react-email/render';
import EmailPasswordReset from '@/emails/password/email-password-reset';
import { resend } from '@/lib/resend';

export const sendEmailPasswordReset = async (
  username: string,
  email: string,
  passwordResetLink: string
) => {
  const emailHtml = await renderAsync(
    <EmailPasswordReset toName={username} url={passwordResetLink} />
  );

  resend.emails.send({
    from: 'app@road-to-next.com',
    to: email,
    subject: 'Password Reset from TicketBounty',
    html: emailHtml,
  });
};
