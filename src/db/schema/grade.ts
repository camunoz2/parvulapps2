import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { students } from "./student";
import { indicators } from "./curriculum";

////////////////////// Schema //////////////////////////////////////////////
export const grades = sqliteTable("grades", {
  id: integer("id").primaryKey(),
  grade: integer("grade").notNull(),
  periodId: integer("period_id")
    .notNull()
    .references(() => periods.id),
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id),
  indicatorId: integer("indicator_id")
    .notNull()
    .references(() => indicators.id),
});

export const periods = sqliteTable("periods", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

////////////////////// Relations //////////////////////////////////////////////
////////////////////// Types //////////////////////////////////////////////
export type SelectGrade = InferSelectModel<typeof grades>;
export type InsertGrade = InferInsertModel<typeof grades>;
export type SelectPeriod = InferSelectModel<typeof periods>;
export type InsertPeriod = InferInsertModel<typeof periods>;
