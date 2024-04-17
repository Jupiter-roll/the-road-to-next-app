"use client";

import { Ticket } from "@prisma/client";
import { cloneElement } from "react";
import { deleteTicket } from "../actions/delete-ticket";

type TicketDeleteButtonProps = {
  ticket: Ticket;
  trigger: React.ReactElement;
};

const TicketDeleteButton = ({ ticket, trigger }: TicketDeleteButtonProps) => {
  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };

  return cloneElement(trigger, {
    onClick: handleDeleteTicket,
  });
};

export { TicketDeleteButton };
