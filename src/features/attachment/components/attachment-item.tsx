import { Attachment } from '@prisma/client';
import Link from 'next/link';
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
    <div className="flex justify-between items-center">
      <Link
        className="text-sm"
        href={getBaseUrl() + attachmentDownloadPath(attachment.id)}
      >
        {attachment.name}
      </Link>

      {isOwner && <AttachmentDeleteButton id={attachment.id} />}
    </div>
  );
};

export { AttachmentItem };
