import { TicketStatus } from '@prisma/client';

export const TICKET_STATUS_TO_LABEL: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};
