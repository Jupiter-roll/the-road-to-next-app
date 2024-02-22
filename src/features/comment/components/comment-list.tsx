'use client';

import { useState } from 'react';
import { getComments } from '../queries/get-comments';
import { CommentItem } from './comment-item';
import { SubmitButton } from '@/components/form/submit-button';

type CommentListProps = {
  ticketId: string;
  initialComments: Awaited<
    ReturnType<typeof getComments>
  >['comments'];
  initialHasNextPage: boolean;
};

const CommentList = ({
  ticketId,
  initialComments,
  initialHasNextPage,
}: CommentListProps) => {
  const [pagination, setPagination] = useState({
    offset: initialComments.length,
    hasNextPage: initialHasNextPage,
    comments: initialComments,
  });

  const loadMoreComments = async () => {
    const { comments, metadata } = await getComments(
      ticketId,
      pagination.offset
    );

    setPagination((state) => ({
      offset: state.offset + comments.length,
      comments: [...state.comments, ...comments],
      hasNextPage: metadata.hasNextPage,
    }));
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-2">
        {pagination.comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {pagination.hasNextPage && (
        <form action={loadMoreComments}>
          <SubmitButton
            label="Load More"
            variant="ghost"
            className="w-full"
          />
        </form>
      )}
    </div>
  );
};

export { CommentList };
