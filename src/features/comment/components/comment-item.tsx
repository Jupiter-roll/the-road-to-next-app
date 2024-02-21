import { Card } from '@/components/ui/card';
import dayjs from 'dayjs';
import { getComments } from '../queries/get-comments';
import { getAuth } from '@/features/auth/queries/get-auth';
import { CommentDeleteButton } from './comment-delete-button';

type CommentItemProps = {
  // comment: Comment (missed the includes)
  comment: Awaited<ReturnType<typeof getComments>>[number];
};

const CommentItem = async ({ comment }: CommentItemProps) => {
  const { user } = await getAuth();

  const isCommentByUser = user?.id === comment.userId;

  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? 'Deleted User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {dayjs(comment.createdAt).format('DD MMM YY, HH:mm')}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      {isCommentByUser && <CommentDeleteButton id={comment.id} />}
    </div>
  );
};

export { CommentItem };
