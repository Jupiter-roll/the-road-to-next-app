export type TicketStatus = "OPEN" | "DONE" | "IN_PROGRESS";

export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};
