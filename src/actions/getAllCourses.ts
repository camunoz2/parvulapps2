"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";

export async function getAllCourses() {
  try {
    const response = await db.select().from(courses);
    return response;
  } catch (e) {
    console.log("Error", e);
  }
}
