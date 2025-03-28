export interface Destination {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  bannerImage: string;
  attractions: string[];
  travelTips: string[];
}

export interface Itinerary {
  id: number;
  title: string;
  destinationId: number;
  duration: string;
  budgetLevel: string;
  travelStyle: string[];
  highlights: string[];
  description: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  destination: string;
  rating: number;
  comment: string;
  date: string;
  avatarImage: string;
}

export interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate?: string;
  additionalInfo?: string;
}

export type BudgetLevel = "Budget-friendly" | "Moderate" | "Luxury" | "Ultra-luxury" | "any";
export type Duration = "3-4 days" | "5-7 days" | "8-10 days" | "10-14 days" | "14+ days" | "any";
export type TravelStyle = "Adventure" | "Cultural" | "Relaxation" | "Food & Culinary" | "Shopping";

export interface ItineraryFormData {
  destination: string;
  duration: Duration;
  budget: BudgetLevel;
  travelStyles: TravelStyle[];
}

// Hero images for the slider
export interface HeroImage {
  src: string;
  alt: string;
}
