import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE Classes (
      ClassID SERIAL PRIMARY KEY,
      SchoolID INT NOT NULL,
      TeacherID VARCHAR(255) NOT NULL,
      ClassName VARCHAR(255) NOT NULL,
      GradeLevel VARCHAR(255),
      FOREIGN KEY (SchoolID) REFERENCES Schools(SchoolID),
      FOREIGN KEY (TeacherID) REFERENCES Teachers(TeacherID)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
