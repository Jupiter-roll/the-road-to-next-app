'use client';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteAttachment } from '../actions/delete-attachment';

type AttachmentDeleteButtonProps = {
  id: string;
};

const AttachmentDeleteButton = ({
  id,
}: AttachmentDeleteButtonProps) => {
  const deleteAttachmentWithId = deleteAttachment.bind(null, id);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteAttachmentWithId,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="ghost" size="icon">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="ghost" size="icon">
          <TrashIcon className="w-4 h-4" />
        </Button>
      ),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { AttachmentDeleteButton };
