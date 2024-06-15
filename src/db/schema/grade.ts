import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const grade = sqliteTable("grade", {
  id: integer("id").primaryKey(),
  period: integer("period").notNull(),
  grade: integer("grade").notNull(),
});

export type SelectGrade = InferSelectModel<typeof grade>;
export type InsertGrade = InferInsertModel<typeof grade>;
