'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { createOrganization } from '../actions/create-organization';

const OrganizationCreateForm = () => {
  return (
    <Form action={createOrganization}>
      {(formState) => (
        <>
          <Input name="name" placeholder="Name" />
          <FieldError formState={formState} name="name" />

          <SubmitButton label="Create" />
        </>
      )}
    </Form>
  );
};

export { OrganizationCreateForm };
