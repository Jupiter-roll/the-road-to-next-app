'use client';

import { Form } from '@/components/form/form';
import { switchOrganization } from '../actions/switch-organization';

type OrganizationSwitchButtonProps = {
  organizationId: string;
  trigger: React.ReactElement;
};

const OrganizationSwitchButton = ({
  organizationId,
  trigger,
}: OrganizationSwitchButtonProps) => {
  return (
    <Form action={switchOrganization.bind(0, organizationId)}>
      {() => trigger}
    </Form>
  );
};

export { OrganizationSwitchButton };
