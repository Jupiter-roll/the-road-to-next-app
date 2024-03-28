import { renderAsync } from '@react-email/render';
import EmailInvitation from '@/emails/invitation/email-invitation';
import { resend } from '@/lib/resend';

export const sendEmailInvitation = async (
  organizationName: string,
  email: string,
  emailInvitationLink: string
) => {
  const emailHtml = await renderAsync(
    <EmailInvitation
      fromName={organizationName}
      url={emailInvitationLink}
    />
  );

  resend.emails.send({
    from: 'app@road-to-next.com',
    to: email,
    subject: 'Invitation from TicketBounty',
    html: emailHtml,
  });
};
