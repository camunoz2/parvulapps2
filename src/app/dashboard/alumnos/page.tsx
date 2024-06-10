import { StudentFormAdd } from "@/components/student-form-add";
import { StudentFormUpdate } from "@/components/student-form-update";
import { StudentInfo } from "@/components/student-info";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { courses } from "@/db/schema/courses";
import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { PlusCircle } from "lucide-react";
import { cookies } from "next/headers";

export default async function AlumnosPage() {
  cookies();
  const results = await db
    .select()
    .from(students)
    .innerJoin(courses, eq(students.courseId, courses.id));

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Alumnos</CardTitle>
              <CardDescription>
                Agrega alumnos a tu institucion educativa
              </CardDescription>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="ml-auto gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Agregar Alumno
                  </span>
                </Button>
              </DialogTrigger>
              <StudentFormAdd />
            </Dialog>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellidos</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Edad(años)</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((res) => (
                  <StudentInfo
                    studentId={res.students.id}
                    key={res.students.id}
                    firstName={res.students.firstName}
                    lastName={res.students.lastName}
                    age={res.students.age}
                    course={res.courses.course}
                  >
                    <StudentFormUpdate content={res} />
                  </StudentInfo>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
