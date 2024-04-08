import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/aws/s3';
import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { generateKey } from '../utils';

export type AttachmentDeleteEventArgs = {
  data: {
    id: string;
  };
};

export const attachmentDeletedEvent = inngest.createFunction(
  { id: 'attachment-deleted' },
  { event: 'app/attachment.deleted' },
  async ({ event }) => {
    const { id } = event.data;

    try {
      const attachment = await prisma.attachment.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          ticket: true,
        },
      });

      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateKey({
            organizationId: attachment.ticket.organizationId,
            ticketId: attachment.ticket.id,
            fileName: attachment.name,
            attachmentId: attachment.id,
          }),
        })
      );
    } catch (error) {
      return { event, body: false };
    }

    return { event, body: true };
  }
);
