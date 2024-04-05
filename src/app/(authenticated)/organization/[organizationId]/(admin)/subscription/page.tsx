import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { CustomerPortalForm } from '@/features/stripe/components/customer-portal-form';
import { Products } from '@/features/stripe/components/products';
import { OrganizationBreadcrumbs } from '../_tabs/organization-breadcrumbs';

type SubscriptionPageProps = {
  params: {
    organizationId: string;
  };
};

const SubscriptionPage = async ({
  params,
}: SubscriptionPageProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Subscription"
        description="Manage your subscription"
        topNav={<OrganizationBreadcrumbs />}
        actions={
          <CustomerPortalForm organizationId={params.organizationId}>
            Manage Subscription
          </CustomerPortalForm>
        }
      />

      <Suspense fallback={<Spinner />}>
        <Products organizationId={params.organizationId} />
      </Suspense>
    </div>
  );
};

export default SubscriptionPage;
