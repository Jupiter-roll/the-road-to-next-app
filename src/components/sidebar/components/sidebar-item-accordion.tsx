import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { closedClassName } from '../constants';
import { NavItem } from '../types';

type SidebarItemAccordionProps = {
  isOpen: boolean;
  navItem: NavItem;
  openItem: string;
  onOpenItem: (value: string) => void;
};

const SidebarItemAccordion = ({
  isOpen,
  navItem,
  openItem,
  onOpenItem,
}: SidebarItemAccordionProps) => {
  const path = usePathname();

  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-2"
      value={openItem}
      onValueChange={onOpenItem}
    >
      <AccordionItem value={navItem.title} className="border-none ">
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
          )}
        >
          <div>
            <navItem.icon className={cn('h-5 w-5', navItem.color)} />
          </div>
          <div
            className={cn(
              'absolute left-12 text-base duration-200 ',
              !isOpen && closedClassName
            )}
          >
            {navItem.title}
          </div>

          {isOpen && (
            <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 shrink-0 text-muted-foreground" />
          )}
        </AccordionTrigger>
        <AccordionContent className="pb-1 mt-2 space-y-4">
          {navItem.children?.map((child) => (
            <Link
              key={child.title}
              href={child.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'group relative flex h-12 justify-start gap-x-3',
                path === child.href &&
                  'bg-muted font-bold hover:bg-muted'
              )}
            >
              <child.icon className={cn('h-5 w-5', child.color)} />
              <div
                className={cn(
                  'absolute left-12 text-base duration-200',
                  !isOpen && closedClassName
                )}
              >
                {child.title}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export { SidebarItemAccordion };
