"use server";

import { courses } from "@/db/schema/courses";
import { db } from "@/lib/drizzle";

export async function getAllCourses() {
  return db.select().from(courses);
}
