import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { AddCourseForm } from "./add-course-form";

export function AddCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar Curso
          </span>
        </Button>
      </DialogTrigger>
      <AddCourseForm />
    </Dialog>
  );
}
