import { ZodError } from 'zod';

export type FormState = {
  status: 'IDLE' | 'SUCCESS' | 'ERROR';
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_FORM_STATE: FormState = {
  status: 'IDLE' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
};

export const transformError = (error: unknown) => {
  if (error instanceof ZodError) {
    return {
      status: 'ERROR' as const,
      fieldErrors: error.flatten().fieldErrors,
      message: '',
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: 'ERROR' as const,
      fieldErrors: {},
      message: error.message,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: 'ERROR' as const,
      fieldErrors: {},
      message: 'An unknown error occurred',
      timestamp: Date.now(),
    };
  }
};
