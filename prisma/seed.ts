import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialTickets = [
  {
    title: 'Ticket 1',
    content: 'This is the first ticket.',
  },
  {
    title: 'Ticket 2',
    content: 'This is the second ticket.',
  },
  {
    title: 'Ticket 3',
    content: 'This is the third ticket.',
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany();

  const promises = initialTickets.map((ticket) => {
    return prisma.ticket.create({
      data: ticket,
    });
  });

  await Promise.all(promises);
};

seed();
