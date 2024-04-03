'use client';

import { BanIcon, CheckIcon } from 'lucide-react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { useFormFeedback } from '@/components/form/hooks/use-form-feedback';
import { SubmitButton } from '@/components/form/submit-button';
import { EMPTY_FORM_STATE } from '@/components/form/utils/to-form-state';
import { togglePermission } from '../actions/toggle-permission';

type PermissionToggleDropdownProps = {
  userId: string;
  organizationId: string;
  permissionKey: 'canDeleteTicket';
  permissionValue: boolean;
};

const PermissionToggleDropdown = ({
  userId,
  organizationId,
  permissionKey,
  permissionValue,
}: PermissionToggleDropdownProps) => {
  const [formState, action] = useFormState(
    togglePermission.bind(null, {
      userId,
      organizationId,
      permissionKey,
    }),
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
    <form action={action} ref={ref}>
      <SubmitButton
        icon={permissionValue ? <CheckIcon /> : <BanIcon />}
        size="icon"
        variant="outline"
      />
    </form>
  );
};

export { PermissionToggleDropdown };
