import { PrismaClient } from "@prisma/client";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    // use your own email here
    email: "daniel.drehmann@gmail.com",
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("DB Seed: Started ...");

  await prisma.user.deleteMany();
  await prisma.ticket.deleteMany();

  // https://github.com/prisma/prisma/issues/8131
  const dbUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await new Argon2id().hash("geheimnis");

      return prisma.user.create({
        data: {
          ...user,
          id: generateId(15),
          hashedPassword,
        },
      });
    })
  );

  await prisma.ticket.createMany({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished (${t1 - t0}ms)`);
};

seed();
