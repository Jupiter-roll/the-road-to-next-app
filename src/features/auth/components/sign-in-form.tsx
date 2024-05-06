"use client";

import { useFormState } from "react-dom";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FORM_STATE } from "@/components/form/utils/to-form-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";

const SignInForm = () => {
  const [formState, action] = useFormState(signIn, EMPTY_FORM_STATE);

  return (
    <Form action={action} formState={formState}>
      <Input name="email" placeholder="Email" />
      <FieldError formState={formState} name="email" />

      <Input type="password" name="password" placeholder="Password" />
      <FieldError formState={formState} name="password" />

      <SubmitButton label="Sign In" />
    </Form>
  );
};

export { SignInForm };
