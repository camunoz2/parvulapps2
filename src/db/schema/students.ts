import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";

export const students = sqliteTable("students", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  secondName: text("second_name").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id),
});

export type SelectStudent = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;
