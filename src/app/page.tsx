import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className=" grid grid-cols-2 h-full">
      <div className="bg-gray-800 flex flex-col justify-between py-10 pl-12">
        <header>
          <h1 className="text-3xl text-white font-bold">Parvulapps</h1>
        </header>
        <footer>
          <p className="text-white">
            Una webapp para medir el progreso de estudiantes en educacion
            parvularia
          </p>
        </footer>
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        <h2 className="text-2xl font-bold">Hola! Inicia sesión con google</h2>
        <Button>
          <a href="/api/auth/login?returnTo=/dashboard">Iniciar Sesion</a>
        </Button>
      </div>
    </main>
  );
}
