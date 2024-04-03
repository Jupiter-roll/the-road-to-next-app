'use client';

import clsx from 'clsx';
import { Loader2Icon } from 'lucide-react';
import { cloneElement } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type SubmitButtonProps = {
  label?: string;
  icon?: React.ReactElement;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

const SubmitButton = ({
  label,
  icon,
  variant = 'default',
  size = 'default',
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      variant={variant}
      size={size}
    >
      {pending && (
        <Loader2Icon
          className={clsx('h-4 w-4 animate-spin', {
            'mr-2': !!label,
          })}
        />
      )}
      {label}
      {!label && pending ? null : icon ? (
        <span
          className={clsx({
            'ml-2': !!label,
          })}
        >
          {cloneElement(icon, {
            className: 'w-4 h-4',
          })}
        </span>
      ) : null}
    </Button>
  );
};

export { SubmitButton };
