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
  ticketId: string;
  isOwner: boolean;
};

const Attachments = async ({
  isOwner,
  ticketId,
}: AttachmentsProps) => {
  const attachments = await getAttachments(ticketId);

  return (
    <>
      {isOwner && (
        <Card>
          <CardHeader>
            <CardTitle>Upload File(s)</CardTitle>
            <CardDescription>
              Attach images or PDFs to the ticket
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttachmentCreateForm ticketId={ticketId} />
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
