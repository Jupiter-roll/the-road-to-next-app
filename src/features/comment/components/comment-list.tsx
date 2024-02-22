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
  const [offset, setOffset] = useState(initialComments.length);
  const [comments, setComments] = useState(initialComments);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);

  const loadMoreComments = async () => {
    const { comments: newComments, metadata } = await getComments(
      ticketId,
      offset
    );

    setOffset((state) => state + newComments.length);
    setComments((state) => [...state, ...newComments]);
    setHasNextPage(metadata.hasNextPage);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {hasNextPage && (
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
