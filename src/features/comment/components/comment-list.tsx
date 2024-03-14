'use client';

import { useState } from 'react';
import { Prisma } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { CommentItem } from './comment-item';
import { getComments } from '../queries/get-comments';

type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}>;

type CommentListProps = {
  ticketId: string;
  initialComments: (CommentWithUser & { isOwner: boolean })[];
  hasNextPage: boolean;
};

const CommentList = ({
  ticketId,
  initialComments,
  hasNextPage: initialHasNextPage,
}: CommentListProps) => {
  const [{ comments, hasNextPage }, setCommentData] = useState({
    comments: initialComments,
    hasNextPage: initialHasNextPage,
  });

  const handleMore = async () => {
    const { list: moreComments, metadata: moreCommentsMetadata } =
      await getComments(ticketId, comments.length);

    setCommentData((prev) => ({
      comments: [...prev.comments, ...moreComments],
      hasNextPage: moreCommentsMetadata.hasNextPage,
    }));
  };

  const handleRemoveComment = (id: string) => {
    setCommentData((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment.id !== id),
    }));
  };

  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onRemoveComment={handleRemoveComment}
        />
      ))}

      <div className="flex flex-col justify-center">
        <Button
          variant="ghost"
          disabled={!hasNextPage}
          onClick={handleMore}
        >
          More
        </Button>
      </div>
    </div>
  );
};

export { CommentList };
