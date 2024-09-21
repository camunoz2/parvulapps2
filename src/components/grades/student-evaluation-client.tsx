"use client";

import { CurriculumFilter } from "./curriculum-filter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  students,
  scopes,
  cores,
  objectives,
  indicators,
  periods,
}: Props) {
  const filteredIndicators = [
    {
      id: 2,
      name: "sd",
      isActive: false,
      level: 2,
      order: 2,
      objectiveId: 2,
    },
  ];
  return (
    <>
      <CurriculumFilter
        cores={cores}
        indicators={indicators}
        objectives={objectives}
        scopes={scopes}
      />

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicator</TableHead>
              {students.map((student) => (
                <TableHead key={student.id}>
                  {student.firstName} {student.lastName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIndicators.map((indicator) => (
              <TableRow key={indicator.id}>
                <TableCell>{indicator.name}</TableCell>
                {students.map((student) => (
                  <TableCell key={student.id}>
                    {/* 3 Selectors for each period */}
                    {periods.map((period, index) => (
                      <Select
                        key={index}
                        onValueChange={(value) => /* Handle grade change */ {}}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Period ${period}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    ))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
