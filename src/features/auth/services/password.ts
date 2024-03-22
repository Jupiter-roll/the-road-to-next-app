import { generateId } from 'lucia';
import { createDate, TimeSpan } from 'oslo';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { prisma } from '@/lib/prisma';
import { passwordResetPath } from '@/paths';
import { getBaseUrl } from '@/utils/url';

export const createPasswordResetLink = async (userId: string) => {
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

  const pageUrl = getBaseUrl() + passwordResetPath();
  const passwordResetLink = pageUrl + `/${tokenId}`;

  return passwordResetLink;
};
