'use client';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteAttachment } from '../actions/delete-attachment';

type AttachmentDeleteButtonProps = {
  id: string;
  onDeleteAttachment?: (id: string) => void;
};

const AttachmentDeleteButton = ({
  id,
  onDeleteAttachment,
}: AttachmentDeleteButtonProps) => {
  const deleteAttachmentWithId = deleteAttachment.bind(null, id);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteAttachmentWithId,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="ghost" size="xs">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="ghost" size="xs">
          <TrashIcon className="w-4 h-4" />
        </Button>
      ),
    onSuccess: () => onDeleteAttachment?.(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { AttachmentDeleteButton };
