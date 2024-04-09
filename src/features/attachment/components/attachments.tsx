import { AttachmentEntity } from '@prisma/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAttachments } from '../queries/get-attachments';
import { AttachmentCreateForm } from './attachment-create-form';
import { AttachmentItem } from './attachment-item';

type AttachmentsProps = {
  entityId: string;
  entity: AttachmentEntity;
  isOwner: boolean;
};

const Attachments = async ({
  entityId,
  entity,
  isOwner,
}: AttachmentsProps) => {
  const attachments = await getAttachments(entityId, entity);

  return (
    <>
      {isOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Upload File(s)</CardTitle>
            <CardDescription>Attach images or PDFs</CardDescription>
          </CardHeader>
          <CardContent>
            <AttachmentCreateForm
              entityId={entityId}
              entity={entity}
            />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 ml-8">
        {attachments.map((attachment) => (
          <AttachmentItem
            key={attachment.id}
            attachment={attachment}
            isOwner={isOwner}
          />
        ))}
      </div>
    </>
  );
};

export { Attachments };
