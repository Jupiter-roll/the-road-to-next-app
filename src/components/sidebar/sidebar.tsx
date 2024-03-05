'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronDownIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { navItems } from './constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { setCookieByKey } from '@/actions/cookies';

type SidebarProps = {
  initialIsOpen: boolean;
};

const Sidebar = ({ initialIsOpen }: SidebarProps) => {
  const path = usePathname();

  const [openItem, setOpenItem] = useState('');
  const [isTransition, setTransition] = useState(false);

  const [isOpen, setOpen] = useState(() => initialIsOpen);

  const isOpenRef = useRef(isOpen);
  const lastOpen = useRef(openItem);

  useEffect(() => {
    if (isOpen === isOpenRef.current) return;
    isOpenRef.current = isOpen;

    if (isOpen) {
      setOpenItem(lastOpen.current);
    } else {
      lastOpen.current = openItem;
      setOpenItem('');
    }
  }, [isOpen, openItem]);

  const handleToggle = async () => {
    setTransition(true);
    setOpen(!isOpen);
    setTimeout(() => setTransition(false), 500);

    await setCookieByKey('sidebar', (!isOpen).toString());
  };

  const closedClassName =
    'text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        isTransition && 'duration-500',
        isOpen ? 'w-72' : 'w-[78px]'
      )}
    >
      <ArrowLeftIcon
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          !isOpen && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <nav className="space-y-2">
              {navItems.map((navItem) =>
                navItem.children?.length ? (
                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-2"
                    key={navItem.title}
                    value={openItem}
                    onValueChange={setOpenItem}
                  >
                    <AccordionItem
                      value={navItem.title}
                      className="border-none "
                    >
                      <AccordionTrigger
                        className={cn(
                          buttonVariants({ variant: 'ghost' }),
                          'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline'
                        )}
                      >
                        <div>
                          <navItem.icon
                            className={cn('h-5 w-5', navItem.color)}
                          />
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
                          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                        )}
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 space-y-4 pb-1">
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
                            <child.icon
                              className={cn('h-5 w-5', child.color)}
                            />
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
                ) : (
                  <Link
                    key={navItem.title}
                    href={navItem.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'group relative flex h-12 justify-start',
                      path === navItem.href &&
                        'bg-muted font-bold hover:bg-muted'
                    )}
                  >
                    <navItem.icon
                      className={cn('h-5 w-5', navItem.color)}
                    />
                    <span
                      className={cn(
                        'absolute left-12 text-base duration-200',
                        !isOpen && closedClassName
                      )}
                    >
                      {navItem.title}
                    </span>
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Sidebar };
