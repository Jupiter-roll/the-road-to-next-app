export const initialTickets = [
  {
    id: "1",
    title: "Ticket 1",
    content: "This is the first ticket.",
    status: "DONE" as const,
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "This is the second ticket.",
    status: "OPEN" as const,
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "This is the third ticket.",
    status: "IN_PROGRESS" as const,
  },
];
