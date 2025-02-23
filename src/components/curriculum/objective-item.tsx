"use client";
import { useState, useTransition } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { IndicatorItem } from "./indicator-item";
import {
  type ObjectiveDetail,
  toggleObjectiveAction,
} from "@/actions/dataLayer";

interface Props {
  objective: ObjectiveDetail;
}

export function ObjectiveItem({ objective }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleObjective = async () => {
    startTransition(async () => {
      try {
        await toggleObjectiveAction(objective.id, !objective.isActive);
      } catch (error) {
        console.error("Error toggling objective", error);
      }
    });
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <h2 className="text-lg font-semibold">{objective.name}</h2>
        </div>
        <Switch
          type="submit"
          checked={objective.isActive}
          onCheckedChange={toggleObjective}
          disabled={isPending}
        />
      </div>
      {isExpanded && (
        <div className="border-t px-4 py-2">
          {objective.indicators.map((indicator) => (
            <IndicatorItem
              key={indicator.id}
              objectiveActive={objective.isActive}
              indicator={indicator}
            />
          ))}
        </div>
      )}
    </div>
  );
}
