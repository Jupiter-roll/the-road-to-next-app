import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { InvitationCreateButton } from '@/features/invitation/components/invitation-create-button';
import { MembershipList } from '@/features/membership/components/membership-list';
import { OrganizationBreadcrumbs } from '../_tabs/organization-breadcrumbs';

type MembershipsPageProps = {
  params: {
    organizationId: string;
  };
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Memberships"
        description="Manage your members in your organization"
        topNav={<OrganizationBreadcrumbs />}
        actions={
          <InvitationCreateButton
            organizationId={params.organizationId}
          />
        }
      />

      <Suspense fallback={<Spinner />}>
        <div className="px-4 animate-fade-in-from-top">
          <MembershipList organizationId={params.organizationId} />
        </div>
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
