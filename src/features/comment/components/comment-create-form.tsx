"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../actions/create-comment";

type CommentCreateFormProps = {
  ticketId: string;
};

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_ACTION_STATE
  );

  return (
    <Form action={action} actionState={actionState}>
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label="Comment" />
    </Form>
  );
};

export { CommentCreateForm };
