import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { OrganizationList } from '@/features/organization/components/organization-list';
import { organizationCreatePath } from '@/paths';

const OrganizationsPage = async () => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Organizations"
        description="All your organizations"
        actions={
          <Button asChild>
            <Link href={organizationCreatePath()}>
              <PlusIcon className="mr-2 w-4 h-4" />
              Create Organization
            </Link>
          </Button>
        }
      />

      <Suspense fallback={<Spinner />}>
        <div className="px-4 animate-fade-in-from-top">
          <OrganizationList />
        </div>
      </Suspense>
    </div>
  );
};

export default OrganizationsPage;
