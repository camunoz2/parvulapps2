"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function ToastNotification({
  description,
}: {
  description: string;
}) {
  const { toast } = useToast();

  toast({
    title: "Scheduled: Catch up ",
    description,
    action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
  });

  return <></>;
}
