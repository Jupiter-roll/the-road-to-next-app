import { initialTickets } from '@/data';
import { Ticket } from '../type';

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};
