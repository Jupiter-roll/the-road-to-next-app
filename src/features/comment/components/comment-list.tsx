import { getComments } from '../queries/get-comments';
import { CommentItem } from './comment-item';

type CommentListProps = {
  ticketId: string;
};

const CommentList = async ({ ticketId }: CommentListProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="flex flex-col gap-y-2">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { CommentList };
