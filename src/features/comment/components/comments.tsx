import { CommentCreateForm } from './comment-create-form';
import { CommentList } from './comment-list';

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  return (
    <div className="flex flex-col gap-y-8">
      <CommentList ticketId={ticketId} />
      <CommentCreateForm ticketId={ticketId} />
    </div>
  );
};

export { Comments };
