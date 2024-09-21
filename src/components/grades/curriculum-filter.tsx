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

  const filteredObjectives = selectedCore
    ? objectives.filter((objective) => objective.coreId === selectedCore.id)
    : objectives;

  const handleScopeChange = (value: string) => {
    const newScope =
      value !== TODOS
        ? scopes.find((scope) => scope.id.toString() === value) || null
        : null;
    setSelectedScope(newScope);

    // Limpiar cores y objectives
    setSelectedCore(null);
    setSelectedObjective(null);
  };

  const handleCoreChange = (value: string) => {
    const newCore =
      value !== TODOS
        ? filteredCores.find((core) => core.id.toString() === value) || null
        : null;
    setSelectedCore(newCore);

    // Limpiar objectives
    setSelectedObjective(null);
  };

  return (
    <div>
      {/* Scope Filter */}
      <Label>Filtrar por Ambito</Label>
      <Select
        value={selectedScope ? selectedScope.id.toString() : TODOS}
        onValueChange={handleScopeChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Elige un Ambito">
            {selectedScope?.name || "Elige un Ambito"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>Todos los Ambitos</SelectItem>
          {scopes.map((scope) => (
            <SelectItem key={scope.id} value={scope.id.toString()}>
              {scope.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Core Filter */}
      <Label>Filtrar por Nucleo</Label>
      <Select
        value={selectedCore ? selectedCore.id.toString() : TODOS}
        onValueChange={handleCoreChange}
        disabled={!selectedScope}
      >
        <SelectTrigger>
          <SelectValue placeholder="Elige un Nucleo">
            {selectedCore?.name || "Elige un Nucleo"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>Todos los Nucleos</SelectItem>
          {filteredCores.map((core) => (
            <SelectItem key={core.id} value={core.id.toString()}>
              {core.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Objective Filter */}
      <Label>Filtrar por Objetivo</Label>
      <Select
        value={selectedObjective ? selectedObjective.id.toString() : TODOS}
        onValueChange={(value) =>
          setSelectedObjective(
            value !== TODOS
              ? filteredObjectives.find((obj) => obj.id.toString() === value) ||
                  null
              : null
          )
        }
        disabled={!selectedCore}
      >
        <SelectTrigger>
          <SelectValue placeholder="Elige un Objetivo">
            {selectedObjective?.name || "Elige un Objetivo"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={TODOS}>Todos los Objetivos</SelectItem>
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
