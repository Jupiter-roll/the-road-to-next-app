import { DeleteButton } from '@/components/delete-button';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { deleteComment } from '../actions/delete-comment';

type CommentDeleteButtonProps = {
  id: string;
};

const CommentDeleteButton = ({ id }: CommentDeleteButtonProps) => {
  const deleteCommentAction = deleteComment.bind(null, id);

  return (
    <DeleteButton
      action={deleteCommentAction}
      subject="comment"
      trigger={
        <Button variant="outline" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      }
    />
  );
};

export { CommentDeleteButton };
