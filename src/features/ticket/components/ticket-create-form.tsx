import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitButton } from '@/components/form/submit-button';
import { createTicket } from '../actions/create-ticket';

const TicketCreateForm = () => {
  return (
    <form action={createTicket} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" />

      <SubmitButton />
    </form>
  );
};

export { TicketCreateForm };
