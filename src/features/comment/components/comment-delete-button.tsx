'use client';

import { TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
  onRemoveComment: (id: string) => void;
};

const CommentDeleteButton = ({
  id,
  onRemoveComment,
}: CommentDeleteButtonProps) => {
  const deleteCommentWithId = deleteComment.bind(null, id);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteCommentWithId,
    trigger: (
      <Button variant="outline" size="icon">
        <TrashIcon className="w-4 h-4" />
      </Button>
    ),
    onSuccess: () => onRemoveComment(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
