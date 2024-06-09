import { CourseInfo } from "@/components/course-info";
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
import { CreateCourse } from "@/components/create-course";
import { db } from "@/lib/drizzle";
import { courses } from "@/db/schema/courses";
import { cookies } from "next/headers";

export default async function Courses() {
  cookies();
  const result = await db.select().from(courses);

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
            <CreateCourse />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Cant. Estudiantes</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.map((c) => (
                  <CourseInfo
                    courseName={c.course}
                    courseId={c.id}
                    key={c.id}
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
