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
import { OrganizationSwitchButton } from './organization-switch-button';

const OrganizationList = async () => {
  const { user, organizations, activeRole } = await getAuth();

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

          const organizationSwitchIcon = (
            <OrganizationSwitchButton
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
          );

          const myMembership = organization.memberships.find(
            (membership) => membership.userId === user?.id
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
              {organizationSwitchIcon}
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
