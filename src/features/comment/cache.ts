import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { getComments } from "./queries/get-comments";
import { CommentWithMetadata } from "./types";

type CacheArgs = {
  queryClient: ReturnType<typeof useQueryClient>;
  queryKey: string[];
};

export const addCommentInCache = (
  { queryClient, queryKey }: CacheArgs,
  payload: { comment: CommentWithMetadata }
) => {
  queryClient.setQueryData<
    InfiniteData<Awaited<ReturnType<typeof getComments>>>
  >(queryKey, (cache) => {
    if (!cache) return cache;

    const pages = cache.pages.map((page, index) => ({
      ...page,
      list:
        index === 0
          ? [{ ...payload.comment, isOwner: true }, ...page.list]
          : page.list,
    }));

    return { ...cache, pages };
  });
};

export const removeCommentFromCache = (
  { queryClient, queryKey }: CacheArgs,
  payload: { id: string }
) => {
  queryClient.setQueryData<
    InfiniteData<Awaited<ReturnType<typeof getComments>>>
  >(queryKey, (cache) => {
    if (!cache) return cache;

    const pages = cache.pages.map((page) => ({
      ...page,
      list: page.list.filter((comment) => comment.id !== payload.id),
    }));

    return { ...cache, pages };
  });
};
