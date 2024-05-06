import { TicketStatus } from '@prisma/client';
import {
  CheckCircleIcon,
  FileTextIcon,
  PencilIcon,
} from 'lucide-react';

export const TICKET_ICONS = {
  OPEN: <FileTextIcon />,
  IN_PROGRESS: <PencilIcon />,
  DONE: <CheckCircleIcon />,
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};
