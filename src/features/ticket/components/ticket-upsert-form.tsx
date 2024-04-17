"use client";

import { Ticket } from "@prisma/client";
import { useFormState } from "react-dom";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
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

  return (
    <Form action={action} formState={formState}>
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket?.title} />
      <FieldError formState={formState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content} />
      <FieldError formState={formState} name="content" />

      <SubmitButton label={ticket ? "Edit" : "Create"} />
    </Form>
  );
};

export { TicketUpsertForm };
