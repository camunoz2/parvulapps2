"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import {
  SelectCore,
  SelectIndicator,
  SelectObjective,
  SelectScope,
} from "@/db/schema/curriculum";

interface Props {
  scopes: SelectScope[];
  cores: SelectCore[];
  objectives: SelectObjective[];
  indicators: SelectIndicator[];
}

export function CurriculumFilter({ scopes, objectives, cores }: Props) {
  const [selectedScope, setSelectedScope] = useState<SelectScope | null>(null);
  const [selectedCore, setSelectedCore] = useState<SelectCore | null>(null);
  const [selectedObjective, setSelectedObjective] =
    useState<SelectObjective | null>(null);

  const TODOS = "Todos";

  const filteredCores = selectedScope
    ? cores.filter((core) => core.scopeId === selectedScope.id)
    : cores;

  // Filtrar objectives por core
  const filteredObjectives = selectedCore
    ? objectives.filter((objective) => objective.coreId === selectedCore.id)
    : objectives;

  return (
    <div>
      {/* Scope Filter */}
      <Label>Filtrar por Ambito</Label>
      <Select
        value={selectedScope ? selectedScope.id.toString() : TODOS}
        onValueChange={(value) =>
          setSelectedScope(
            scopes.find((scope) => scope.id.toString() === value) || null
          )
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Scope">
            {selectedScope?.name || "Select a Scope"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>All Scopes</SelectItem>
          {scopes.map((scope) => (
            <SelectItem key={scope.id} value={scope.id.toString()}>
              {scope.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Core Filter */}
      <Label>Filtrar por nucleo</Label>
      <Select
        value={selectedCore ? selectedCore.id.toString() : TODOS}
        onValueChange={(value) =>
          setSelectedCore(
            filteredCores.find((core) => core.id.toString() === value) || null
          )
        }
        disabled={!selectedScope}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Core">
            {selectedCore?.name || "Select a Core"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>All Cores</SelectItem>
          {filteredCores.map((core) => (
            <SelectItem key={core.id} value={core.id.toString()}>
              {core.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Objective Filter */}
      <Label>Filtrar por objectivo</Label>
      <Select
        value={selectedObjective ? selectedObjective.id.toString() : "all"}
        onValueChange={(value) =>
          setSelectedObjective(
            value !== "all"
              ? filteredObjectives.find((obj) => obj.id.toString() === value) ||
                  null
              : null
          )
        }
        disabled={!selectedCore}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select an Objective">
            {selectedObjective?.name || "Select an Objective"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Objectives</SelectItem>
          {filteredObjectives.map((objective) => (
            <SelectItem key={objective.id} value={objective.id.toString()}>
              {objective.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
