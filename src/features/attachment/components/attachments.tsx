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
    <Card>
      <CardHeader>
        <CardTitle>Attachments</CardTitle>
        <CardDescription>Attached images or PDFs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-2 mb-4">
          {attachments.map((attachment) => (
            <AttachmentItem
              key={attachment.id}
              attachment={attachment}
              isOwner={isOwner}
            />
          ))}
        </div>

        {isOwner && (
          <AttachmentCreateForm entityId={entityId} entity={entity} />
        )}
      </CardContent>
    </Card>
  );
};

export { Attachments };
