import { Attachment } from '@prisma/client';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { attachmentDownloadPath } from '@/paths';
import { getBaseUrl } from '@/utils/url';
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
      <Card className="p-4 flex-1">
        <Link
          href={getBaseUrl() + attachmentDownloadPath(attachment.id)}
        >
          {attachment.name}
        </Link>
      </Card>

      {isOwner && <AttachmentDeleteButton id={attachment.id} />}
    </div>
  );
};

export { AttachmentItem };
