import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";
import { PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import CreateStudentForm from "./create-student-form";

export default async function CreateStudent() {
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

      <CreateStudentForm />
    </Dialog>
  );
}
