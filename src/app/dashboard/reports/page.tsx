import { getCourses, getPeriods } from "@/actions/dataLayer";
import { GradesByOaBar } from "@/components/reports/grades-by-oa-bar";
import { IndicatorScoresPie } from "@/components/reports/indicator-scores-pie";
import {StudentsScoresTable} from "@/components/reports/students-scores-table"

export default async function Page() {
  const courses = await getCourses();
  const periods = await getPeriods();

  return (
    <main className="flex min-h-screen w-full flex-col p-4 gap-4">
      <div className="grid grid-cols-3 gap-4">
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
      </div>
      <div>
        <StudentsScoresTable />
      </div>
    </main>
  );
}
