'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '../constants';
import { SidebarItem } from './sidebar-item';
import { SidebarItemAccordion } from './sidebar-item-accordion';

type SidebarProps = {
  initialIsOpen: string | null;
  onChangeOpen: (value: string) => void;
};

const Sidebar = ({ initialIsOpen, onChangeOpen }: SidebarProps) => {
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(initialIsOpen === 'true');
  const [openItem, setOpenItem] = useState('');

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

    onChangeOpen((!isOpen).toString());
  };

  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'relative hidden h-screen border-r pt-20 md:block',
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
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <nav className="space-y-2">
              {navItems.map((navItem) =>
                navItem.children ? (
                  <SidebarItemAccordion
                    key={navItem.title}
                    isOpen={isOpen}
                    navItem={navItem}
                    openItem={openItem}
                    onOpenItem={setOpenItem}
                  />
                ) : (
                  <SidebarItem
                    key={navItem.title}
                    isOpen={isOpen}
                    navItem={navItem}
                  />
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
