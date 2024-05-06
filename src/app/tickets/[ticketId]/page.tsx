type TicketPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketPage = ({ params }: TicketPageProps) => {
  return <h2 className="text-lg">TicketPage: {params.ticketId}</h2>;
};

export default TicketPage;
