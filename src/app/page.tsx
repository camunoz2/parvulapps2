import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "./components/login-form"

export default async function Home() {
  return (
    <main className=" grid grid-cols-2 h-full">
      <div className="flex flex-col justify-between py-10 pl-12 bg-cover" style={{ backgroundImage: "linear-gradient(to bottom, rgba(6, 182, 212, 0.7), rgba(37, 99, 235, 0.7)), url('/login.jpg')" }}>
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
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <a href="#" className="flex items-center gap-2 self-center font-medium">
            Parvulapps
          </a>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
