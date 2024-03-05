'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/form/submit-button';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { DatePicker } from '@/components/date-picker';
import { upsertTicket } from '../actions/upsert-ticket';
import { getTicket } from '../queries/get-ticket';
import { fromCent } from '@/lib/big';

type TicketUpsertFormProps = {
  ticket?: Awaited<ReturnType<typeof getTicket>>;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [formState, action] = useFormState(
    upsertTicket.bind(null, ticket?.id),
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

      <div className="flex gap-x-2">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={ticket?.deadline}
          />
          <FieldError formState={formState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            step=".01"
            id="bounty"
            name="bounty"
            defaultValue={
              ticket?.bounty ? fromCent(ticket.bounty) : undefined
            }
          />
          <FieldError formState={formState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />

      <noscript>
        {formState.status === 'ERROR' && (
          <div style={{ color: 'red' }}>{formState.message}</div>
        )}

        {formState.status === 'SUCCESS' && (
          <div style={{ color: 'green' }}>{formState.message}</div>
        )}
      </noscript>
    </form>
  );
};

export { TicketUpsertForm };
