import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export type SearchParams = {
  search: string | string[] | undefined;
  sort: string | string[] | undefined;
};

export const searchParser = parseAsString
  .withDefault('')
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const sortParser = {
  sortKey: parseAsString.withDefault('createdAt'),
  sortValue: parseAsString.withDefault('desc'),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
});

export type ParsedSearchParams = ReturnType<
  typeof searchParamsCache.parse
>;
