"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { deleteCourse } from "@/actions/deleteCourse";

interface Props {
  courseId: number;
  courseName: string;
}

export function CourseInfo({ courseName, courseId }: Props) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Curso Demo</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {courseName}
        </div>
      </TableCell>
      <TableCell>23</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteCourse({ courseId })}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
