'use client';

import { Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import React from 'react';

type SubmitButtonProps = {
  label: string;
  suffixIcon?: React.ReactNode;
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
      {suffixIcon && React.isValidElement(suffixIcon) && (
        <span className="ml-2">
          {React.cloneElement(suffixIcon as React.ReactElement, {
            className: 'w-4 h-4',
          })}
        </span>
      )}
    </Button>
  );
};

export { SubmitButton };
