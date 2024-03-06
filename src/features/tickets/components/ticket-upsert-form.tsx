'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { SubmitButton } from '@/components/form/submit-button';
import { FieldError } from '@/components/form/field-error';
import { Ticket } from '@prisma/client';
import { upsertTicket } from '../actions/upsert-ticket';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const upsertTicketWithId = upsertTicket.bind(null, ticket?.id);

  const [formState, action] = useFormState(
    upsertTicketWithId,
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={ticket?.title} />
      <FieldError formState={formState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={ticket?.content}
      />
      <FieldError formState={formState} name="content" />

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </form>
  );
};

export { TicketUpsertForm };
