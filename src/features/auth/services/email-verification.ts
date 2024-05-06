import { differenceInSeconds } from 'date-fns';
import { User } from 'lucia';
import { createDate, isWithinExpirationDate, TimeSpan } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { prisma } from '@/lib/prisma';

export const generateEmailVerificationCode = async (
  userId: string,
  email: string
) => {
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomString(8, alphabet('0-9'));

  await prisma.emailVerificationToken.create({
    data: {
      userId,
      email,
      code,
      expiresAt: createDate(new TimeSpan(15, 'm')),
    },
  });

  return code;
};

export const verifyVerificationCode = async (
  user: User,
  code: string
) => {
  const databaseCode = await prisma.emailVerificationToken.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!databaseCode || databaseCode.code !== code) {
    return false;
  }

  await prisma.emailVerificationToken.delete({
    where: {
      id: databaseCode.id,
    },
  });

  if (!isWithinExpirationDate(databaseCode.expiresAt)) {
    return false;
  }

  if (databaseCode.email !== user.email) {
    return false;
  }

  return true;
};

export const canResendVerificationEmail = async (userId: string) => {
  const databaseCode = await prisma.emailVerificationToken.findFirst({
    where: {
      userId,
    },
  });

  if (!databaseCode) {
    return true;
  }

  const diff = differenceInSeconds(
    new Date(),
    new Date(databaseCode.createdAt)
  );

  return diff > 60;
};
