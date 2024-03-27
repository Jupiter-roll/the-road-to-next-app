'use client';

import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { switchOrganization } from '../actions/switch-organization';

type OrganizationSwitchButtonProps = {
  organizationId: string;
  trigger: React.ReactElement;
};

const OrganizationSwitchButton = ({
  organizationId,
  trigger,
}: OrganizationSwitchButtonProps) => {
  const [formState, formAction] = useFormState(
    switchOrganization.bind(0, organizationId),
    EMPTY_FORM_STATE
  );

  const { ref } = useFormFeedback(formState, {
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
    <form ref={ref} action={formAction}>
      {trigger}
    </form>
  );
};

export { OrganizationSwitchButton };
