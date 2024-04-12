'server only';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { AttachmentEntity } from '@prisma/client';
import { s3 } from '@/lib/aws/s3';
import { prisma } from '@/lib/prisma';
import * as attachmentRepository from '../repository';
import { AttachmentSubject } from '../types';
import { getOrganizationIdByAttachment } from '../utils/attachment-helpers';
import { generateS3Key } from '../utils/generate-s3-key';

type CreateAttachmentsArgs = {
  subject: AttachmentSubject;
  entity: AttachmentEntity;
  entityId: string;
  files: File[];
};

export const createAttachments = async ({
  subject,
  entity,
  entityId,
  files,
}: CreateAttachmentsArgs) => {
  let attachments = [];
  let attachment;

  try {
    for (const file of Array.from(files)) {
      const buffer = await Buffer.from(await file.arrayBuffer());

      attachment = await attachmentRepository.createAttachment({
        name: file.name,
        entity,
        entityId,
      });

      attachments.push(attachment);

      const organizationId = getOrganizationIdByAttachment(
        entity,
        subject
      );

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: generateS3Key({
            organizationId,
            entityId,
            entity,
            fileName: file.name,
            attachmentId: attachment.id,
          }),
          Body: buffer,
          ContentType: file.type,
        })
      );
    }
  } catch (error) {
    if (attachment) {
      await prisma.attachment.delete({
        where: {
          id: attachment.id,
        },
      });
    }

    throw error;
  }

  return attachments;
};
