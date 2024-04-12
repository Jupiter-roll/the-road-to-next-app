'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { FieldError } from '@/components/form/field-error';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ACCEPTED } from '@/features/attachment/constants';
import { createComment } from '../actions/create-comment';
import { CommentWithMetadata } from '../types';

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment: (comment: CommentWithMetadata) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
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

      if (formState.data) {
        onCreateComment(formState.data as CommentWithMetadata);
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

      <Input
        name="files"
        id="files"
        type="file"
        multiple
        accept={ACCEPTED.join(',')}
      />
      <FieldError formState={formState} name="files" />

      <SubmitButton label="Comment" />
    </form>
  );
};

export { CommentCreateForm };
