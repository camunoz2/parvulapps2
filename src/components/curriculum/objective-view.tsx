"use client";

import { ObjectiveItem } from "./objective-item";
import type { ObjectiveDetail } from "@/actions/dataLayer";

export default function ObjectivesView({
  objectives,
}: { objectives: ObjectiveDetail[] }) {
  return (
    <div className="container mx-auto">
      <div className="space-y-4">
        {objectives.map((objective) => (
          <ObjectiveItem key={objective.id} objective={objective} />
        ))}
      </div>
    </div>
  );
}
