import { Spinner } from '@/components/spinner';
import { TicketCreateForm } from '@/features/ticket/components/ticket-create-form';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { Suspense } from 'react';

const TicketsPage = () => {
  return (
    <div className="w-96 flex flex-col gap-y-8">
      <TicketCreateForm />

      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
