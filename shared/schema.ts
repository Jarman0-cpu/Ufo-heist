import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const sightings = pgTable("sightings", {
  id: serial("id").primaryKey(),
  witnessName: text("witness_name").notNull(),
  location: text("location").notNull(),
  monumentSeen: text("monument_seen").notNull(),
  description: text("description").notNull(),
  coordinates: text("coordinates"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertSightingSchema = createInsertSchema(sightings).omit({
  id: true,
  timestamp: true,
});

export type InsertSighting = z.infer<typeof insertSightingSchema>;
export type Sighting = typeof sightings.$inferSelect;
