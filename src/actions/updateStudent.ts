"use server";

import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateStudent(form: FormData) {
  const studentId = form.get("studentid");
  const studentData = {
    firstName: form.get("firstname") as string,
    lastName: form.get("lastname") as string,
    courseId: Number(form.get("course")),
    age: Number(form.get("age")),
  };
  if (!studentId) return { message: "No student id" };
  await db
    .update(students)
    .set(studentData)
    .where(eq(students.id, Number(studentId)));
  revalidatePath("/dashboard/alumnos");
  return { message: "Student updated!" };
}
