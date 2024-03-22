import { generateId } from 'lucia';
import { createDate, TimeSpan } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { prisma } from '@/lib/prisma';

export const createPasswordResetToken = async (userId: string) => {
  await prisma.resetToken.deleteMany({
    where: {
      userId,
    },
  });

  const tokenId = generateId(40);
  const tokenHash = encodeHex(
    await sha256(new TextEncoder().encode(tokenId))
  );

  await prisma.resetToken.create({
    data: {
      tokenHash,
      userId,
      expiresAt: createDate(new TimeSpan(2, 'h')),
    },
  });

  return tokenId;
};
