import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSightingSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Record page view
  app.post("/api/page-view", async (req, res) => {
    try {
      const page = req.body.page || "/";
      await storage.recordPageView(page);
      res.json({ success: true });
    } catch (error) {
      console.error("Error recording page view:", error);
      res.status(500).json({ error: "Failed to record page view" });
    }
  });

  // Get stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
  
  // Get recent sightings
  app.get("/api/sightings", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const sightings = await storage.getSightings(limit);
      res.json(sightings);
    } catch (error) {
      console.error("Error fetching sightings:", error);
      res.status(500).json({ error: "Failed to fetch sightings" });
    }
  });

  // Create a new sighting report
  app.post("/api/sightings", async (req, res) => {
    try {
      const validationResult = insertSightingSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromError(validationResult.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const sighting = await storage.createSighting(validationResult.data);
      res.status(201).json(sighting);
    } catch (error) {
      console.error("Error creating sighting:", error);
      res.status(500).json({ error: "Failed to create sighting" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
