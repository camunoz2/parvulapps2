import { getCourses, getPeriods, getAllGrades } from "@/actions/dataLayer";
import { IndicatorScoresPie } from "@/components/reports/indicator-scores-pie";
import { StudentScoresTable } from "@/components/reports/students-scores-table"

export default async function Page() {
  const courses = await getCourses();
  const periods = await getPeriods();
  const allGrades = await getAllGrades();

  console.log(allGrades[0])

  return (
    <main className="flex min-h-screen w-full flex-col p-4 gap-4">
      <div className="grid grid-cols-3 gap-4">
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
      </div>
      <div>
        <StudentScoresTable studentGrades={allGrades} />
      </div>
    </main>
  );
}
