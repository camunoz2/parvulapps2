import { getStudents } from "@/actions/dataLayer";
import { GradesStudentRow } from "@/components/grades/grades-student-row";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cookies } from "next/headers";

export default async function EvalPage() {
  cookies();
  const students = await getStudents();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Tabs defaultValue="diagnostica">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="diagnostica">Diagnostica</TabsTrigger>
              <TabsTrigger value="intermedia">Intermedia</TabsTrigger>
              <TabsTrigger value="cierre">Cierre</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="diagnostica">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Evaluaciones</CardTitle>
                  <CardDescription>
                    Ingresa las evaluaciones por alumno. Ya sea diagnostica,
                    intermedia o de cierre
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Progreso
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Fecha
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Opciones
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <GradesStudentRow key={student.id} student={student} />
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
