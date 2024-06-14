"use client";
import { deleteCourse, editCourse } from "@/actions/dataLayer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface Props {
  courseId: number;
  courseName: string;
}

export function CourseInfo({ courseName, courseId }: Props) {
  const [editing, setEditing] = useState(false);
  const [newCourseName, setNewCourseName] = useState(courseName);

  const handleEdit = () => {
    editCourse({
      courseId: courseId,
      courseName: newCourseName,
    });
    setEditing(false);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Curso Demo</div>
        {editing ? (
          <>
            <Input
              name="coursename"
              defaultValue={courseName}
              onChange={(event) => setNewCourseName(event.currentTarget.value)}
            />
            <Button onClick={handleEdit}>Aceptar</Button>
          </>
        ) : (
          <div className="hidden text-sm text-muted-foreground md:inline">
            {courseName}
          </div>
        )}
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
            <DropdownMenuItem onClick={() => setEditing(true)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteCourse(courseId)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
