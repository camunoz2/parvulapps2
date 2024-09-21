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
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Evaluar</h1>
      <CurriculumFilter data={data} />
    </div>
  );
}
