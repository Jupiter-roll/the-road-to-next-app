'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: ({ sortKey, sortValue }: SortObject) => void;
  options: SortSelectOption[];
};

const SortSelect = ({
  value,
  onChange,
  options,
}: SortSelectProps) => {
  const handleSort = (sortKey: string) => {
    const sortValue = options.find(
      (option) => option.sortKey === sortKey
    )?.sortValue;

    if (!sortValue) return;

    onChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select onValueChange={handleSort} defaultValue={value.sortKey}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.sortKey} value={option.sortKey}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
