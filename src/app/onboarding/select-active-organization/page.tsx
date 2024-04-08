import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { getAuth } from '@/features/auth/queries/get-auth';
import { OrganizationList } from '@/features/organization/components/organization-list';
import { organizationsPath } from '@/paths';

const SelectActiveOrganizationsPage = async () => {
  const { user } = await getAuth();

  if (user?.activeOrganizationId) {
    redirect(organizationsPath());
  }

  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Select Organizations"
        description="Pick one organization to work with"
      />

      <Suspense fallback={<Spinner />}>
        <div className="px-4 animate-fade-in-from-top">
          <OrganizationList />
        </div>
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationsPage;
