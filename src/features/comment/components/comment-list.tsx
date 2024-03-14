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
  initialComments: (CommentWithUser & { isOwner: boolean })[];
};

const CommentList = ({ initialComments }: CommentListProps) => {
  return (
    <div className="space-y-2">
      {initialComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export { CommentList };
