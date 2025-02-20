import { getIndicatorsCount, getStudentsCount } from "@/actions/dataLayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";

export default async function DashboardContent() {
  const numberOfIndicators = await getIndicatorsCount();
  const numberOfStudents = await getStudentsCount();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Cantidad de indicadores
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{numberOfIndicators}</div>
                <p className="text-xs text-muted-foreground">
                  Que pertenecen a las 4 dimensiones
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alumos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{numberOfStudents}</div>
                <p className="text-xs text-muted-foreground">En total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Porcentaje de Est. Evaluados</CardDescription>
                <CardTitle className="text-4xl">45%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Te falta evaluar 24 alumnos
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={45} aria-label="Incremento del 45%" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Porcentaje de Indicadores Ev.</CardDescription>
                <CardTitle className="text-3xl">24%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Te faltan 23 indicadores por evaluar
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={24} aria-label="Incremento del 24%" />
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader className="px-7">
              <CardTitle>Evaluaciones Recientes</CardTitle>
              <CardDescription>Los ultimos alumnos evaluados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead className="text-start">Fecha</TableHead>
                    <TableHead className="text-start">Diagnostico</TableHead>
                    <TableHead className="text-start">Intermedio</TableHead>
                    <TableHead className="text-start">Cierre</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-accent">
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      <Progress value={23} aria-label="Aumento del 23%" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Progress value={45} aria-label="Aumento del 23%" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Progress value={67} aria-label="Aumento del 23%" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
