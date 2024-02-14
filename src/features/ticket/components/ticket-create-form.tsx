'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const TicketCreateFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Is required',
  }),
  content: z.string().min(1, {
    message: 'Is required',
  }),
});

const TicketCreateForm = () => {
  const form = useForm<z.infer<typeof TicketCreateFormSchema>>({
    resolver: zodResolver(TicketCreateFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = () => {
    // TODO action
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Content ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export { TicketCreateForm };
