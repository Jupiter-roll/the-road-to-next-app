'use client';

import { TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const deleteCommentWithId = deleteComment.bind(null, id);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteCommentWithId,
    trigger: (
      <Button variant="outline" size="icon">
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

export { CommentDeleteButton };
