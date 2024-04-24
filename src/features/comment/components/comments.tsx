"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { PaginatedData } from "@/types/pagination";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.metadata.hasNextPage
          ? allPages.flatMap((page) => page.list).length
          : null,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [0],
      },
    });

  const queryClient = useQueryClient();

  const comments = data?.pages.map((page) => page.list).flat() ?? [];

  const handleMore = () => fetchNextPage();

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) return;

    queryClient.setQueryData<
      InfiniteData<Awaited<ReturnType<typeof getComments>>>
    >(queryKey, (cache) => {
      if (!cache) return cache;

      const pages = cache.pages.map((page, index) => ({
        ...page,
        list:
          index === 0
            ? [{ ...comment, isOwner: true }, ...page.list]
            : page.list,
      }));

      return { ...cache, pages };
    });

    queryClient.invalidateQueries({ queryKey });
  };

  const handleDeleteComment = (id: string) => {
    queryClient.setQueryData<
      InfiniteData<Awaited<ReturnType<typeof getComments>>>
    >(queryKey, (cache) => {
      if (!cache) return cache;

      const pages = cache.pages.map((page) => ({
        ...page,
        list: page.list.filter((comment) => comment.id !== id),
      }));

      return { ...cache, pages };
    });

    queryClient.invalidateQueries({ queryKey });
  };

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="flex-1 flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        {hasNextPage && (
          <Button
            variant="ghost"
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
};

export { Comments };
