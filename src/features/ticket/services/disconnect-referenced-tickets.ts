import { Comment } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { findTicketIdsFromText } from '../paths';
import * as ticketRepository from '../repository';

export const disconnectReferencedTickets = async (
  comment: Comment
) => {
  const ticketIds = findTicketIdsFromText(comment.content);

  const comments = await prisma.comment.findMany({
    where: {
      ticketId: comment.ticketId,
      id: {
        not: comment.id,
      },
    },
  });

  const allOtherTicketIds = findTicketIdsFromText(
    comments.map((comment) => comment.content).join(' ')
  );

  const ticketIdsToRemove = ticketIds.filter(
    (ticketId) => !allOtherTicketIds.includes(ticketId)
  );

  await ticketRepository.disconnectReferencedTickets(
    comment.ticketId,
    ticketIdsToRemove
  );
};
