import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE Students (
      StudentID SERIAL PRIMARY KEY,
      ClassID INT NOT NULL,
      Name VARCHAR(255) NOT NULL,
      BirthDate DATE,
      FOREIGN KEY (ClassID) REFERENCES Classes(ClassID)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
