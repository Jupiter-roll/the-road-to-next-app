import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendEmailInvitation } from '../emails/send-email-invitation';

export type InvitationCreateEventArgs = {
  data: {
    organizationId: string;
    email: string;
    emailInvitationLink: string;
  };
};

export const invitationCreatedEvent = inngest.createFunction(
  { id: 'invitation-created' },
  { event: 'app/invitation.created' },
  async ({ event }) => {
    const { organizationId, email, emailInvitationLink } = event.data;

    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
    });

    await sendEmailInvitation(
      organization.name,
      email,
      emailInvitationLink
    );

    return { event, body: true };
  }
);
