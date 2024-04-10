'use client';

import {
  InfiniteData,
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
import { getComments } from '../queries/get-comments';
import { CommentWithMetadata } from '../types';
import { CommentCreateForm } from './comment-create-form';
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
      initialData: {
        pages: [
          {
            list: initialComments,
            metadata: { hasNextPage: initialHasNextPage },
          },
        ],
        pageParams: [0],
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.metadata.hasNextPage
          ? allPages.map((page) => page.list).flat().length
          : null;
      },
    });

  const comments = data?.pages.map((page) => page.list).flat() ?? [];

  const queryClient = useQueryClient();

  const handleRemoveComment = (id: string) => {
    queryClient.setQueryData<
      InfiniteData<Awaited<ReturnType<typeof getComments>>>
    >(queryKey, (cachedData) => {
      if (!cachedData) return cachedData;

      const pages = cachedData.pages.map((page) => ({
        ...page,
        list: page.list.filter((comment) => comment.id !== id),
      }));

      return { ...cachedData, pages };
    });

    queryClient.invalidateQueries({ queryKey });
  };

  const handleCreateComment = (comment: CommentWithMetadata) => {
    queryClient.setQueryData<
      InfiniteData<Awaited<ReturnType<typeof getComments>>>
    >(queryKey, (cachedData) => {
      if (!cachedData) return cachedData;

      const pages = cachedData.pages.map((page, index) => ({
        ...page,
        list:
          index === 0
            ? [{ ...comment, isOwner: true }, ...page.list]
            : page.list,
      }));

      return { ...cachedData, pages };
    });

    queryClient.invalidateQueries({ queryKey });
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
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRemoveComment={handleRemoveComment}
          />
        ))}
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
