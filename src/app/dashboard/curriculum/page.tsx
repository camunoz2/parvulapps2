import { getObjectiveDetail } from "@/actions/dataLayer";
import { CoreFilter } from "@/components/curriculum/core-filter";
import { ObjectiveItem } from "@/components/curriculum/objective-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Curriculum({
  searchParams,
}: { searchParams: { core?: string } }) {
  const objectives = await getObjectiveDetail();

  const cores = Array.from(new Set(objectives.map((obj) => obj.coreName)));

  const filteredObjectives = searchParams.core
    ? objectives.filter((obj) => obj.coreName === searchParams.core)
    : objectives;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Curriculum</CardTitle>
              <CardDescription>Selecciona el nucleo</CardDescription>
              <CoreFilter cores={cores} />
            </div>
          </CardHeader>

          <CardContent>
            <div className="container mx-auto">
              <div className="space-y-4">
                <div className="container mx-auto">
                  <div className="space-y-4">
                    {filteredObjectives.map((objective) => (
                      <ObjectiveItem key={objective.id} objective={objective} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
