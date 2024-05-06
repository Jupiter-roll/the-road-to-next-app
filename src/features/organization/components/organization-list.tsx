import {
  ArrowLeftRightIcon,
  ArrowUpRightFromSquareIcon,
  PenIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
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
import { MembershipDeleteButton } from '@/features/membership/components/membership-delete-button';
import { membershipsPath } from '@/paths';
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';
import { OrganizationSwitchButton } from './organization-switch-button';

const OrganizationList = async () => {
  const { user } = await getAuth();
  const organizations = await getOrganizationsByUser(user?.id);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>My Role</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization) => {
          const myMembership = organization.membershipByUser;

          const hasActive = !!user?.activeOrganizationId;

          const isActive =
            hasActive &&
            user.activeOrganizationId === organization.id;

          const organizationSwitchButton = (
            <OrganizationSwitchButton
              organizationId={organization.id}
              trigger={
                <Button
                  variant={
                    !hasActive
                      ? 'secondary'
                      : isActive
                      ? 'default'
                      : 'outline'
                  }
                >
                  <ArrowLeftRightIcon className="mr-2 w-4 h-4" />
                  {!hasActive
                    ? 'Activate'
                    : isActive
                    ? 'Active'
                    : 'Switch'}
                </Button>
              }
            />
          );

          const detailButton =
            myMembership?.membershipRole === 'ADMIN' ? (
              <Button variant="outline" size="icon" asChild>
                <Link href={membershipsPath(organization.id)}>
                  <ArrowUpRightFromSquareIcon className="w-4 h-4" />
                </Link>
              </Button>
            ) : null;

          const editButton =
            myMembership?.membershipRole === 'ADMIN' ? (
              <Button variant="outline" size="icon">
                <PenIcon className="w-4 h-4" />
              </Button>
            ) : null;

          const leaveButton = myMembership ? (
            <MembershipDeleteButton
              userId={myMembership.userId}
              organizationId={myMembership.organizationId}
            />
          ) : null;

          const deleteButton =
            myMembership?.membershipRole === 'ADMIN' ? (
              <Button variant="destructive" size="icon">
                <TrashIcon className="w-4 h-4" />
              </Button>
            ) : null;

          const buttons = (
            <>
              {organizationSwitchButton}
              {detailButton}
              {editButton}
              {leaveButton}
              {deleteButton}
            </>
          );

          return (
            <TableRow key={organization.id}>
              <TableCell>{organization.id}</TableCell>
              <TableCell>{organization.name}</TableCell>
              <TableCell>{myMembership.membershipRole}</TableCell>
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
