"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { SelectStudent } from "@/db/schema/student";
import type {
  SelectScope,
  SelectCore,
  SelectObjective,
  SelectIndicator,
} from "@/db/schema/curriculum";

interface Props {
  students: SelectStudent[];
  scopes: SelectScope[];
  cores: SelectCore[];
  objectives: SelectObjective[];
  indicators: SelectIndicator[];
  periods: string[]; // Assume you have periods as an array of string for simplicity
}

export default function StudentEvaluationClient({
  students,
  scopes,
  cores,
  objectives,
  indicators,
  periods,
}: Props) {
  const [selectedScope, setSelectedScope] = useState("all");
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedObjective, setSelectedObjective] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredIndicators = useMemo(() => {
    return indicators.filter((indicator) => {
      // Encuentra el objetivo correspondiente al indicador
      const objective = objectives.find(
        (obj) => obj.id === indicator.objectiveId
      );

      // Encuentra el core correspondiente al objetivo
      const core = cores.find((core) => core.id === objective?.coreId);

      // Convertir los valores seleccionados a número antes de compararlos
      const selectedScopeNumber =
        selectedScope !== "all" ? Number(selectedScope) : "all";
      const selectedCoreNumber =
        selectedCore !== "all" ? Number(selectedCore) : "all";
      const selectedObjectiveNumber =
        selectedObjective !== "all" ? Number(selectedObjective) : "all";

      // Filtrar los indicadores según el scope, core y objective seleccionados
      return (
        (selectedScope === "all" || core?.scopeId === selectedScopeNumber) &&
        (selectedCore === "all" || core?.id === selectedCoreNumber) &&
        (selectedObjective === "all" ||
          objective?.id === selectedObjectiveNumber)
      );
    });
  }, [
    selectedScope,
    selectedCore,
    selectedObjective,
    indicators,
    cores,
    objectives,
  ]);

  // Render the table
  return (
    <>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div>
          <Label>Filter by Scope</Label>
          <Select value={selectedScope} onValueChange={setSelectedScope}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scopes</SelectItem>
              {scopes.map((scope) => (
                <SelectItem key={scope.id} value={scope.id.toString()}>
                  {scope.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Filter by Core</Label>
          <Select value={selectedCore} onValueChange={setSelectedCore}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Core" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cores</SelectItem>
              {cores.map((core) => (
                <SelectItem key={core.id} value={core.id.toString()}>
                  {core.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Filter by Objective</Label>
          <Select
            value={selectedObjective}
            onValueChange={setSelectedObjective}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an Objective" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Objectives</SelectItem>
              {objectives.map((obj) => (
                <SelectItem key={obj.id} value={obj.id.toString()}>
                  {obj.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
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
