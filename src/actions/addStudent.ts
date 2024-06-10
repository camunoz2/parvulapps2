"use server";

import { db } from "@/lib/drizzle";
import { students } from "@/db/schema/students";
import { revalidatePath } from "next/cache";

export async function addStudent(form: FormData) {
  const studentData = {
    firstName: form.get("firstname") as string,
    lastName: form.get("lastname") as string,
    courseId: Number(form.get("course")),
    age: Number(form.get("age")),
  };
  await db.insert(students).values(studentData);
  revalidatePath("/dashboard/alumnos");
  return { message: "Student created!" };
}
