'use client';

import { Textarea } from '@/components/ui/textarea';
import { createComment } from '../actions/create-comment';
import { SubmitButton } from '@/components/form/submit-button';
import { useFormState } from 'react-dom';
import { EMPTY_FORM_STATE } from '@/utils/transform-error';
import { FieldError } from '@/components/form/field-error';
import { useToastMessage } from '@/components/form/use-toast-message';
import { useFormReset } from '@/components/form/use-form-reset';

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [formState, action] = useFormState(
    createComment.bind(null, ticketId),
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
        <Textarea
          name="content"
          placeholder="What's on your mind ..."
        />
        <FieldError formState={formState} name="content" />
      </div>

      <SubmitButton label="Comment" />
    </form>
  );
};

export { CommentCreateForm };
