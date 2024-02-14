import { Button } from '@/components/ui/button';
import { MessageSquareWarningIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="self-center flex flex-col items-center gap-y-2">
      <MessageSquareWarningIcon className="w-12 h-12" />

      <h2 className="text-md">Ticket not found</h2>

      <Button variant="link" asChild>
        <Link href="/tickets">Go to Tickets</Link>
      </Button>
    </div>
  );
}
