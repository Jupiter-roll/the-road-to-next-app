import { PrismaClient } from '@prisma/client';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

const prisma = new PrismaClient();

const tickets = [
  {
    title: 'Ticket 1',
    content: 'First ticket from DB.',
    status: 'DONE' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 499,
  },
  {
    title: 'Ticket 2',
    content: 'Second ticket from DB.',
    status: 'OPEN' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 399,
  },
  {
    title: 'Ticket 3',
    content: 'Third ticket from DB.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date().toISOString().split('T')[0],
    bounty: 599,
  },
];

const users = [
  {
    username: 'admin',
    email: 'admin@admin.com',
  },
  {
    username: 'user',
    // use your own email here
    email: 'daniel.drehmann@gmail.com',
  },
];

const comments = [
  { content: 'First comment from DB.' },
  { content: 'Second comment from DB.' },
  { content: 'Third comment from DB.' },
];

const seed = async () => {
  const t0 = performance.now();
  console.log('Seed: Started ...');

  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.membership.deleteMany();

  const dbUsers = await Promise.all(
    users.map(async (user, index) => {
      const hashedPassword = await new Argon2id().hash('geheimnis');

      return prisma.user.create({
        data: {
          ...user,
          emailVerified: index === 0,
          id: generateId(15),
          hashedPassword,
        },
      });
    })
  );

  const dbOrganization = await prisma.organization.create({
    data: {
      name: dbUsers[0].username,
    },
  });

  await prisma.membership.create({
    data: {
      userId: dbUsers[0].id,
      organizationId: dbOrganization.id,
      membershipRole: 'ADMIN' as const,
    },
  });

  // https://github.com/prisma/prisma/issues/8131
  const dbTickets = await Promise.all(
    tickets.map(async (ticket) => {
      return prisma.ticket.create({
        data: {
          ...ticket,
          userId: dbUsers[0].id,
          organizationId: dbOrganization.id,
        },
      });
    })
  );

  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      ticketId: dbTickets[0].id,
      userId: dbUsers[1].id,
    })),
  });

  const t1 = performance.now();
  console.log(`Seed: Finished (${t1 - t0}ms)`);
};

seed();
