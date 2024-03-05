'use client';

import { ReactElement, cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2Icon } from 'lucide-react';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label: string;
  suffixIcon?: ReactElement;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
};

const SubmitButton = ({
  label,
  suffixIcon,
  variant = 'default',
  className,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      variant={variant}
      className={className}
      type="submit"
    >
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
