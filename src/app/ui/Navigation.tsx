"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clxs from "clsx";

export function Navigation() {
  const pathname = usePathname();
  const links = [
    {
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      text: "Contacto",
      href: "/contact",
    },
  ];
  return (
    <header>
      <nav className="flex justify-between items-center px-6 py-4 border border-white">
        <Link href={"/"} className="text-xl font-bold">
          Parvulapps
        </Link>
        <ul className="flex gap-2 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clxs("text-white", {
                "font-bold underline": pathname === link.href,
              })}
            >
              {link.text}
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}
