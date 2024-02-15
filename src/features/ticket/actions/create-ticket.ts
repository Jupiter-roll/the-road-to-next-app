'use server';

import prisma from '@/services/prisma';
import { revalidatePath } from 'next/cache';

export const createTicket = async (formData: FormData) => {
  const rawFormData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  if (!rawFormData.title || !rawFormData.content) {
    throw new Error('Title and content are required');
  }

  await prisma.ticket.create({
    data: {
      title: rawFormData.title as string,
      content: rawFormData.content as string,
    },
  });

  revalidatePath('/tickets');
};
