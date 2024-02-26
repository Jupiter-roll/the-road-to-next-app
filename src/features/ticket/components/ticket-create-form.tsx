'use client';

import { useFormState } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createTicket } from '../actions/create-ticket';
import { SubmitButton } from '@/components/form/submit-button';

const TicketCreateForm = () => {
  const [formState, action] = useFormState(createTicket, {
    message: '',
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      {formState.message}

      <SubmitButton />
    </form>
  );
};

export { TicketCreateForm };
