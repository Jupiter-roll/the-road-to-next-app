import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/paths";

type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: homePath() },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
