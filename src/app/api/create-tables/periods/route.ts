import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE AssessmentPeriods (
      PeriodID SERIAL PRIMARY KEY,
      StartDate DATE NOT NULL,
      EndDate DATE NOT NULL,
      Description TEXT
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
