import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AddCourse() {
  return (
    <div className="mx-auto w-full px-4 lg:px-6">
      <div className="grid gap-6">
        <div className="space-y-6 lg:col-span-2 xl:col-span-3">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Cursos</h1>
            <Button size="sm">Agregar Curso</Button>
          </div>
          <div className="grid w-full gap-4">
            <div className="flex items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Link className="flex-1" href="#">
                <div className="font-semibold">PreKinder</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Instructor: Maria Camila Yevenes
                </div>
              </Link>
              <div>
                <div>Ver</div>
                <div>Evaluar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
