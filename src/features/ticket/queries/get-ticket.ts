import { initialTickets } from '../data';
import { Ticket } from '../type';

export const getTicket = async (
  id: string
): Promise<Ticket | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTickets.find((ticket) => ticket.id === id));
    }, 250);
  });
};
