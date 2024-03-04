import { TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '@/components/delete-button';
import { deleteTicket } from '../actions/delete-ticket';

type TicketDeleteButtonProps = {
  id: string;
};

const TicketDeleteButton = ({ id }: TicketDeleteButtonProps) => {
  const deleteTicketAction = deleteTicket.bind(null, id);

  return (
    <DeleteButton
      action={deleteTicketAction}
      subject="ticket"
      trigger={
        <Button variant="outline" size="icon">
          <TrashIcon className="h-4 w-4" />
        </Button>
      }
    />
  );
};

export { TicketDeleteButton };
