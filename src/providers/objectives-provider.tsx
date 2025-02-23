"use client";
import { ObjectiveDetail } from "@/actions/dataLayer";
import { createContext, useRef, useState } from "react";
import isEqual from "lodash/isEqual";

interface ObjectiveContextType {
  objectives: ObjectiveDetail[];
  updateObjective: (obj: ObjectiveDetail) => void;
  isDirty: boolean;
  markClean: () => void;
  originalObjectives: ObjectiveDetail[];
}

export const ObjectiveContext = createContext<ObjectiveContextType | undefined>(
  undefined,
);

interface Props {
  children: React.ReactNode;
  initialObjectives: ObjectiveDetail[];
}

export default function ObjectivesProvider({
  children,
  initialObjectives,
}: Props) {
  const [objectives, setObjectives] = useState(initialObjectives);
  const originalObjectivesRef = useRef(initialObjectives);
  const isDirty = !isEqual(objectives, originalObjectivesRef.current);
  const updateObjective = (updatedObjective: ObjectiveDetail) => {
    setObjectives((prev) =>
      prev.map((o) => (o.id === updatedObjective.id ? updatedObjective : o)),
    );
  };
  const markClean = () => {
    originalObjectivesRef.current = objectives;
  };

  return (
    <ObjectiveContext.Provider
      value={{
        objectives,
        updateObjective,
        isDirty,
        markClean,
        originalObjectives: originalObjectivesRef.current,
      }}
    >
      {children}
    </ObjectiveContext.Provider>
  );
}
