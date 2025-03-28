import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertConsultationRequestSchema,
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // API Routes
  
  // Get all destinations
  app.get('/api/destinations', async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });
  
  // Get destination by slug
  app.get('/api/destinations/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const destination = await storage.getDestinationBySlug(slug);
      
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });
  
  // Get all itineraries
  app.get('/api/itineraries', async (req, res) => {
    try {
      const itineraries = await storage.getItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });
  
  // Get itineraries by destination ID
  app.get('/api/destinations/:id/itineraries', async (req, res) => {
    try {
      const destinationId = parseInt(req.params.id);
      
      if (isNaN(destinationId)) {
        return res.status(400).json({ error: "Invalid destination ID" });
      }
      
      const itineraries = await storage.getItinerariesByDestinationId(destinationId);
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });
  
  // Get itinerary by ID
  app.get('/api/itineraries/:id', async (req, res) => {
    try {
      const itineraryId = parseInt(req.params.id);
      
      if (isNaN(itineraryId)) {
        return res.status(400).json({ error: "Invalid itinerary ID" });
      }
      
      const itinerary = await storage.getItineraryById(itineraryId);
      
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });
  
  // Get all testimonials
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });
  
  // Create a consultation request
  app.post('/api/consultation-requests', async (req, res) => {
    try {
      const consultationRequestData = insertConsultationRequestSchema.parse(req.body);
      const consultationRequest = await storage.createConsultationRequest(consultationRequestData);
      
      res.status(201).json(consultationRequest);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      res.status(500).json({ error: "Failed to create consultation request" });
    }
  });
  
  return httpServer;
}
