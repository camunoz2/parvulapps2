"use server";

import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface Props {
  studentId: number;
}

export async function deleteStudent({ studentId }: Props) {
  try {
    await db.delete(students).where(eq(students.id, studentId));
    revalidatePath("/dashboard/alumnos");
    return { message: "Removed a student" };
  } catch (e) {
    return { message: "Error removing a student" };
  }
}
