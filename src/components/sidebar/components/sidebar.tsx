"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  return (
    <nav
      className={cn(
        "h-screen border-r pt-20",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <nav className="space-y-2">
              {navItems.map((navItem) => (
                <SidebarItem
                  key={navItem.title}
                  isOpen={isOpen}
                  navItem={navItem}
                />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Sidebar };
