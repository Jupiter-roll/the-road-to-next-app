'use client';

import { Ticket } from '@prisma/client';
import { useRef } from 'react';
import { DatePicker } from '@/components/date-picker';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fromCent } from '@/utils/currency';
import { upsertTicket } from '../actions/upsert-ticket';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const datePickerImperativeHandleRef = useRef<{
    reset: () => void;
  }>(null);

  const handleSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <Form
      action={upsertTicket.bind(null, ticket?.id)}
      onSuccess={handleSuccess}
    >
      {(formState) => (
        <>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={ticket?.title}
          />
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
        </>
      )}
    </Form>
  );
};

export { TicketUpsertForm };
