"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingUp } from "lucide-react";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Label } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { SelectCourse } from "@/db/schema/course";
import { SelectPeriod } from "@/db/schema/grade";
import { getCourseNameById, getPeriodNameById } from "@/lib/customUtils";
import { getGrades, GradesEvaluation } from "@/actions/dataLayer";

const chartConfig = {
  total: {
    label: "Puntaje Total",
  },
  inicial: {
    label: "Inicial",
    color: "hsl(var(--chart-1))",
  },
  intermedio: {
    label: "Intermedio",
    color: "hsl(var(--chart-2))",
  },
  adecuado: {
    label: "Adecuado",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const description = "A donut chart with text";

interface Props {
  courses: SelectCourse[];
  periods: SelectPeriod[];
}

export function IndicatorScoresPie({ courses, periods }: Props) {
  const [selectedCourse, setSelectedCourse] = useState<SelectCourse | string>(
    ""
  );
  const [selectedPeriod, setSelectedPeriod] = useState<SelectCourse | string>(
    ""
  );

  const [grades, setGrades] = useState<GradesEvaluation | null>(null);

  useEffect(() => {
    if (selectedCourse && selectedPeriod) {
      const getData = async () => {
        const currGrades = await getGrades(
          Number(selectedPeriod),
          Number(selectedCourse)
        );
        setGrades(currGrades);
      };
      getData();
    }
  }, [selectedCourse, selectedPeriod]);

  const chartData = useMemo(() => {
    if (!grades) return [];

    const levelCounts: Record<string, number> = {
      Inicial: 0,
      Intermedio: 0,
      Adecuado: 0,
    };

    Object.values(grades).forEach((indicatorGrades) => {
      Object.values(indicatorGrades).forEach((grade) => {
        if (grade === 1) levelCounts.Inicial++;
        else if (grade === 2) levelCounts.Intermedio++;
        else if (grade === 3) levelCounts.Adecuado++;
      });
    });

    return [
      {
        level: "Inicial",
        grades: levelCounts.Inicial,
        fill: "var(--color-inicial)",
      },
      {
        level: "Intermedio",
        grades: levelCounts.Intermedio,
        fill: "var(--color-intermedio)",
      },
      {
        level: "Adecuado",
        grades: levelCounts.Adecuado,
        fill: "var(--color-adecuado)",
      },
    ];
  }, [grades]);

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.grades, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex gap-2 justify-center items-center border-b">
        <Select
          value={selectedCourse.toString()}
          onValueChange={(value) => setSelectedCourse(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Elige el curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Curso</SelectLabel>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id.toString()}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedPeriod.toString()}
          onValueChange={(value) => setSelectedPeriod(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Elige el Periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Periodo</SelectLabel>
              {periods.map((period) => (
                <SelectItem key={period.id} value={period.id.toString()}>
                  {period.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {selectedCourse && selectedPeriod ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="grades"
                nameKey="level"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Evaluaciones
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <h2 className="flex text-center h-32 items-center justify-center">
            Elige el curso y periodo
          </h2>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {selectedCourse && selectedPeriod && (
          <div className="leading-none text-muted-foreground text-center">
            Esto muestra la cantidad de evaluaciones realizadas para el curso{" "}
            {getCourseNameById(Number(selectedCourse), courses)} durante el
            periodo {getPeriodNameById(Number(selectedPeriod), periods)}. Cada
            evaluacion es un indicador evaluado por alumno, por lo tanto, entre
            mas alumnos hay en un curso, se deberian obtener mas evaluaciones
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
