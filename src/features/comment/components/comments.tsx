'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getComments } from '../queries/get-comments';
import { CommentWithUser } from '../types';
import { CommentCreateForm } from './comment-create-form';
import { CommentItem } from './comment-item';

type CommentsProps = {
  ticketId: string;
  initialComments: (CommentWithUser & { isOwner: boolean })[];
  hasNextPage: boolean;
};

const Comments = ({
  ticketId,
  initialComments,
  hasNextPage: initialHasNextPage,
}: CommentsProps) => {
  const [comments, setComments] = useState(initialComments);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);

  const { ref, inView } = useInView();
  const isFetching = useRef(false);

  useEffect(() => {
    const handleMore = async () => {
      if (!hasNextPage) return;

      if (isFetching.current) return;
      isFetching.current = true;

      const { list: newComments, metadata } = await getComments(
        ticketId,
        comments.length
      );

      setComments((prevComments) => [
        ...prevComments,
        ...newComments,
      ]);
      setHasNextPage(metadata.hasNextPage);

      isFetching.current = false;
    };

    handleMore();
  }, [inView, comments, hasNextPage, ticketId]);

  const handleRemoveComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleCreateComment = (comment: CommentWithUser) => {
    setComments((prevComments) => [
      { ...comment, isOwner: true },
      ...prevComments,
    ]);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Comment</CardTitle>
          <CardDescription>
            A new comment will be created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        </CardContent>
      </Card>

      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRemoveComment={handleRemoveComment}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center" ref={ref} />
    </>
  );
};

export { Comments };
