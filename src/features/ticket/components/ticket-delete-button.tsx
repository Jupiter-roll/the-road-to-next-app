import { Ticket } from "@prisma/client";
import { deleteTicket } from "../actions/delete-ticket";

type TicketDeleteButtonProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
};

const TicketDeleteButton = ({ ticket, trigger }: TicketDeleteButtonProps) => {
  return <form action={deleteTicket.bind(null, ticket.id)}>{trigger}</form>;
};

export { TicketDeleteButton };
