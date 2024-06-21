"use client";
import { deleteCourse } from "@/actions/dataLayer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { SelectStudent } from "@/db/schema/student";
import { toast } from "../ui/use-toast";

interface Props {
  courseId: number;
  students: SelectStudent[];
}
export function DeleteCourseComponent({ courseId, students }: Props) {
  async function handleDelete() {
    if (students) {
      toast({
        title: "Error",
        description:
          "No puedes eliminar un curso si todavia tiene estudiantes. Primero elimina a los estudiantes del curso",
      });
    } else {
      const response = await deleteCourse(courseId);
      if (response.message === "ok") {
        toast({
          title: "Estudiante eliminado",
        });
      }
    }
  }
  return <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>;
}
