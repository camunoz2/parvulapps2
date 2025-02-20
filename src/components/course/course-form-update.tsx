"use client";

import { updateCourse } from "@/actions/dataLayer";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/hooks/use-toast";

interface Props {
  courseId: number;
  courseName: string;
}

export function CourseFormUpdate({ courseId, courseName }: Props) {
  async function clientAction(formData: FormData) {
    await updateCourse({
      courseId,
      courseName: formData.get("coursename") as string,
    });
    toast({
      title: "Nombre cambiado exitosamente!",
    });
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edita un curso</DialogTitle>
        <DialogDescription>Cambia el nombre del curso</DialogDescription>
      </DialogHeader>

      <form action={clientAction}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Curso
            </Label>
            <Input
              id="name"
              defaultValue={courseName}
              className="col-span-3"
              name="coursename"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Editar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
