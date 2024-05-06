import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInvitations } from '../queries/get-invitations';
import { InvitationDeleteButton } from './invitation-delete-button';

type InvitationListProps = {
  organizationId: string;
};

const InvitationList = async ({
  organizationId,
}: InvitationListProps) => {
  const invitations = await getInvitations(organizationId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations.map((invitation) => {
          const deleteButton = (
            <InvitationDeleteButton email={invitation.email} />
          );

          const buttons = <>{deleteButton}</>;

          return (
            <TableRow key={invitation.email}>
              <TableCell>{invitation.email}</TableCell>
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

export { InvitationList };
