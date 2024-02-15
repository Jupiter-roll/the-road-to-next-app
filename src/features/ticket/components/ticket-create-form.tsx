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
      <Input id="title" name="title" placeholder="Title ..." />
      <FieldError formState={formState} name="title" />

      <Textarea
        id="content"
        name="content"
        placeholder="Content ..."
      />
      <FieldError formState={formState} name="content" />

      <SubmitButton />
    </form>
  );
};

export { TicketCreateForm };
