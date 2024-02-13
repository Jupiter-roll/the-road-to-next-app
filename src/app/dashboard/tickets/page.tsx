import { TicketItem } from '@/features/ticket/components/ticket-item';
import { Ticket } from '@/features/ticket/type';

const initialTickets: Ticket[] = [
  {
    id: '1',
    name: 'Ticket 1 qwdqwd qwdqwd qwdqwd qwdqwd',
    content: 'This is the first ticket. qwdqwdqwdqwdqwd',
    status: 'DONE',
  },
  {
    id: '2',
    name: 'Ticket 2',
    content: 'This is the second ticket.',
    status: 'OPEN',
  },
  {
    id: '3',
    name: 'Ticket 3',
    content: 'This is the second ticket.',
    status: 'IN_PROGRESS',
  },
];

const TicketsPage = () => {
  return (
    <div className="max-w-96 flex flex-col gap-y-2">
      {initialTickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsPage;
