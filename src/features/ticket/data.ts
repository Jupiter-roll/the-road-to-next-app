import { Ticket } from './type';

export const initialTickets: Ticket[] = [
  {
    id: '1',
    title: 'Ticket 1',
    content: 'This is the first ticket. qwdqwdqwdqwdqwd',
    status: 'DONE',
  },
  {
    id: '2',
    title: 'Ticket 2',
    content: 'This is the second ticket.',
    status: 'OPEN',
  },
  {
    id: '3',
    title: 'Ticket 3',
    content: 'This is the second ticket.',
    status: 'IN_PROGRESS',
  },
];
