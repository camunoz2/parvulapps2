"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
};

export async function addCourse(prevState: FormState, formData: FormData) {
  try {
    await db
      .insert(courses)
      .values({ course: formData.get("coursename") as string });
    revalidatePath("/");
    return { message: "Added a course" };
  } catch (e) {
    return { message: "Error wrinting the form" };
  }
}
