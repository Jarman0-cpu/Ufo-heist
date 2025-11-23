import { type User, type InsertUser, type Sighting, type InsertSighting, users, sightings } from "@shared/schema";
import { db } from "./db";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSightings(limit?: number): Promise<Sighting[]>;
  createSighting(sighting: InsertSighting): Promise<Sighting>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getSightings(limit: number = 50): Promise<Sighting[]> {
    return db.select().from(sightings).orderBy(desc(sightings.timestamp)).limit(limit);
  }

  async createSighting(insertSighting: InsertSighting): Promise<Sighting> {
    const [sighting] = await db.insert(sightings).values(insertSighting).returning();
    return sighting;
  }
}

export const storage = new DatabaseStorage();
