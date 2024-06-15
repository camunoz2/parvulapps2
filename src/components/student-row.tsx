"use client";

import type { InsertStudent } from "@/db/schema/student";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { TableCell, TableRow } from "./ui/table";
import { EvaluationDialog } from "./evaluation-dialog";

interface Props {
  student: InsertStudent;
}
export function StudentRow({ student }: Props) {
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
          <DialogTrigger>
            <Button size="sm">
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Evaluar
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <EvaluationDialog />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" variant={"secondary"}>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Eliminar
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>eliminar</DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
