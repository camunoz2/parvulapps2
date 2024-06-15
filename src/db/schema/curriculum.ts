import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

////////////////////// Schema //////////////////////////////////////////////
export const ambitos = sqliteTable("ambitos", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const nucleos = sqliteTable("nucleos", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  ambitoId: integer("ambito_id")
    .notNull()
    .references(() => ambitos.id),
});

export const objetivos = sqliteTable("objetivos", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }),
  nucleoId: integer("nucleo_id")
    .notNull()
    .references(() => nucleos.id),
  nivelesId: integer("niveles_id")
    .notNull()
    .references(() => niveles.id),
});

export const niveles = sqliteTable("niveles", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const indicadores = sqliteTable("indicadores", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }),
  objetivoId: integer("objetivo_id")
    .notNull()
    .references(() => objetivos.id),
});

////////////////////// Relations //////////////////////////////////////////////
export const ambitosRelation = relations(ambitos, ({ many }) => ({
  nucleos: many(nucleos),
}));

export const nucleosRelation = relations(nucleos, ({ one, many }) => ({
  ambito: one(ambitos, {
    fields: [nucleos.ambitoId],
    references: [ambitos.id],
  }),
  objetivos: many(objetivos),
}));

export const nivelesRelation = relations(niveles, ({ many }) => ({
  objetivos: many(objetivos),
}));

export const objetivosRelation = relations(objetivos, ({ one, many }) => ({
  niveles: one(niveles, {
    fields: [objetivos.nivelesId],
    references: [niveles.id],
  }),
  indicadores: many(indicadores),
}));

export const indicadoresRelation = relations(indicadores, ({ one }) => ({
  objetivos: one(objetivos, {
    fields: [indicadores.objetivoId],
    references: [objetivos.id],
  }),
}));

////////////////////// Types //////////////////////////////////////////////
export type SelectAmbito = InferSelectModel<typeof ambitos>;
export type InsertAmbito = InferInsertModel<typeof ambitos>;
export type SelectNucleo = InferSelectModel<typeof nucleos>;
export type InsertNucleo = InferInsertModel<typeof nucleos>;
export type SelectObjetivo = InferSelectModel<typeof objetivos>;
export type InsertObjetivo = InferInsertModel<typeof objetivos>;
export type SelectIndicador = InferSelectModel<typeof indicadores>;
export type InsertIndicador = InferInsertModel<typeof indicadores>;
