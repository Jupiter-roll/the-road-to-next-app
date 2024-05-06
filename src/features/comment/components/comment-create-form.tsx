"use client";

import { useFormState } from "react-dom";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  EMPTY_FORM_STATE,
  FormState,
} from "@/components/form/utils/to-form-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [formState, action] = useFormState(
    createComment.bind(null, ticketId),
    EMPTY_FORM_STATE
  );

  const handleSuccess = (
    formState: FormState<CommentWithMetadata | undefined>
  ) => {
    onCreateComment?.(formState.data);
  };

  return (
    <Form<CommentWithMetadata>
      action={action}
      formState={formState}
      onSuccess={handleSuccess}
    >
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError formState={formState} name="content" />

      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };
