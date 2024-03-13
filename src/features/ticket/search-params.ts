import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from 'nuqs/server';

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

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const pagionationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = ReturnType<
  typeof searchParamsCache.parse
>;
