import Link from "next/link";
import { UserButton, currentUser } from "@clerk/nextjs";

export async function Navigation() {
  const user = await currentUser();

  return (
    <header>
      <nav className="flex justify-between items-center px-6 py-4 border border-white">
        <Link href={"/"} className="text-xl font-bold">
          Parvulapps
        </Link>
        <ul className="flex gap-2 items-center">
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
          {user ? (
            <li>Hola, {user.firstName}!</li>
          ) : (
            <>
              <li>
                <a href="/sign-up">Registrarse</a>
              </li>
              <li>
                <a href="/sign-in">Iniciar Sesión</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
