import prisma from '@/services/prisma';

export const getTickets = async () => {
  return prisma.ticket.findMany();
};
