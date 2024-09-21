import {
  getCores,
  getCourses,
  getIndicators,
  getObjectives,
  getPeriods,
  getScopes,
  getStudents,
} from "@/actions/dataLayer";
import StudentEvaluationClient from "@/components/grades/student-evaluation-client";

// Mock data
const evaluationTypes = ["Diagnostica", "Intermedia", "Cierre"];
const courses = ["Mathematics", "Science", "Literature", "History"];
const students = [
  { id: 1, name: "Alice Johnson", course: "Mathematics" },
  { id: 2, name: "Bob Smith", course: "Science" },
  { id: 3, name: "Charlie Brown", course: "Literature" },
  { id: 4, name: "Diana Martinez", course: "History" },
  { id: 5, name: "Eva Garcia", course: "Mathematics" },
  { id: 6, name: "Frank Wilson", course: "Science" },
  { id: 7, name: "Grace Lee", course: "Literature" },
  { id: 8, name: "Henry Davis", course: "History" },
];

const learningOutcomes = [
  {
    subdimension: "Critical Thinking",
    outcomes: [
      "Analyze complex problems",
      "Evaluate evidence-based arguments",
      "Develop logical solutions",
    ],
  },
  {
    subdimension: "Communication",
    outcomes: [
      "Write clear and concise reports",
      "Deliver effective presentations",
      "Engage in constructive discussions",
    ],
  },
  {
    subdimension: "Research Skills",
    outcomes: [
      "Formulate research questions",
      "Conduct literature reviews",
      "Apply appropriate methodologies",
    ],
  },
];

export default async function StudentEvaluation() {
  const students = await getStudents();
  const courses = await getCourses();
  const periods = await getPeriods();
  const cores = await getCores();
  const indicators = await getIndicators();
  const objectives = await getObjectives();
  const scopes = await getScopes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluationes por alumno</h1>
      <StudentEvaluationClient
        periods={periods}
        indicators={indicators}
        students={students}
        cores={cores}
        objectives={objectives}
        scopes={scopes}
      />
    </div>
  );
}
