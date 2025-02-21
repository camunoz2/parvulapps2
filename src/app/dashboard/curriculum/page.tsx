import { getObjectiveDetail } from "@/actions/dataLayer";
import { ObjectiveItem } from "@/components/curriculum/objective-item";
import ObjectivesView from "@/components/curriculum/objective-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Curriculum() {
  const objectives = await getObjectiveDetail();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Curriculum</CardTitle>
              <CardDescription>
                Elige los indicadores que evaluaras
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">Objetivos</h1>
              <div className="space-y-4">
                <ObjectivesView initialObjectives={objectives} />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
