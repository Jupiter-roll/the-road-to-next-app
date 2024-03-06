import { Ticket } from '@prisma/client';
import { deleteTicket } from '../actions/delete-ticket';

type TicketDeleteButtonProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
};

const TicketDeleteButton = ({
  ticket,
  trigger,
}: TicketDeleteButtonProps) => {
  const deleteTicketAction = deleteTicket.bind(null, ticket.id);

  return <form action={deleteTicketAction}>{trigger}</form>;
};

export { TicketDeleteButton };
