"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface Props {
  courseId: number;
}

export async function deleteCourse({ courseId }: Props) {
  try {
    await db.delete(courses).where(eq(courses.id, courseId));
    revalidatePath("/");
    return { message: "Removed a course" };
  } catch (e) {
    return { message: "Error removing acourser" };
  }
}
