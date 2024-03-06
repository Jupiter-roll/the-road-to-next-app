import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { Spinner } from '@/components/spinner';
import { TicketUpsertForm } from '@/features/tickets/components/ticket-upsert-form';

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Tickets"
        description="All your tickets at one place"
      />

      <div className="mx-auto w-[420px]">
        <TicketUpsertForm />
      </div>

      <Suspense fallback={<Spinner />}>
        <div className="mx-auto animate-fade-in-from-top">
          <TicketList />
        </div>
      </Suspense>
    </div>
  );
};

export default TicketsPage;
