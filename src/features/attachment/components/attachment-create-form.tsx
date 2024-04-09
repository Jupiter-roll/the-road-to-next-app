'use client';

import { AttachmentEntity } from '@prisma/client';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { createAttachments } from '../actions/create-attachments';
import { ACCEPTED_TYPES } from '../constants';

type AttachmentCreateFormProps = {
  entityId: string;
  entity: AttachmentEntity;
  onSuccess?: () => void;
};

const AttachmentCreateForm = ({
  entityId,
  entity,
  onSuccess,
}: AttachmentCreateFormProps) => {
  const [formState, action] = useFormState(
    createAttachments.bind(null, { entityId, entity }),
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      onSuccess?.();
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form ref={ref} action={action} className="flex flex-col gap-y-2">
      <Input
        name="files"
        id="files"
        type="file"
        multiple
        accept={ACCEPTED_TYPES.join(',')}
      />
      <FieldError formState={formState} name="files" />

      <SubmitButton label="Upload" />
    </form>
  );
};

export { AttachmentCreateForm };
