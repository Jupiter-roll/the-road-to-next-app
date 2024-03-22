'use client';

import { Ticket } from '@prisma/client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { DatePicker } from '@/components/date-picker';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fromCent } from '@/utils/currency';
import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const upsertTicketWithId = upsertTicket.bind(null, ticket?.id);

  const [formState, action] = useFormState(
    upsertTicketWithId,
    EMPTY_FORM_STATE
  );

  const datePickerImperativeHandleRef = useRef<{
    reset: () => void;
  }>(null);

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
      datePickerImperativeHandleRef.current?.reset();
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

      <div className="flex mb-1 gap-x-2">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            id="deadline"
            name="deadline"
            defaultValue={ticket?.deadline}
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError formState={formState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step=".01"
            defaultValue={
              ticket?.bounty ? fromCent(ticket.bounty) : ''
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
