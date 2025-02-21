"use client";
import { type IndicatorDetail, toggleIndicator } from "@/actions/dataLayer";
import { useActionState, useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Props {
  indicator: IndicatorDetail;
}

export function IndicatorItem({ indicator }: Props) {
  const [isEnabled, setIsEnabled] = useState(indicator.isActive);
  const [_error, action, pending] = useActionState(toggleIndicator, null);
  function handleChange(value: boolean) {
    setIsEnabled(value);
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm">{indicator.name}</span>
      <form action={action}>
        <input type="hidden" name="indicatorId" value={indicator.id} />
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
  );
}
