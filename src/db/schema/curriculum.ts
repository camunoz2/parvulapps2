import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

////////////////////// Schema //////////////////////////////////////////////
export const scopes = sqliteTable("scopes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const cores = sqliteTable("cores", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  scopeId: integer("scope_id")
    .notNull()
    .references(() => scopes.id),
});

export const objectives = sqliteTable("objectives", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }),
  coreId: integer("core_id")
    .notNull()
    .references(() => cores.id),
  levelId: integer("level_id")
    .notNull()
    .references(() => levels.id),
});

export const levels = sqliteTable("levels", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const indicators = sqliteTable("indicators", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }),
  objectiveId: integer("objective_id")
    .notNull()
    .references(() => objectives.id),
});

////////////////////// Relations //////////////////////////////////////////////
export const scopesRelation = relations(scopes, ({ many }) => ({
  cores: many(cores),
}));

export const coresRelation = relations(cores, ({ one, many }) => ({
  scope: one(scopes, {
    fields: [cores.scopeId],
    references: [scopes.id],
  }),
  objetivos: many(objectives),
}));

export const levelsRelation = relations(levels, ({ many }) => ({
  objectives: many(objectives),
}));

export const objetivosRelation = relations(objectives, ({ one, many }) => ({
  niveles: one(levels, {
    fields: [objectives.levelId],
    references: [levels.id],
  }),
  indicadores: many(indicators),
}));

export const indicatorsRelations = relations(indicators, ({ one }) => ({
  objetivos: one(objectives, {
    fields: [indicators.objectiveId],
    references: [objectives.id],
  }),
}));

////////////////////// Types //////////////////////////////////////////////
export type SelectScope = InferSelectModel<typeof scopes>;
export type InsertScope = InferInsertModel<typeof scopes>;
export type SelectCore = InferSelectModel<typeof cores>;
export type InsertCore = InferInsertModel<typeof cores>;
export type SelectObjective = InferSelectModel<typeof objectives>;
export type InsertObjective = InferInsertModel<typeof objectives>;
export type SelectIndicator = InferSelectModel<typeof indicators>;
export type InsertIndicator = InferInsertModel<typeof indicators>;
