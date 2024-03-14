import { Prisma } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { CommentDeleteButton } from './comment-delete-button';
import { format } from 'date-fns';

type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}>;

type CommentItemProps = {
  comment: CommentWithUser & { isOwner: boolean };
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? 'Deleted User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {/* {comment.createdAt.toLocaleString()} */}
            {format(comment.createdAt, 'yyyy-MM-dd, HH:mm:ss')}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      {comment.isOwner && <CommentDeleteButton id={comment.id} />}
    </div>
  );
};

export { CommentItem };
