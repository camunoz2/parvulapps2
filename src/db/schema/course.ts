import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { students } from "./student";

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  students: many(students),
}));

export type SelectCourse = InferSelectModel<typeof courses>;
export type InsertCourse = InferInsertModel<typeof courses>;
