import { deleteStudent, getCourses } from "@/actions/dataLayer";
import { StudentFormUpdate } from "@/components/student/student-form-update";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import type { SelectStudent } from "@/db/schema/student";
import { getCourseNameById } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface Props {
  student: SelectStudent;
}

export async function StudentRow({ student }: Props) {
  const courses = await getCourses();
  const courseNameById = getCourseNameById(student.courseId, courses);
  return (
    <TableRow>
      <TableCell>{student.firstName}</TableCell>
      <TableCell>{student.lastName}</TableCell>
      <TableCell>{courseNameById}</TableCell>
      <TableCell>{student.age}</TableCell>
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
              <form action={deleteStudent}>
                <input
                  readOnly
                  className="hidden"
                  value={student.id}
                  name="id"
                />
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          <StudentFormUpdate student={student} allCourses={courses} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
