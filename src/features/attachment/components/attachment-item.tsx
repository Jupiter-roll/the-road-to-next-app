import { Attachment } from '@prisma/client';
import Link from 'next/link';
import { attachmentDownloadPath } from '@/paths';
import { getBaseUrl } from '@/utils/url';

type AttachmentItemProps = {
  attachment: Attachment;
  buttons: React.ReactNode[];
};

const AttachmentItem = ({
  attachment,
  buttons,
}: AttachmentItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link
        className="text-sm"
        href={getBaseUrl() + attachmentDownloadPath(attachment.id)}
      >
        {attachment.name}
      </Link>

      {buttons}
    </div>
  );
};

export { AttachmentItem };
