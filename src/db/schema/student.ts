import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./course";

export const students = sqliteTable("students", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  age: integer("age").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id),
});

export const studentRelations = relations(students, ({ one }) => ({
  course: one(courses, {
    fields: [students.courseId],
    references: [courses.id],
  }),
}));

export type SelectStudent = InferSelectModel<typeof students>;
export type InsertStudent = InferInsertModel<typeof students>;
