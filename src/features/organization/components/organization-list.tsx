import {
  ArrowLeftRightIcon,
  ArrowUpRightFromSquareIcon,
  PenIcon,
  TrashIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAuth } from '@/features/auth/queries/get-auth';
import { getOrganizations } from '../queries/get-organizations';
import { SwitchToOrganizationButton } from './switch-to-organization-button';

const OrganizationList = async () => {
  const { user } = await getAuth();
  const organizations = await getOrganizations();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => {
          const isActiveOrganization =
            user?.activeOrganizationId === organization.id;

          const buttons = (
            <>
              <SwitchToOrganizationButton
                organizationId={organization.id}
                trigger={
                  <Button
                    variant={
                      isActiveOrganization ? 'default' : 'outline'
                    }
                  >
                    <ArrowLeftRightIcon className="w-4 h-4" />
                  </Button>
                }
              />
              <Button variant="outline" size="icon">
                <ArrowUpRightFromSquareIcon className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <PenIcon className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <TrashIcon className="w-4 h-4" />
              </Button>
            </>
          );

          return (
            <TableRow key={organization.id}>
              <TableCell>{organization.id}</TableCell>
              <TableCell>{organization.name}</TableCell>
              <TableCell className="flex justify-end gap-x-2">
                {buttons}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export { OrganizationList };
