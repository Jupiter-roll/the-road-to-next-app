import { Prisma } from '@prisma/client';
import { Card } from '@/components/ui/card';
import { getAuth } from '@/features/auth/queries/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';
import { CommentDeleteButton } from './comment-delete-button';

type CommentItemProps = {
  comment: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: { username: true };
      };
    };
  }>;
};

const CommentItem = async ({ comment }: CommentItemProps) => {
  const { user } = await getAuth();
  const isCommentOwner = isOwner(user, comment);

  return (
    <div className="flex gap-x-1">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? 'Deleted User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>

      {isCommentOwner && <CommentDeleteButton id={comment.id} />}
    </div>
  );
};

export { CommentItem };
