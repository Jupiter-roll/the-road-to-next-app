'use client';

import { AttachmentEntity } from '@prisma/client';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { Input } from '@/components/ui/input';
import { createAttachments } from '../actions/create-attachments';
import { ACCEPTED } from '../constants';

type AttachmentCreateFormProps = {
  entityId: string;
  entity: AttachmentEntity;
  buttons?: React.ReactNode;
  onSuccess?: () => void;
};

const AttachmentCreateForm = ({
  entityId,
  entity,
  buttons,
  onSuccess,
}: AttachmentCreateFormProps) => {
  return (
    <Form
      action={createAttachments.bind(null, { entityId, entity })}
      onSuccess={onSuccess}
    >
      {(formState) => (
        <>
          <Input
            name="files"
            id="files"
            type="file"
            multiple
            accept={ACCEPTED.join(',')}
          />
          <FieldError formState={formState} name="files" />

          {buttons || <SubmitButton label="Upload" />}
        </>
      )}
    </Form>
  );
};

export { AttachmentCreateForm };
