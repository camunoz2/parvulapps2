import Link from "next/link";

export async function Navigation() {

  return (
    <header>
      <nav className="flex justify-between items-center px-6 py-4 border border-white">
        <Link href={"/"} className="text-xl font-bold">
          Parvulapps
        </Link>
        <ul className="flex gap-2 items-center">
          <li>
          </li>
        </ul>
      </nav>
    </header>
  );
}
