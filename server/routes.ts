import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { appendConsultationRow } from "./google-sheets";  // ← added

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // --- GET: all destinations ---
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  // --- GET: destination by slug ---
  app.get("/api/destinations/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const destination = await storage.getDestinationBySlug(slug);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  // --- GET: all itineraries ---
  app.get("/api/itineraries", async (_req, res) => {
    try {
      const itineraries = await storage.getItineraries();
      res.json(itineraries);
    } catch {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });

  // --- GET: itineraries by destination ID ---
  app.get("/api/destinations/:id/itineraries", async (req, res) => {
    try {
      const destinationId = Number(req.params.id);
      if (isNaN(destinationId)) {
        return res.status(400).json({ error: "Invalid destination ID" });
      }
      const itineraries = await storage.getItinerariesByDestinationId(destinationId);
      res.json(itineraries);
    } catch {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });

  // --- GET: single itinerary by ID ---
  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const itineraryId = Number(req.params.id);
      if (isNaN(itineraryId)) {
        return res.status(400).json({ error: "Invalid itinerary ID" });
      }
      const itinerary = await storage.getItineraryById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch {
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  // --- GET: all testimonials ---
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // --- POST: create a consultation request ---
    // Create a consultation request
    app.post("/api/consultation-requests", async (req, res) => {
      try {
        // 1) Validate
        const data = insertConsultationRequestSchema.parse(req.body);
  
        // 2) Try to append to Google Sheets, but don’t kill the whole request if it fails
        try {
          await appendConsultationRow(data);
        } catch (sheetErr) {
          console.error("⚠️ Google Sheets append failed:", sheetErr);
          // optional: you could even notify yourself via email/slack here
        }
  
        // 3) Always store in your in-memory store
        const created = await storage.createConsultationRequest(data);
  
        // 4) Return the created object
        res.status(201).json(created);
  
      } catch (error) {
        // 5) Zod validation errors
        if (error instanceof ZodError) {
          const msg = fromZodError(error).message;
          return res.status(400).json({ error: msg });
        }
  
        // 6) Everything else
        console.error("💥 Consultation POST failed:", error);
        res.status(500).json({ error: "Failed to create consultation request" });
      }
    });
  
  return httpServer;
}
