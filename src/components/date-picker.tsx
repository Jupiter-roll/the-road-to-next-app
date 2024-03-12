'use client';

import { useImperativeHandle, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef: React.RefObject<{
    reset: () => void;
  }>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );

  useImperativeHandle(
    imperativeHandleRef,
    () => ({
      reset() {
        setDate(undefined);
      },
    }),
    []
  );

  const formattedStringDate = date ? format(date, 'yyyy-MM-dd') : '';

  return (
    <Popover>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant="outline"
          className="justify-start font-normal text-left"
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formattedStringDate}
          <input
            type="hidden"
            name={name}
            value={formattedStringDate}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
