import { prisma } from '@/lib/prisma';

export const connectReferencedTickets = async (
  ticketId: string,
  ticketIds: string[]
) => {
  if (ticketIds.length) {
    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        referencedTickets: {
          connect: ticketIds.map((id) => ({
            id,
          })),
        },
      },
    });
  }
};
