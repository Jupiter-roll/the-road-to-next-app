'use client';

import { BanIcon, CheckIcon } from 'lucide-react';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/form/submit-button';
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
  return (
    <Form
      action={togglePermission.bind(null, {
        userId,
        organizationId,
        permissionKey,
      })}
    >
      {() => (
        <SubmitButton
          icon={permissionValue ? <CheckIcon /> : <BanIcon />}
          size="icon"
          variant="outline"
        />
      )}
    </Form>
  );
};

export { PermissionToggleDropdown };
