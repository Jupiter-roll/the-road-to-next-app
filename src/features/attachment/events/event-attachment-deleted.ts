import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/lib/aws/s3';
import { inngest } from '@/lib/inngest';

export type AttachmentDeleteEventArgs = {
  data: {
    key: string;
  };
};

export const attachmentDeletedEvent = inngest.createFunction(
  { id: 'attachment-deleted' },
  { event: 'app/attachment.deleted' },
  async ({ event }) => {
    const { key } = event.data;

    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
        })
      );
    } catch (error) {
      return { event, body: false };
    }

    return { event, body: true };
  }
);
