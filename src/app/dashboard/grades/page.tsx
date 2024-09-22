import {
  getPeriods,
  getScopes,
  getCores,
  getObjectives,
  getIndicators,
  getCourses,
  getStudents,
} from "@/actions/dataLayer";
import { CurriculumFilter } from "@/components/grades/curriculum-filter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function Page() {
  const periods = await getPeriods();
  const scopes = await getScopes();
  const cores = await getCores();
  const objectives = await getObjectives();
  const indicators = await getIndicators();
  const courses = await getCourses();
  const students = await getStudents();

  const data = {
    periods,
    scopes,
    cores,
    objectives,
    indicators,
    courses,
    students,
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Evaluar</CardTitle>
              <CardDescription>
                Completa los campos para evaluar a los alumnos
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <CurriculumFilter data={data} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
