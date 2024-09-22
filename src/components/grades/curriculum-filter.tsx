"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { SelectCourse } from "@/db/schema/course";
import type {
  SelectCore,
  SelectIndicator,
  SelectObjective,
  SelectScope,
} from "@/db/schema/curriculum";
import type { SelectPeriod } from "@/db/schema/grade";
import type { SelectStudent } from "@/db/schema/student";

interface Props {
  data: {
    periods: SelectPeriod[];
    scopes: SelectScope[];
    cores: SelectCore[];
    objectives: SelectObjective[];
    indicators: SelectIndicator[];
    courses: SelectCourse[];
    students: SelectStudent[];
  };
}

export function CurriculumFilter({ data }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [periodId, setPeriodId] = useState<string>("");
  const [scopeId, setScopeId] = useState<string>("");
  const [coreId, setCoreId] = useState<string>("");
  const [objectiveId, setObjectiveId] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [currentIndicatorIndex, setCurrentIndicatorIndex] = useState(0);
  const [evaluations, setEvaluations] = useState<
    Record<string, Record<string, number>>
  >({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCoreId("");
    setObjectiveId("");
    resetEvaluations();
  }, [scopeId]);

  useEffect(() => {
    setObjectiveId("");
    resetEvaluations();
  }, [coreId]);

  useEffect(() => {
    resetEvaluations();
  }, [objectiveId]);

  const resetEvaluations = () => {
    setEvaluations({});
    setCurrentIndicatorIndex(0);
  };

  const handleEvaluationChange = (studentId: string, value: number[]) => {
    const currentIndicator = filteredIndicators[currentIndicatorIndex];
    setEvaluations((prev) => ({
      ...prev,
      [currentIndicator.id]: {
        ...(prev[currentIndicator.id] || {}),
        [studentId]: value[0],
      },
    }));
  };

  const handleSetAllScores = (score: number) => {
    const currentIndicator = filteredIndicators[currentIndicatorIndex];
    const newEvaluations = filteredStudents.reduce((acc, student) => {
      acc[student.id.toString()] = score;
      return acc;
    }, {} as Record<string, number>);
    setEvaluations((prev) => ({
      ...prev,
      [currentIndicator.id]: newEvaluations,
    }));
  };

  const filteredCores = data.cores.filter(
    (core) => core.scopeId.toString() === scopeId
  );
  const filteredObjectives = data.objectives.filter(
    (objective) => objective.coreId.toString() === coreId && objective.isActive
  );
  const filteredIndicators = data.indicators.filter(
    (indicator) =>
      indicator.objectiveId.toString() === objectiveId && indicator.isActive
  );
  const filteredStudents = data.students.filter(
    (student) => student.courseId.toString() === courseId
  );

  const handleNext = () => {
    if (!periodId || !scopeId || !coreId || !objectiveId || !courseId) {
      setError("Please fill in all fields before proceeding.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleNextIndicator = () => {
    const currentIndicator = filteredIndicators[currentIndicatorIndex];
    if (
      Object.keys(evaluations[currentIndicator.id] || {}).length !==
      filteredStudents.length
    ) {
      setError(
        "Please evaluate all students before proceeding to the next indicator."
      );
      return;
    }
    setError("");
    if (currentIndicatorIndex < filteredIndicators.length - 1) {
      setCurrentIndicatorIndex((prev) => prev + 1);
    } else {
      // All indicators evaluated, go back to filters
      setStep(1);
      setCurrentIndicatorIndex(0);
    }
  };

  const isIndicatorComplete = (indicatorId: string) => {
    return (
      Object.keys(evaluations[indicatorId] || {}).length ===
      filteredStudents.length
    );
  };

  const isObjectiveComplete = () => {
    return filteredIndicators.every((indicator) =>
      isIndicatorComplete(indicator.id.toString())
    );
  };

  const getIndicatorScores = (indicatorId: string) => {
    const scores = evaluations[indicatorId] || {};
    const sum = Object.values(scores).reduce((acc, score) => acc + score, 0);
    const total = filteredStudents.length * 3; // Assuming max score is 3
    return { sum, total };
  };

  if (step === 2) {
    const currentIndicator = filteredIndicators[currentIndicatorIndex];
    return (
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">{currentIndicator.name}</h2>
        <div className="mb-6 flex justify-between items-center">
          <p className="text-lg font-semibold">Set score for all students:</p>
          <div className="flex space-x-2">
            {[1, 2, 3].map((score) => (
              <Button
                key={score}
                onClick={() => handleSetAllScores(score)}
                variant="outline"
              >
                {score}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardContent className="p-5">
                <h3 className="font-bold mb-2">
                  {student.firstName} {student.lastName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">Age: {student.age}</p>
                <Slider
                  value={[evaluations[currentIndicator.id]?.[student.id] || 1]}
                  min={1}
                  max={3}
                  step={1}
                  onValueChange={(value) =>
                    handleEvaluationChange(student.id.toString(), value)
                  }
                />
                <p className="mt-3 text-center">
                  Evaluation:{" "}
                  {evaluations[currentIndicator.id]?.[student.id] || 1}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back to Filters
          </Button>
          <Button onClick={handleNextIndicator}>
            {currentIndicatorIndex < filteredIndicators.length - 1
              ? "Next Indicator"
              : "Finish Evaluation"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold my-4">Periodo</h2>
      <div className="grid">
        <Select value={periodId} onValueChange={setPeriodId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            {data.periods.map((period) => (
              <SelectItem key={period.id} value={period.id.toString()}>
                {period.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <h2 className="text-xl font-bold my-4">Configuración curricular</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Select value={scopeId} onValueChange={setScopeId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Scope" />
          </SelectTrigger>
          <SelectContent>
            {data.scopes.map((scope) => (
              <SelectItem key={scope.id} value={scope.id.toString()}>
                {scope.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={coreId} onValueChange={setCoreId} disabled={!scopeId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Core" />
          </SelectTrigger>
          <SelectContent>
            {filteredCores.map((core) => (
              <SelectItem key={core.id} value={core.id.toString()}>
                {core.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={objectiveId}
          onValueChange={setObjectiveId}
          disabled={!coreId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Objective" />
          </SelectTrigger>
          <SelectContent>
            {filteredObjectives.map((objective) => (
              <SelectItem key={objective.id} value={objective.id.toString()}>
                <div className="flex items-center justify-between w-full">
                  <span>{objective.name}</span>
                  {isObjectiveComplete() && (
                    <CheckCircle2Icon className="w-4 h-4 text-green-500" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredIndicators.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold my-4">Indicadores</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIndicators.map((indicator, index) => (
              <Card
                key={indicator.id}
                className={`cursor-pointer transition-colors duration-200 h-64 ${
                  index === currentIndicatorIndex
                    ? "font-bold bg-accent"
                    : "hover:bg-muted hover:text-gray-800"
                }`}
                onClick={() => setCurrentIndicatorIndex(index)}
              >
                <CardContent className="p-4 h-4/5">
                  <h3 className="mb-2">{indicator.name}</h3>
                  <p className="text-sm">{indicator.level}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t p-2">
                  <div className="text-sm font-medium">
                    {(() => {
                      const { sum, total } = getIndicatorScores(
                        indicator.id.toString()
                      );
                      return `${sum} / ${total}`;
                    })()}
                  </div>
                  <div className="h-1/5 w-6 flex items-center justify-center">
                    {isIndicatorComplete(indicator.id.toString()) && (
                      <CheckCircle2Icon className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold my-4">Curso</h2>
      <div className="grid">
        <Select value={courseId} onValueChange={setCourseId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {data.courses.map((course) => (
              <SelectItem key={course.id} value={course.id.toString()}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={resetEvaluations}>
          Reset
        </Button>
        <Button onClick={handleNext}>Start Evaluation</Button>
      </div>
    </div>
  );
}
