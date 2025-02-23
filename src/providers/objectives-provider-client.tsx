"use client";
import ObjectivesProvider from "./objectives-provider";
import type { ObjectiveDetail } from "@/actions/dataLayer";

interface ObjectivesProviderClientProps {
  initialObjectives: ObjectiveDetail[];
  children: React.ReactNode;
}

export default function ObjectivesProviderClient({
  initialObjectives,
  children,
}: ObjectivesProviderClientProps) {
  return (
    <ObjectivesProvider initialObjectives={initialObjectives}>
      {children}
    </ObjectivesProvider>
  );
}
