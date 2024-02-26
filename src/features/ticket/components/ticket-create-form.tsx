'use client';

import { useFormState } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createTicket } from '../actions/create-ticket';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { FieldError } from '@/components/form/field-error';
import { useToastMessage } from '@/components/form/hooks/use-toast-message';
import { useFormReset } from '@/components/form/hooks/use-form-reset';

const TicketCreateForm = () => {
  const [formState, action] = useFormState(
    createTicket,
    EMPTY_FORM_STATE
  );

  const noScriptFallback = useToastMessage(formState);
  const formRef = useFormReset(formState);

  return (
    <form
      action={action}
      ref={formRef}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" />
      <FieldError formState={formState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />
      <FieldError formState={formState} name="content" />

      <SubmitButton />

      {noScriptFallback}
    </form>
  );
};

export { TicketCreateForm };
