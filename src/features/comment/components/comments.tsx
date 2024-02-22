import { getComments } from '../queries/get-comments';
import { CommentCreateForm } from './comment-create-form';
import { CommentList } from './comment-list';

type CommentsProps = {
  ticketId: string;
};

const Comments = async ({ ticketId }: CommentsProps) => {
  const { comments, metadata } = await getComments(ticketId, 0);

  return (
    <div className="flex flex-col gap-y-8">
      <CommentCreateForm ticketId={ticketId} />

      <CommentList
        key={metadata.total}
        ticketId={ticketId}
        initialComments={comments}
        initialHasNextPage={metadata.hasNextPage}
      />
    </div>
  );
};

export { Comments };
