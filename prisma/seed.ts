import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialTickets = [
  {
    userId: '1',
    title: 'Ticket 1',
    content: 'This is the first ticket.',
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    userId: '1',
    title: 'Ticket 2',
    content: 'This is the second ticket.',
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    userId: '1',
    title: 'Ticket 3',
    content: 'This is the third ticket.',
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
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
