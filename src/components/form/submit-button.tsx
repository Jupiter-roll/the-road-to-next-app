'use client';

import { Loader2Icon } from 'lucide-react';
import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label: string;
  suffixIcon?: React.ReactElement;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
};

const SubmitButton = ({
  label,
  suffixIcon,
  variant = 'default',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant={variant}>
      {pending && (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {label}
      {suffixIcon && (
        <span className="ml-2">
          {cloneElement(suffixIcon, {
            className: 'w-4 h-4',
          })}
        </span>
      )}
    </Button>
  );
};

export { SubmitButton };
