'use client';

import { useQueryState } from 'nuqs';
import { searchParser } from '@/features/ticket/search-params';
import { SearchInput } from '@/components/search-input';

type SearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};

export { TicketSearchInput };
