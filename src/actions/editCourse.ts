"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface Props {
  courseId: number;
  courseName: string;
}

export async function editCourse({ courseId, courseName }: Props) {
  try {
    await db
      .update(courses)
      .set({ course: courseName })
      .where(eq(courses.id, courseId));
    revalidatePath("/dashboard/cursos");
    return console.log("Success!@");
  } catch (e) {
    return console.log("Nope", e);
  }
}
