import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import { cores, indicators, objectives, scopes } from "./schema/curriculum";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function SeedScopes() {
  console.log("Seeding scopes");
  const file = readFileSync(`${process.cwd()}/src/db/csv/scopes.csv`);
  const data = parse(file, { columns: true });
  for (const obj of data) {
    try {
      await db.insert(scopes).values({
        id: obj.id,
        name: obj.name,
        order: obj.order,
      });
    } catch (e) {
      console.log("Scope error", e);
    }
  }
}

async function SeedCores() {
  console.log("Seeding cores");
  const file = readFileSync(`${process.cwd()}/src/db/csv/cores.csv`);
  const data = parse(file, { columns: true });
  for (const obj of data) {
    try {
      await db.insert(cores).values({
        id: obj.id,
        name: obj.name,
        order: obj.order,
        scopeId: obj.scope_id,
      });
    } catch (e) {
      console.log("Cores error", e);
    }
  }
}

async function SeedObjectives() {
  console.log("Seeding objectives");
  const file = readFileSync(`${process.cwd()}/src/db/csv/objectives.csv`);
  const data = parse(file, { columns: true });
  for (const obj of data) {
    try {
      await db.insert(objectives).values({
        id: obj.id,
        isActive: obj.is_active,
        coreId: obj.core_id,
        order: obj.order,
        name: obj.name,
      });
    } catch (e) {
      console.log("Objectives error", e);
    }
  }
}

async function SeedIndicators() {
  console.log("Seeding indicators");
  const file = readFileSync(`${process.cwd()}/src/db/csv/indicators.csv`);
  const data = parse(file, { columns: true });
  for (const obj of data) {
    try {
      await db.insert(indicators).values({
        id: obj.id,
        name: obj.name,
        order: obj.name,
        isActive: obj.is_active,
        level: obj.level,
        objectiveId: obj.objective_id,
      });
    } catch (e) {
      console.log("Indicator error", e);
    }
  }
}

async function SeedDatabase() {
  try {
    // delete in order
    await db.delete(indicators);
    await db.delete(objectives);
    await db.delete(cores);
    await db.delete(scopes);
    // seed in order
    await SeedScopes();
    await SeedCores();
    await SeedObjectives();
    await SeedIndicators();
  } catch (e) {
    console.error("Error seeding db", e);
  } finally {
    console.log("Db seeded!");
  }
}

SeedDatabase();
