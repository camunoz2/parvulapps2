import { getCourses } from "@/actions/dataLayer";
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
import { MoreHorizontal } from "lucide-react";
import { DeleteStudentComponent } from "./delete-student-component";
import { SelectCourse } from "@/db/schema/course";

export type StudentWithCourse = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  course: string;
}

interface Props {
  student: StudentWithCourse;
  courses: SelectCourse[];
}

export async function StudentRow({ student, courses }: Props) {

  return (
    <TableRow>
      <TableCell>{student.firstName}</TableCell>
      <TableCell>{student.lastName}</TableCell>
      <TableCell>{student.course}</TableCell>
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
              <DeleteStudentComponent studentId={student.id} />
            </DropdownMenuContent>
          </DropdownMenu>

          <StudentFormUpdate student={student} courses={courses} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
