import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const schools = sqliteTable("schools", {
  id: integer("id").primaryKey(),
  schoolName: text("school_name").notNull(),
  schoolAddress: text("school_address").notNull(),
  adminName: text("admin_name").notNull(),
  adminEmail: text("admin_email").notNull(),
  domain: text("domain").notNull(),
});

export type SelectSchools = InferSelectModel<typeof schools>;
export type InsertSchools = InferInsertModel<typeof schools>;
