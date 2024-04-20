import { LucideBook, LucideLibrary } from "lucide-react";
import { homePath, ticketsPath } from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: LucideLibrary,
    href: homePath(),
  },
  {
    title: "My Tickets",
    icon: LucideBook,
    href: ticketsPath(),
  },
];
