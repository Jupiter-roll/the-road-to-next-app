'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { createOrganization } from '../actions/create-organization';

const OrganizationCreateForm = () => {
  const [formState, action] = useFormState(
    createOrganization,
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <Input name="name" placeholder="Name" />
      <FieldError formState={formState} name="name" />

      <SubmitButton label="Create" />
    </form>
  );
};

export { OrganizationCreateForm };
