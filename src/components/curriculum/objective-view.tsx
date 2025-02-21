"use client";

import { useState } from "react";
import { ObjectiveItem } from "./objective-item";
import type { ObjectiveDetail } from "@/actions/dataLayer";

export default function ObjectivesView({
  initialObjectives,
}: { initialObjectives: ObjectiveDetail[] }) {
  const [objectives, setObjectives] = useState(initialObjectives);

  const toggleObjective = (objectiveId: number) => {
    setObjectives((prevObjectives) =>
      prevObjectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              enabled: !obj.isActive,
              indicators: obj.indicators.map((ind) => ({
                ...ind,
                enabled: !obj.isActive,
              })),
            }
          : obj,
      ),
    );
  };

  const toggleIndicator = (objectiveId: number, indicatorId: number) => {
    setObjectives((prevObjectives) =>
      prevObjectives.map((obj) =>
        obj.id === objectiveId
          ? {
              ...obj,
              indicators: obj.indicators.map((ind) =>
                ind.id === indicatorId
                  ? { ...ind, isActive: !ind.isActive }
                  : ind,
              ),
            }
          : obj,
      ),
    );
  };

  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        {objectives.map((objective) => (
          <ObjectiveItem
            key={objective.id}
            objective={objective}
            toggleObjective={toggleObjective}
            toggleIndicator={toggleIndicator}
          />
        ))}
      </div>
    </div>
  );
}
