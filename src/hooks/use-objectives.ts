import { ObjectiveContext } from "@/providers/objectives-provider";
import { useContext } from "react";

export const useObjectives = () => {
  const context = useContext(ObjectiveContext);
  if (!context) {
    throw new Error("useObjectives must be used within an ObjectivesProvider");
  }
  return context;
};
