'use client';

import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
import { FormState } from '@/components/form/utils/to-form-state';
import { Input } from '@/components/ui/input';
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
  const handleSuccess = (formState: FormState) => {
    if (formState.data) {
      onCreateComment(formState.data as CommentWithMetadata);
    }
  };

  return (
    <Form
      action={createComment.bind(null, ticketId)}
      onSuccess={handleSuccess}
    >
      {(formState) => (
        <>
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
        </>
      )}
    </Form>
  );
};

export { CommentCreateForm };
