import { Spinner } from '@/components/spinner';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { Suspense } from 'react';
import { getAuth } from '@/features/auth/queries/get-auth';

// export const dynamic = 'force-dynamic';

type TicketsPageProps = {
  searchParams: {
    search: string;
  };
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="w-96 flex flex-col gap-y-8">
      <TicketUpsertForm />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} search={searchParams.search} />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
