import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog } from "../ui/dialog";
import type { SelectStudent } from "@/db/schema/student";
import { CourseFormUpdate } from "./course-form-update";
import { getStudentCountByCourseId } from "@/actions/dataLayer";
import { CourseDeleteButton } from "./course-delete-button";

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
          <CourseDeleteButton courseId={courseId} />
          <CourseFormUpdate courseName={courseName} courseId={courseId} />
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
