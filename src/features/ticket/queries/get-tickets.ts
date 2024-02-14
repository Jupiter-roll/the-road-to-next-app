import { initialTickets } from '../data';
import { Ticket } from '../type';

export const getTickets = async (
  value: number
): Promise<Ticket[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value % 10 === 0) {
        reject(new Error('Failed to fetch tickets'));
      } else {
        resolve(initialTickets);
      }
    }, 250);
  });
};
