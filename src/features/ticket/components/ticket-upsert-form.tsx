"use client";

import { Ticket } from "@prisma/client";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { FieldError } from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/use-action-feedback";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FORM_STATE } from "@/components/form/utils/to-form-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [formState, action] = useFormState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_FORM_STATE
  );

  useActionFeedback(formState, {
    onSuccess: ({ formState }) => {
      if (formState.message) {
        toast.success(formState.message);
      }
    },
    onError: ({ formState }) => {
      if (formState.message) {
        toast.error(formState.message);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />
      <FieldError formState={formState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <FieldError formState={formState} name="content" />

      <SubmitButton label={ticket ? "Edit" : "Create"} />

      <noscript>
        {formState.status === "ERROR" && (
          <div style={{ color: "red" }}>{formState.message}</div>
        )}

        {formState.status === "SUCCESS" && (
          <div style={{ color: "green" }}>{formState.message}</div>
        )}
      </noscript>
    </form>
  );
};

export { TicketUpsertForm };
