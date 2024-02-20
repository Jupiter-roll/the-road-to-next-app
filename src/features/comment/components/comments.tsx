import { CommentCreateForm } from './comment-create-form';

type CommentsProps = {
  ticketId: string;
};

const Comments = ({ ticketId }: CommentsProps) => {
  return (
    <>
      <CommentCreateForm ticketId={ticketId} />
    </>
  );
};

export { Comments };
