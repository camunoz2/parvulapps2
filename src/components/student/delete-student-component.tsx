"use client";

import { deleteStudent } from "@/actions/dataLayer";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";

interface Props {
  studentId: number;
}

export function DeleteStudentComponent({ studentId }: Props) {
  async function handleDelete() {
    const response = await deleteStudent(studentId);
    if (response.message === "ok")
      toast({
        title: "Estudiante eliminado!",
      });
  }
  return <DropdownMenuItem onClick={handleDelete}>Eliminar</DropdownMenuItem>;
}
