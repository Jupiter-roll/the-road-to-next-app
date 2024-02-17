import { Button } from '@/components/ui/button';
import { ticketsPath } from '@/utils/paths';
import { MessageSquareWarningIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="self-center flex flex-col items-center gap-y-2">
      <MessageSquareWarningIcon className="w-12 h-12" />

      <h2 className="text-md">We could not find your ticket.</h2>

      <Button variant="link" asChild>
        <Link href={ticketsPath()}>Go to Tickets</Link>
      </Button>
    </div>
  );
}
