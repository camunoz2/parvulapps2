import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CoursePicker from "./course-picker";
import { getAllCourses } from "@/actions/getAllCourses";

export default async function CreateStudent() {
  const results = await getAllCourses();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar Alumno
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega un alumno</DialogTitle>
          <DialogDescription>
            Reacuerda agregar todos los datos
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Nombre
            </Label>
            <Input
              name="firstName"
              id="firstName"
              defaultValue="Pedro"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Apellidos
            </Label>
            <Input
              id="lastname"
              name="lastname"
              defaultValue="Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Curso
            </Label>
            <CoursePicker courses={results} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Edad
            </Label>
            <Input
              id="age"
              name="age"
              defaultValue="7"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
