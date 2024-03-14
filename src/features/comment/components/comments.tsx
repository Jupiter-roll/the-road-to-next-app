'use client';

import { useState } from 'react';
import { Prisma } from '@prisma/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getComments } from '../queries/get-comments';
import { CommentCreateForm } from './comment-create-form';
import { CommentList } from './comment-list';

type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: { username: true };
    };
  };
}>;

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
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Comment</CardTitle>
          <CardDescription>
            A new comment will be created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CommentCreateForm ticketId={ticketId} />
        </CardContent>
      </Card>

      <CommentList
        comments={comments}
        onRemoveComment={handleRemoveComment}
        onMoreButton={
          <div className="flex flex-col justify-center">
            <Button
              variant="ghost"
              disabled={!hasNextPage}
              onClick={handleMore}
            >
              More
            </Button>
          </div>
        }
      />
    </>
  );
};

export { Comments };
