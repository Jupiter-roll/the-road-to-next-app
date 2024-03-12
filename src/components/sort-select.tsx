'use client';

import { useQueryStates } from 'nuqs';
import {
  sortOptions,
  sortParser,
} from '@/features/tickets/search-params';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

type Option = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortSelectProps = {
  options: Option[];
};

const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (sortKey: string) => {
    console.log(sortKey);

    const sortValue = options.find(
      (option) => option.sortKey === sortKey
    )?.sortValue;

    console.log(sortValue);

    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sort.sortKey}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
