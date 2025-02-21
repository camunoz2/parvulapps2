"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useActionState, useState } from "react";
import { toggleObjective, type ObjectiveDetail } from "@/actions/dataLayer";

interface Props {
  objective: ObjectiveDetail;
}

export function ObjectiveItem({ objective }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(objective.isActive);
  const [_error, toggleObjectiveAction, pending] = useActionState(
    toggleObjective,
    null,
  );

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
        <form action={toggleObjectiveAction}>
          <input type="hidden" name="objectiveId" value={objective.id} />
          <input
            type="hidden"
            name="isActive"
            value={isEnabled ? "true" : "false"}
          />
          <Switch
            type="submit"
            checked={isEnabled}
            disabled={pending}
            onCheckedChange={handleChange}
          />
        </form>
      </div>
      {isExpanded && (
        <div className="border-t px-4 py-2">
          {objective.indicators.map((indicator) => (
            <div
              key={indicator.id}
              className="flex items-center justify-between py-2"
            >
              <span className="text-sm">{indicator.name}</span>
              <Switch
                checked={indicator.isActive}
                onCheckedChange={() =>
                  toggleIndicator(objective.id, indicator.id)
                }
                disabled={!objective.isActive}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
