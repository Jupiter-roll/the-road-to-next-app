'use client';

import {
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AttachmentCreateButton } from '@/features/attachment/components/attachment-create-button';
import { AttachmentDeleteButton } from '@/features/attachment/components/attachment-delete-button';
import { AttachmentItem } from '@/features/attachment/components/attachment-item';
import {
  addCommentInCache,
  getInitialData,
  removeCommentFromCache,
} from '../cache';
import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentCreateForm } from './comment-create-form';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentItem } from './comment-item';

type CommentsProps = {
  ticketId: string;
  initialComments: CommentWithMetadata[];
  hasNextPage: boolean;
};

const Comments = ({
  ticketId,
  initialComments,
  hasNextPage: initialHasNextPage,
}: CommentsProps) => {
  const queryKey = ['comments', ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: 0,
      initialData: getInitialData(
        initialComments,
        initialHasNextPage
      ),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.metadata.hasNextPage
          ? allPages.map((page) => page.list).flat().length
          : null;
      },
    });

  const comments = data?.pages.map((page) => page.list).flat() ?? [];

  const queryClient = useQueryClient();

  const handleInvalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const handleRemoveComment = (id: string) => {
    removeCommentFromCache({ queryClient, queryKey }, { id });
    handleInvalidateQuery();
  };

  const handleCreateComment = (comment: CommentWithMetadata) => {
    addCommentInCache({ queryClient, queryKey }, { comment });
    handleInvalidateQuery();
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

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

      <div className="space-y-2 ml-8">
        {comments.map((comment) => {
          const sections = [];

          if (comment.attachments?.length) {
            sections.push({
              label: 'Attachments',
              content: comment.attachments.map((attachment) => (
                <AttachmentItem
                  key={attachment.id}
                  attachment={attachment}
                  buttons={[
                    ...(comment.isOwner
                      ? [
                          <AttachmentDeleteButton
                            key="0"
                            id={attachment.id}
                            onDeleteAttachment={handleInvalidateQuery}
                          />,
                        ]
                      : []),
                  ]}
                />
              )),
            });
          }

          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              sections={sections}
              buttons={[
                ...(comment.isOwner
                  ? [
                      <AttachmentCreateButton
                        key="0"
                        entityId={comment.id}
                        entity="COMMENT"
                        onCreateAttachment={handleInvalidateQuery}
                      />,
                      <CommentDeleteButton
                        key="1"
                        id={comment.id}
                        onRemoveComment={handleRemoveComment}
                      />,
                    ]
                  : []),
              ]}
            />
          );
        })}
      </div>

      <div className="flex flex-col justify-center" ref={ref}>
        {!hasNextPage && (
          <p className="text-right text-xs italic">
            No more comments.
          </p>
        )}
      </div>
    </>
  );
};

export { Comments };
