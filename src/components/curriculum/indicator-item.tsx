"use client";
import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import {
  type IndicatorDetail,
  toggleIndicatorAction,
} from "@/actions/dataLayer";

interface Props {
  indicator: IndicatorDetail;
  objectiveActive: boolean;
}

export function IndicatorItem({ indicator, objectiveActive }: Props) {
  const [isPending, startTransition] = useTransition();

  const toggleIndicator = async () => {
    if (!objectiveActive) return;
    startTransition(async () => {
      try {
        await toggleIndicatorAction(indicator.id, !indicator.isActive);
      } catch (error) {
        console.error("Error toggling indicator", error);
      }
    });
  };

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{indicator.name}</span>
      <Switch
        type="submit"
        checked={indicator.isActive}
        onCheckedChange={toggleIndicator}
        disabled={!objectiveActive || isPending}
      />
    </div>
  );
}
