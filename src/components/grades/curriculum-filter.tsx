"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const [periodId, setPeriodId] = useState<string>("");
  const [scopeId, setScopeId] = useState<string>("");
  const [coreId, setCoreId] = useState<string>("");
  const [objectiveId, setObjectiveId] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null
  );
  const [studentEvaluations, setStudentEvaluations] = useState<
    Record<string, number>
  >({});
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCoreId("");
    setObjectiveId("");
    setSelectedIndicator(null);
  }, [scopeId]);

  useEffect(() => {
    setObjectiveId("");
    setSelectedIndicator(null);
  }, [coreId]);

  useEffect(() => {
    setSelectedIndicator(null);
  }, [objectiveId]);

  const handleEvaluationChange = (studentId: string, value: number[]) => {
    setStudentEvaluations((prev) => ({
      ...prev,
      [studentId]: value[0],
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

  const handleSubmit = () => {
    if (
      !periodId ||
      !scopeId ||
      !coreId ||
      !objectiveId ||
      !courseId ||
      !selectedIndicator
    ) {
      setError("Please fill in all fields before submitting.");
      return;
    }

    if (Object.keys(studentEvaluations).length !== filteredStudents.length) {
      setError("Please evaluate all students before submitting.");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Submitting evaluations:", {
      periodId,
      scopeId,
      coreId,
      objectiveId,
      courseId,
      selectedIndicator,
      studentEvaluations,
    });

    // Clear form and show success message
    setError("");
    alert("Evaluations submitted successfully!");
    resetForm();
  };

  const resetForm = () => {
    setPeriodId("");
    setScopeId("");
    setCoreId("");
    setObjectiveId("");
    setCourseId("");
    setSelectedIndicator(null);
    setStudentEvaluations({});
  };

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
      <div className="grid grid-cols-3 gap-2">
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
                {objective.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredIndicators.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold my-4">Indicadores</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIndicators.map((indicator) => (
              <Card
                key={indicator.id}
                className={`cursor-pointer transition-colors duration-200 ${
                  selectedIndicator === indicator.id.toString()
                    ? "font-bold bg-accent"
                    : "hover:bg-muted hover:text-gray-800"
                }`}
                onClick={() => setSelectedIndicator(indicator.id.toString())}
              >
                <CardContent className="p-4">
                  <h3 className="mb-2">{indicator.name}</h3>
                  <p className="text-sm">{indicator.level}</p>
                </CardContent>
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

      {selectedIndicator && courseId && (
        <div className="mt-9">
          <h2 className="text-2xl font-bold mb-4">Alumnos</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <Card key={student.id}>
                <CardContent className="p-5">
                  <h3 className="font-bold mb-2">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Age: {student.age}
                  </p>
                  <Slider
                    value={[studentEvaluations[student.id] || 1]}
                    min={1}
                    max={3}
                    step={1}
                    onValueChange={(value) =>
                      handleEvaluationChange(student.id.toString(), value)
                    }
                  />
                  <p className="mt-3 text-center">
                    Evaluation: {studentEvaluations[student.id] || 1}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline" onClick={resetForm}>
          Reset
        </Button>
        <Button onClick={handleSubmit}>Submit Evaluations</Button>
      </div>
    </div>
  );
}
