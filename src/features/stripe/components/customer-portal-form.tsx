import { Button } from '@/components/ui/button';
import { createCustomerPortal } from '../actions/create-customer-portal';

type CustomerPortalFormProps = {
  organizationId: string | null | undefined;
  children: React.ReactNode;
};

const CustomerPortalForm = ({
  organizationId,
  children,
}: CustomerPortalFormProps) => {
  return (
    <form action={createCustomerPortal.bind(null, organizationId)}>
      <Button type="submit">{children}</Button>
    </form>
  );
};

export { CustomerPortalForm };
