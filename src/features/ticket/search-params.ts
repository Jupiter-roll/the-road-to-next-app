import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParser = {
  search: parseAsString.withDefault('').withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const sortParser = {
  sort: parseAsString.withDefault('newest').withOptions({
    shallow: false,
    clearOnDefault: true,
  }),
};

export const searchParamsCache = createSearchParamsCache({
  ...searchParser,
  ...sortParser,
});

export type SerliazedSearchParams = ReturnType<
  typeof searchParamsCache.parse
>;
