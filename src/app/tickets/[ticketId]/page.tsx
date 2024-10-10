type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  return <h2 className="text-lg">TicketPage: {ticketId}</h2>;
};

export default TicketPage;
