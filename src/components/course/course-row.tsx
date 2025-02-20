import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "../ui/dialog";
import type { SelectStudent } from "@/db/schema/student";
import { CourseFormUpdate } from "./course-form-update";
import { deleteCourse, getStudentCountByCourseId } from "@/actions/dataLayer";

interface Props {
  courseId: number;
  courseName: string;
  courseYear: number;
  students: SelectStudent[];
}

export async function CourseRow({ courseName, courseId, courseYear }: Props) {
  const studentCount = await getStudentCountByCourseId(courseId);
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">Curso</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {courseName}
        </div>
      </TableCell>
      <TableCell>{courseYear}</TableCell>
      <TableCell>{studentCount}</TableCell>
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
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <form action={deleteCourse}>
                <input type="hidden" name="id" value={courseId} />
                <DropdownMenuItem asChild>
                  <button type="submit">Eliminar</button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          <CourseFormUpdate courseName={courseName} courseId={courseId} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
