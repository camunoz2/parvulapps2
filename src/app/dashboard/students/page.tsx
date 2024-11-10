import { getCourses, getStudentsByCourse } from "@/actions/dataLayer";
import { AddStudentDialog } from "@/components/student/add-student-dialog";
import { StudentRow } from "@/components/student/student-row";
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

export default async function AlumnosPage() {

  const students = await getStudentsByCourse();
  const courses = await getCourses();

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
            <AddStudentDialog />
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
                {students.map((student) => (
                  <StudentRow key={student.id} student={student} courses={courses} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
