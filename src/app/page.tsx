import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs"

export default function Home() {

  return (
    <main className="grid grid-cols-2 h-full">
      <div className="bg-gray-800 flex flex-col justify-between py-10 pl-12">
        <header>
          <h1 className="text-3xl text-white font-bold">Parvulapps</h1>
        </header>
        <footer>
          <p className="text-white">Una webapp para medir el progreso de estudiantes en educacion parvularia</p>
        </footer>
      </div>
      <div className="bg-white flex flex-col gap-6 items-center justify-center">
        <h2 className="font-bold text-2xl text-slate-900">Bienvenidas!</h2>
        <Button variant="secondary"><a href="/sign-up">Crear cuenta</a> </Button>
        <Button><a href="/sign-in">Iniciar sesion</a></Button>
      </div>
    </main>
  )
}
