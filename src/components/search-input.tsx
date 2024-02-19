'use client';

import { useDebouncedCallback } from 'use-debounce';
import { useQueryState } from 'nuqs';
import { Input } from './ui/input';
import { ChangeEvent } from 'react';
import { searchParser } from '@/features/ticket/search-params';

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState('search', searchParser);

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={search}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { SearchInput };
