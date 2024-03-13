'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/form/submit-button';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { FieldError } from '@/components/form/field-error';
import { createComment } from '../actions/create-comment';

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const createCommentWithId = createComment.bind(null, ticketId);

  const [formState, action] = useFormState(
    createCommentWithId,
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
    onSuccess: ({ formState, reset }) => {
      if (formState.message) {
        toast.success(formState.message);
      }

      reset();
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} ref={ref} className="flex flex-col gap-y-2">
      <Textarea
        name="content"
        placeholder="What's on your mind ..."
      />
      <FieldError formState={formState} name="content" />

      <SubmitButton label="Comment" />
    </form>
  );
};

export { CommentCreateForm };
