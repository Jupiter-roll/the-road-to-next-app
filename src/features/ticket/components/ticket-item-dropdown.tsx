import * as React from 'react';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ticket, TicketStatus } from '../type';
import { TICKET_STATUS_TO_LABEL } from '../constants';
import { ChevronDownIcon } from 'lucide-react';

type TicketItemPropsDropdown = {
  ticket: Ticket;
  onChangeTicketStatus: (ticketStatus: TicketStatus) => void;
};

const TicketItemDropdown = ({
  ticket,
  onChangeTicketStatus,
}: TicketItemPropsDropdown) => {
  const handleChangeTicketStatus = (value: string) => {
    onChangeTicketStatus(value as TicketStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        <DropdownMenuRadioGroup
          value={ticket.status}
          onValueChange={handleChangeTicketStatus}
        >
          {(
            Object.keys(TICKET_STATUS_TO_LABEL) as Array<TicketStatus>
          ).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {TICKET_STATUS_TO_LABEL[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketItemDropdown };
