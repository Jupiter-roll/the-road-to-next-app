import { Button } from '@/components/ui/button';
import { createTicket } from '../actions/create-ticket';

const TicketCreateForm = () => {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="bg-background p-2 text-sm rounded-md"
      />

      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        className="bg-background p-2 text-sm rounded-md"
      />

      <Button type="submit">Create</Button>
    </form>
  );
};

export { TicketCreateForm };
