'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const createTicket = async (formData: FormData) => {
  const formDataRaw = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  await prisma.ticket.create({
    data: {
      title: formDataRaw.title as string,
      content: formDataRaw.content as string,
    },
  });

  revalidatePath('/tickets');
};
