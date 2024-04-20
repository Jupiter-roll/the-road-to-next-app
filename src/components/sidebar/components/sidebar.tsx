"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

const Sidebar = () => {
  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = async () => {
    setTransition(true);
    setOpen(!isOpen);
    setTimeout(() => setTransition(false), 500);
  };

  return (
    <nav
      className={cn(
        "relative hidden h-screen border-r pt-20 md:block",
        isTransition && "duration-500",
        isOpen ? "w-72" : "w-[78px]"
      )}
    >
      <ArrowLeftIcon
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
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
