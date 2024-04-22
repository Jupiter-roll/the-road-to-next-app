import { getComments } from "../queries/get-comments";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentListProps = {
  ticketId: string;
};

const CommentList = async ({ ticketId }: CommentListProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="flex-1 flex flex-col gap-y-2 ml-8">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          buttons={[<CommentDeleteButton key="0" id={comment.id} />]}
        />
      ))}
    </div>
  );
};

export { CommentList };
