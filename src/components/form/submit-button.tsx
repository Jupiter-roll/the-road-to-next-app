'use client';

import { Loader2Icon } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} variant="outline" type="submit">
      {pending && (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      )}
      Create
    </Button>
  );
};

export { SubmitButton };
