import { ZodError } from "zod";

export type FormState<T = any> = {
  status: "IDLE" | "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
  data?: T;
};

export const EMPTY_FORM_STATE: FormState = {
  status: "IDLE",
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};

export const fromErrorToFormState = (error: unknown): FormState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "An unknown error occurred",
      fieldErrors: {},
      timestamp: Date.now(),
    };
  }
};

export const toFormState = (
  status: FormState["status"],
  message: string,
  data?: unknown
): FormState => {
  return {
    status,
    message,
    fieldErrors: {},
    timestamp: Date.now(),
    data,
  };
};
