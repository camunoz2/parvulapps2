"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";

export async function getAllCourses() {
  return await db.select().from(courses);
}
