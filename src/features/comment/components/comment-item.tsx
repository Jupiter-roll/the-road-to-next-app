import { Card } from '@/components/ui/card';
import dayjs from 'dayjs';
import { getComments } from '../queries/get-comments';

type CommentItemProps = {
  // comment: Comment (missed the includes)
  comment: Awaited<ReturnType<typeof getComments>>[number];
};

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Card className="p-4 flex-1 flex flex-col gap-y-1">
      <div className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          {comment.user?.email ?? 'Deleted User'}
        </p>
        <p className="text-sm text-muted-foreground">
          {dayjs(comment.createdAt).format('DD MMM YY, HH:mm')}
        </p>
      </div>
      <p className="whitespace-pre-line">{comment.content}</p>
    </Card>
  );
};

export { CommentItem };
