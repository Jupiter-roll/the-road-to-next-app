'use client';

import { Prisma } from '@prisma/client';
import { CommentItem } from './comment-item';

type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}>;

type CommentListProps = {
  comments: (CommentWithUser & { isOwner: boolean })[];
  onMoreButton: React.ReactNode;
  onRemoveComment: (id: string) => void;
};

const CommentList = ({
  comments,
  onMoreButton,
  onRemoveComment,
}: CommentListProps) => {
  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onRemoveComment={onRemoveComment}
        />
      ))}

      {onMoreButton}
    </div>
  );
};

export { CommentList };
