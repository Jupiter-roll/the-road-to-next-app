export type TicketStatus = 'OPEN' | 'DONE' | 'IN_PROGRESS';

export type Ticket = {
  id: string;
  name: string;
  content: string;
  status: TicketStatus;
};
