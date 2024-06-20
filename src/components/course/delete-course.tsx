"use client";
import { deleteCourse } from "@/actions/dataLayer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function DeleteCourseComponent(courseId: number) {
  return (
    <DropdownMenuItem onClick={() => deleteCourse(courseId)}>
      Eliminar
    </DropdownMenuItem>
  );
}
