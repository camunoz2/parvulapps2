import { getCourses, getStudents } from "@/actions/dataLayer";
import { AddCourseDialog } from "@/components/course/add-course-dialog";
import { CourseRow } from "@/components/course/course-row";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Courses() {
  const coursesResult = await getCourses();
  const studentsResult = await getStudents();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Cursos</CardTitle>
              <CardDescription>
                Cursos agregados a su institucion educativa
              </CardDescription>
            </div>
            <AddCourseDialog />
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Cant. Estudiantes</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coursesResult.map((course) => (
                  <CourseRow
                    students={studentsResult}
                    courseName={course.name}
                    key={course.id}
                    courseId={course.id}
                    courseYear={course.year}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
