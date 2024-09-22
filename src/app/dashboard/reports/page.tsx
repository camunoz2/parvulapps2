import { getCourses, getPeriods } from "@/actions/dataLayer";
import { IndicatorScoresPie } from "@/components/reports/indicator-scores-pie";

export default async function Page() {
  const courses = await getCourses();
  const periods = await getPeriods();

  return (
    <div className="flex min-h-screen w-full flex-col p-4">
      <main className="grid grid-cols-3 gap-2">
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
        <IndicatorScoresPie periods={periods} courses={courses} />
      </main>
    </div>
  );
}
