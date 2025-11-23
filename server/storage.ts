import { type User, type InsertUser, type Sighting, type InsertSighting, users, sightings, pageViews } from "@shared/schema";
import { db } from "./db";
import { desc, eq, sql, count } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getSightings(limit?: number): Promise<Sighting[]>;
  createSighting(sighting: InsertSighting): Promise<Sighting>;
  
  recordPageView(page: string): Promise<void>;
  getStats(): Promise<{
    totalViews: number;
    totalSightings: number;
  }>;
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

  async recordPageView(page: string): Promise<void> {
    await db.insert(pageViews).values({ page });
  }

  async getStats(): Promise<{ totalViews: number; totalSightings: number }> {
    const [viewsResult] = await db.select({ count: count() }).from(pageViews);
    const [sightingsResult] = await db.select({ count: count() }).from(sightings);
    
    return {
      totalViews: viewsResult?.count || 0,
      totalSightings: sightingsResult?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();
