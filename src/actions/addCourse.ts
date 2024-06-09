"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";

type FormState = {
  message: string;
};

export async function addCourse(prevState: FormState, formData: FormData) {
  const course = `${formData.get("name")} ${formData.get("section")}`;
  try {
    await db.insert(courses).values({ course: course as string });
    revalidatePath("/");
    return { message: "Added a course" };
  } catch (e) {
    return { message: "Error wrinting the form" };
  }
}
