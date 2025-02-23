"use client";
import { type IndicatorDetail } from "@/actions/dataLayer";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Props {
  indicator: IndicatorDetail;
}

export function IndicatorItem({ indicator }: Props) {
  const [isEnabled, setIsEnabled] = useState(indicator.isActive);
  function handleChange(value: boolean) {
    setIsEnabled(value);
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{indicator.name}</span>
      <Switch
        type="submit"
        checked={isEnabled}
        onCheckedChange={handleChange}
      />
    </div>
  );
}
