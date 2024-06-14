import { StudentFormUpdate } from "./student-form-update";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TableCell, TableRow } from "./ui/table";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { deleteStudent, getCourses } from "@/actions/dataLayer";
import { SelectStudent } from "@/db/schema/students";
import { getCourseNameById } from "@/lib/utils";

interface Props {
  student: SelectStudent;
}

export async function StudentInfo({ student }: Props) {
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
