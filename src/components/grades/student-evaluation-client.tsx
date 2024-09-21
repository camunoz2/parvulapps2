"use client";
import { CurriculumFilter } from "./curriculum-filter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  SelectCore,
  SelectIndicator,
  SelectObjective,
  SelectScope,
} from "@/db/schema/curriculum";
import { SelectPeriod } from "@/db/schema/grade";
import type { SelectStudent } from "@/db/schema/student";
import { useMemo, useState } from "react";

interface Props {
  students: SelectStudent[];
  scopes: SelectScope[];
  cores: SelectCore[];
  objectives: SelectObjective[];
  indicators: SelectIndicator[];
  periods: SelectPeriod[];
}

export default function StudentEvaluationClient({
  scopes,
  cores,
  objectives,
  indicators,
}: Props) {
  const [selectedObjective, setSelectedObjective] =
    useState<SelectObjective | null>(null);

  const filteredIndicators = useMemo(() => {
    if (!selectedObjective) return [];
    return indicators.filter(
      (indicator) => indicator.objectiveId === selectedObjective.id
    );
  }, [selectedObjective, indicators]);

  const handleObjectiveSelect = (objective: SelectObjective | null) => {
    setSelectedObjective(objective);
  };

  return (
    <>
      <CurriculumFilter
        cores={cores}
        indicators={indicators}
        objectives={objectives}
        scopes={scopes}
        onObjectiveSelect={handleObjectiveSelect}
      />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicadores</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIndicators.map((indicator) => (
              <TableRow key={indicator.id}>
                <TableCell>{indicator.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
