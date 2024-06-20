import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DeleteCourseComponent } from "./delete-course-component";
import type { SelectStudent } from "@/db/schema/student";
import { CourseFormUpdate } from "./course-form-update";

interface Props {
  courseId: number;
  courseName: string;
  students: SelectStudent[];
}

export function CourseRow({ courseName, courseId, students }: Props) {
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Curso</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {courseName}
        </div>
      </TableCell>
      <TableCell>23</TableCell>
      <TableCell>
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
                <DropdownMenuItem>Editar</DropdownMenuItem>
              </DialogTrigger>
              <DeleteCourseComponent students={students} courseId={courseId} />
            </DropdownMenuContent>
          </DropdownMenu>

          <CourseFormUpdate courseName={courseName} courseId={courseId} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
