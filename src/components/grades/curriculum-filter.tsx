"use client";
import { useMemo, useState } from "react";

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
  const [selectedScope, setSelectedScope] = useState("all");
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedObjective, setSelectedObjective] = useState("all");

  return (
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
        <Select value={selectedObjective} onValueChange={setSelectedObjective}>
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
  );
}
