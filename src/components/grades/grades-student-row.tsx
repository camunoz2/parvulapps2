"use client";
import type { InsertStudent } from "@/db/schema/student";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { EvaluationDialog } from "./evaluation-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Props {
  student: InsertStudent;
}
export function GradesStudentRow({ student }: Props) {
  return (
    <TableRow>
      <TableCell className="font-medium">{student.firstName}</TableCell>
      <TableCell>
        <Badge variant="outline">Evaluado</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{student.courseId}</TableCell>
      <TableCell className="hidden md:table-cell">13/45</TableCell>
      <TableCell className="hidden md:table-cell">
        2024-02-14 02:14 PM
      </TableCell>
      <TableCell className="flex gap-2">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DialogTrigger asChild>
                <DropdownMenuItem>Evaluar</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Editar Evaluacion</DropdownMenuItem>
              <DropdownMenuItem>Eliminar Evaluación</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
