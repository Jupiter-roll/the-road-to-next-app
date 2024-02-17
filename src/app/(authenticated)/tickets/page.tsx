import { Spinner } from '@/components/spinner';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { Suspense } from 'react';

// export const dynamic = 'force-dynamic';

const TicketsPage = () => {
  return (
    <div className="w-96 flex flex-col gap-y-8">
      <TicketUpsertForm />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
