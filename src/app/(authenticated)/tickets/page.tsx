import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { TicketList } from '@/features/tickets/components/ticket-list';
import { Spinner } from '@/components/spinner';
import { TicketUpsertForm } from '@/features/tickets/components/ticket-upsert-form';
import { getAuth } from '@/features/auth/queries/get-auth';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  SearchParams,
  searchParamsCache,
} from '@/features/tickets/search-params';

type TicketsPageProps = {
  searchParams: SearchParams;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  const { user } = await getAuth();

  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="Tickets"
        description="All your tickets at one place"
      />

      <div className="mx-auto w-[420px]">
        <Card>
          <CardHeader>
            <CardTitle>Create Ticket</CardTitle>
            <CardDescription>
              A new ticket will be created
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketUpsertForm />
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<Spinner />}>
        <div className="mx-auto animate-fade-in-from-top">
          <TicketList
            userId={user?.id}
            searchParams={searchParamsCache.parse(searchParams)}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default TicketsPage;
