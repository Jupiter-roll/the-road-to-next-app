'use client';

import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment: (id: string) => void;
};

const CommentDeleteButton = ({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) => {
  const deleteCommentWithId = deleteComment.bind(null, id);

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteCommentWithId,
    trigger: (isLoading) =>
      isLoading ? (
        <Button variant="outline" size="icon">
          <Loader2Icon className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant="outline" size="icon">
          <TrashIcon className="w-4 h-4" />
        </Button>
      ),
    onSuccess: () => onDeleteComment(id),
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export { CommentDeleteButton };
