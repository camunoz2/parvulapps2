import Link from "next/link";

export function Navigation() {
  return (
    <header>
      <nav className="flex justify-between items-center px-6 py-4 border border-white">
        <Link href={"/"} className="text-xl font-bold">
          Parvulapps
        </Link>
        <ul className="flex gap-2 items-center">
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/contacto"}>Contacto</Link>
        </ul>
      </nav>
    </header>
  );
}
