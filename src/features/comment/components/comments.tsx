'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CommentWithUser } from '../types';
import { CommentCreateForm } from './comment-create-form';
import { CommentItem } from './comment-item';
import { getComments } from '../queries/get-comments';

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

  const handleMore = async () => {
    const { list: newComments, metadata } = await getComments(
      ticketId,
      comments.length
    );

    setComments((prevComments) => [...prevComments, ...newComments]);
    setHasNextPage(metadata.hasNextPage);
  };

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

      <div className="flex flex-col justify-center">
        <Button
          variant="ghost"
          disabled={!hasNextPage}
          onClick={handleMore}
        >
          More
        </Button>
      </div>
    </>
  );
};

export { Comments };
