import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { OrganizationList } from '@/features/organization/components/organization-list';

const SelectActiveOrganizationsPage = async () => {
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
