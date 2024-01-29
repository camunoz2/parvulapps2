import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE LearningObjectives (
      ObjectiveID SERIAL PRIMARY KEY,
      CriterionID INT NOT NULL,
      Description TEXT NOT NULL,
      FOREIGN KEY (CriterionID) REFERENCES AssessmentCriteria(CriterionID)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
