import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { students } from "./students";

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey(),
  course: text("course").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  students: many(students),
}));

export type SelectCourse = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
