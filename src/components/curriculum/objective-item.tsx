"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { type ObjectiveDetail } from "@/actions/dataLayer";
import { IndicatorItem } from "./indicator-item";

interface Props {
  objective: ObjectiveDetail;
}

export function ObjectiveItem({ objective }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(objective.isActive);

  function handleChange(value: boolean) {
    setIsEnabled(value);
  }

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
          checked={isEnabled}
          onCheckedChange={handleChange}
        />
      </div>
      {isExpanded && (
        <div className="border-t px-4 py-2">
          {objective.indicators.map((indicator) => (
            <IndicatorItem
              objectiveStatus={objective.isActive}
              key={indicator.id}
              indicator={indicator}
            />
          ))}
        </div>
      )}
    </div>
  );
}
