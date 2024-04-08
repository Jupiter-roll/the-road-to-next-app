import { Attachment } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { AttachmentDeleteButton } from './attachment-delete-button';

type AttachmentItemProps = {
  attachment: Attachment;
  isOwner: boolean;
};

const AttachmentItem = ({
  attachment,
  isOwner,
}: AttachmentItemProps) => {
  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <p className="whitespace-pre-line">{attachment.name}</p>
      </Card>

      {isOwner && <AttachmentDeleteButton id={attachment.id} />}
    </div>
  );
};

export { AttachmentItem };
