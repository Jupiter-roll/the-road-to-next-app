'use client';

import { useDebouncedCallback } from 'use-debounce';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Input } from './ui/input';
import { ChangeEvent } from 'react';

type SearchProps = {
  placeholder: string;
};

const Search = ({ placeholder }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }

      replace(`${pathname}?${params.toString()}`);
    },
    250
  );

  return (
    <Input
      defaultValue={searchParams.get('search')?.toString()}
      onChange={handleSearch}
      placeholder={placeholder}
    />
  );
};

export { Search };
