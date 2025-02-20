"use client";;
import { usePathname } from "next/navigation";
import Link from "next/link";

import type { JSX } from "react";

interface Props {
  href: string;
  icon: JSX.Element;
  children: React.ReactNode;
}
export function NavLink({ href, icon, children }: Props) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive(href)
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
