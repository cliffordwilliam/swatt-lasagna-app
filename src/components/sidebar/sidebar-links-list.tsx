"use client";

import {
  Clipboard,
  Home,
  List,
  User,
  FilePen,
  ShoppingBag,
  Gift,
} from "lucide-react";
import SidebarLinkItem from "./sidebar-link-item";

const allLinks = [
  { name: "Halaman Utama", href: "/", Icon: Home },
  { name: "Items", href: "/items", Icon: List },
  { name: "Orders", href: "/orders", Icon: Clipboard },
  { name: "Pembeli", href: "/pembelis", Icon: ShoppingBag },
  { name: "Penerima", href: "/penerimas", Icon: Gift },
];
const adminLinks = [
  { name: "Halaman Utama", href: "/", Icon: Home },
  { name: "Items", href: "/items", Icon: List },
  { name: "Orders", href: "/orders", Icon: Clipboard },
  { name: "Pembeli", href: "/pembelis", Icon: ShoppingBag },
  { name: "Penerima", href: "/penerimas", Icon: Gift },
  { name: "User", href: "/admin/users", Icon: User },
];

const SidebarLinksList = ({ resIsAdmin }: { resIsAdmin: boolean }) => {
  const links = resIsAdmin ? adminLinks : allLinks;
  return (
    <>
      <div className="flex flex-col">
        {links.map((link) => (
          <SidebarLinkItem
            key={link.name}
            name={link.name}
            href={link.href}
            Icon={link.Icon}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarLinksList;
