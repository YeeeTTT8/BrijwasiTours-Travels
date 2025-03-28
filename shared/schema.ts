import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Destination schema
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  mainImage: text("main_image").notNull(),
  bannerImage: text("banner_image").notNull(),
  attractions: json("attractions").$type<string[]>().notNull(),
  travelTips: json("travel_tips").$type<string[]>().notNull(),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

// Itinerary schema
export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  destinationId: integer("destination_id").notNull(),
  duration: text("duration").notNull(),
  budgetLevel: text("budget_level").notNull(),
  travelStyle: json("travel_style").$type<string[]>().notNull(),
  highlights: json("highlights").$type<string[]>().notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
});

// Testimonial schema
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  destination: text("destination").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  date: text("date").notNull(),
  avatarImage: text("avatar_image").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Consultation request schema
export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  destination: text("destination").notNull(),
  travelDate: text("travel_date"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  contacted: boolean("contacted").notNull().default(false),
});

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests).omit({
  id: true,
  createdAt: true,
  contacted: true,
});

// Types
export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type InsertConsultationRequest = z.infer<typeof insertConsultationRequestSchema>;
