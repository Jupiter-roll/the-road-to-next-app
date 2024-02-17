'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { upsertTicket } from '../actions/upsert-ticket';
import { SubmitButton } from '@/components/form/submit-button';
import { useFormState } from 'react-dom';
import { EMPTY_FORM_STATE } from '@/utils/transform-error';
import { FieldError } from '@/components/form/field-error';
import { useToastMessage } from '@/components/form/use-toast-message';
import { useFormReset } from '@/components/form/use-form-reset';
import { DatePicker } from '@/components/date-picker';
import { Ticket } from '@prisma/client';
import currency from 'currency.js';

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [formState, action] = useFormState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_FORM_STATE
  );

  const formRef = useFormReset(formState);
  useToastMessage(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col gap-y-2"
    >
      <div>
        <Input
          name="title"
          placeholder="Title ..."
          defaultValue={ticket?.title}
        />
        <FieldError formState={formState} name="title" />
      </div>

      <div>
        <Textarea
          name="content"
          placeholder="Content ..."
          defaultValue={ticket?.content}
        />
        <FieldError formState={formState} name="content" />
      </div>

      <div className="flex gap-x-2">
        <div className="w-1/2">
          <DatePicker
            name="deadline"
            defaultValue={ticket?.deadline}
          />
          <FieldError formState={formState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Input
            name="bounty"
            placeholder="Bounty ($)"
            type="number"
            step=".01"
            defaultValue={
              ticket?.bounty
                ? currency(ticket.bounty, {
                    fromCents: true,
                  }).value
                : undefined
            }
          />
          <FieldError formState={formState} name="bounty" />
        </div>
      </div>

      <SubmitButton label={ticket ? 'Edit' : 'Create'} />
    </form>
  );
};

export { TicketUpsertForm };
