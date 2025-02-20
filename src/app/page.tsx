import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <Link href="/auth/login">
        <Button>Iniciar Sesión</Button>
      </Link>
    </main>
  );
}
