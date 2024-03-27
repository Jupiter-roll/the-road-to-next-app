import { FormState } from '@/components/form/utils/to-form-state';
import { cn } from '@/lib/utils';

type FieldErrorProps = {
  formState: FormState;
  name: string;
  className?: string;
};

const FieldError = ({
  formState,
  name,
  className,
}: FieldErrorProps) => {
  const message = formState.fieldErrors[name]?.[0];

  if (!message) return null;

  return (
    <span className={cn('text-xs text-red-500', className)}>
      {formState.fieldErrors[name]?.[0]}
    </span>
  );
};

export { FieldError };
