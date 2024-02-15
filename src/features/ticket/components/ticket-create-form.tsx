'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createTicket } from '../actions/create-ticket';
import { SubmitButton } from '@/components/form/submit-button';
import { useFormState } from 'react-dom';
import { EMPTY_FORM_STATE } from '@/utils/transform-error';
import { FieldError } from '@/components/form/field-error';
import { useToastMessage } from '@/components/form/use-toast-message';
import { useFormReset } from '@/components/form/use-form-reset';
import { DatePicker } from '@/components/date-picker';

const TicketCreateForm = () => {
  const [formState, action] = useFormState(
    createTicket,
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
        <Input id="title" name="title" placeholder="Title ..." />
        <FieldError formState={formState} name="title" />
      </div>

      <div>
        <Textarea
          id="content"
          name="content"
          placeholder="Content ..."
        />
        <FieldError formState={formState} name="content" />
      </div>

      <div className="flex gap-x-2">
        <div className="w-1/2">
          <DatePicker name="deadline" />
          <FieldError formState={formState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Input
            id="bounty"
            name="bounty"
            placeholder="Bounty ($)"
            type="number"
            step=".01"
          />
          <FieldError formState={formState} name="bounty" />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
};

export { TicketCreateForm };
