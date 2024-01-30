import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE AssessmentCriteria (
      CriterionID SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      Description TEXT,
      ParentID INT,
      FOREIGN KEY (ParentID) REFERENCES AssessmentCriteria(CriterionID)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
