import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { Heading } from '@/components/heading';
import { Spinner } from '@/components/spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TicketList } from '@/features/ticket/components/ticket-list';
import { TicketUpsertForm } from '@/features/ticket/components/ticket-upsert-form';
import { searchParamsCache } from '@/features/ticket/search-params';

type TicketsPageProps = {
  searchParams: SearchParams;
};

const TicketsPage = async ({ searchParams }: TicketsPageProps) => {
  return (
    <div className="flex flex-col flex-1 gap-y-8">
      <Heading
        title="My Tickets"
        description="All your tickets at one place"
      />

      <Card className="mx-auto w-[420px]">
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

      <Suspense fallback={<Spinner />}>
        <div className="flex flex-1 mx-auto animate-fade-in-from-top">
          <TicketList
            byOrganization
            searchParams={searchParamsCache.parse(searchParams)}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default TicketsPage;
