import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { InvitationCreateButton } from '@/features/invitation/components/invitation-create-button';
import { InvitationList } from '@/features/invitation/components/invitation-list';
import { OrganizationBreadcrumbs } from '../_tabs/organization-breadcrumbs';

type InvitationsPageProps = {
  params: {
    organizationId: string;
  };
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Invitations"
        description="Manages your organization's invitations"
        topNav={<OrganizationBreadcrumbs />}
        actions={
          <InvitationCreateButton
            organizationId={params.organizationId}
          />
        }
      />

      <Suspense fallback={<Spinner />}>
        <div className="px-4 animate-fade-in-from-top">
          <InvitationList organizationId={params.organizationId} />
        </div>
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
