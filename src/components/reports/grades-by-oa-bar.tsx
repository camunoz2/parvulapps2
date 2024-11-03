"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import { getGradesByCategory, GraphData } from "@/actions/dataLayer";

export const description = "An interactive bar chart";

export function GradesByOaBar({ courseId }: { courseId: number }) {
  const [chartData, setChartData] = useState<GraphData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    "scope" | "core" | "objective"
  >("scope");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [activeChart, setActiveChart] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGradesByCategory(
        courseId,
        selectedCategory,
        Number(selectedCategoryId)
      );
      setChartData(data);
      if (data.length > 0 && Object.keys(data[0]).length > 1) {
        setActiveChart(Object.keys(data[0])[1]); // Set first category as active
      }
    };
    fetchData();
  }, [courseId, selectedCategory, selectedCategoryId]);

  const chartConfig = useMemo(() => {
    const config: Record<string, { label: string }> = {};
    if (chartData.length > 0) {
      Object.keys(chartData[0]).forEach((key) => {
        if (key !== "date") {
          config[key] = { label: key };
        }
      });
    }
    return config;
  }, [chartData]);

  const total = useMemo(() => {
    const totals: Record<string, number> = {};
    Object.keys(chartConfig).forEach((key) => {
      totals[key] = chartData.reduce(
        (acc, curr) => acc + ((curr[key] as number) || 0),
        0
      );
    });
    return totals;
  }, [chartData, chartConfig]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Performance Chart</CardTitle>
          <CardDescription>
            Showing total scores for {selectedCategory}
          </CardDescription>
        </div>
        <div className="flex">
          {Object.keys(chartConfig).map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="scores"
                  labelFormatter={(value) => value as string}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
