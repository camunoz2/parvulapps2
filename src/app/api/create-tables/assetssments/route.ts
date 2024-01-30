import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE StudentAssessments (
      AssessmentID SERIAL PRIMARY KEY,
      StudentID INT NOT NULL,
      ObjectiveID INT NOT NULL,
      Score INT CHECK (Score BETWEEN 1 AND 3),
      AssessmentDate DATE NOT NULL,
      FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
      FOREIGN KEY (ObjectiveID) REFERENCES LearningObjectives(ObjectiveID)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
