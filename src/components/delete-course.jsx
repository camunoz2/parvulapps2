"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deleteCourse } from "@/actions/deleteCourse";

export function DeleteCourseComponent({ courseId }) {
  return (
    <DropdownMenuItem onClick={deleteCourse(courseId)}>
      Eliminar
    </DropdownMenuItem>
  );
}
