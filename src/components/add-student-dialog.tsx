import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddStudentForm } from "./add-student-form";
import { getCourses } from "@/actions/dataLayer";

export async function AddStudentDialog() {
  const coursesResponse = await getCourses();
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
        <AddStudentForm courses={coursesResponse} />
      </DialogContent>
    </Dialog>
  );
}
