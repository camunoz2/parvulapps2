import { getObjectiveDetail } from "@/actions/dataLayer";
import { ObjectiveItem } from "@/components/curriculum/objective-item";
import SelectCore from "@/components/curriculum/select-core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Curriculum(props: {
  searchParams: SearchParams;
}) {
  const objectives = await getObjectiveDetail();
  const cores = Array.from(new Set(objectives.map((obj) => obj.coreName)));
  const searchParams = await props.searchParams;

  const filteredObjectives = objectives.filter((o) => {
    const encodedCorename = encodeURIComponent(o.coreName.trim().toLowerCase());
    return encodedCorename === searchParams.core;
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Curriculum</CardTitle>
              <CardDescription>Selecciona el nucleo</CardDescription>
              <SelectCore cores={cores} />
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
