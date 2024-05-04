"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLinkItem = ({
  name,
  href,
  Icon,
}: {
  name: string;
  href: string;
  Icon: LucideIcon;
}) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  return (
    <>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-x-2 p-2",
          isActive && "bg-sky-100"
        )}
      >
        <span>{name}</span>
        <Icon className="w-4 h-4" />
      </Link>
    </>
  );
};

export default SidebarLinkItem;
