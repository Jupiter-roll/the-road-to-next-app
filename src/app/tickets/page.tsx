import { Heading } from "@/components/heading";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { Suspense } from "react";

const TicketsPage = async () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Suspense>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
