import { 
  destinations, 
  itineraries, 
  testimonials,
  consultationRequests,
  type Destination, 
  type InsertDestination,
  type Itinerary,
  type InsertItinerary,
  type Testimonial,
  type InsertTestimonial, 
  type ConsultationRequest,
  type InsertConsultationRequest
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
  
  // Itineraries
  getItineraries(): Promise<Itinerary[]>;
  getItinerariesByDestinationId(destinationId: number): Promise<Itinerary[]>;
  getItineraryById(id: number): Promise<Itinerary | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  
  // Consultation Requests
  createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest>;
  getConsultationRequests(): Promise<ConsultationRequest[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private destinations: Map<number, Destination>;
  private itineraries: Map<number, Itinerary>;
  private testimonials: Map<number, Testimonial>;
  private consultationRequests: Map<number, ConsultationRequest>;
  
  // ID counters
  private destinationId: number;
  private itineraryId: number;
  private testimonialId: number;
  private requestId: number;
  
  constructor() {
    this.destinations = new Map();
    this.itineraries = new Map();
    this.testimonials = new Map();
    this.consultationRequests = new Map();
    
    this.destinationId = 1;
    this.itineraryId = 1;
    this.testimonialId = 1;
    this.requestId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  // Destinations
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    return Array.from(this.destinations.values()).find(
      (destination) => destination.slug === slug,
    );
  }
  
  // Itineraries
  async getItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }
  
  async getItinerariesByDestinationId(destinationId: number): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values()).filter(
      (itinerary) => itinerary.destinationId === destinationId,
    );
  }
  
  async getItineraryById(id: number): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  // Consultation Requests
  async createConsultationRequest(request: InsertConsultationRequest): Promise<ConsultationRequest> {
    const id = this.requestId++;
    const consultationRequest: ConsultationRequest = {
      ...request,
      id,
      travelDate: request.travelDate || null,
      additionalInfo: request.additionalInfo || null,
      createdAt: new Date(),
      contacted: false,
    };
    
    this.consultationRequests.set(id, consultationRequest);
    return consultationRequest;
  }
  
  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return Array.from(this.consultationRequests.values());
  }
  
  // Initialize sample data
  private initializeSampleData() {
    // Sample destinations
    const dubaiDestination: Destination = {
      id: this.destinationId++,
      name: "Dubai",
      slug: "dubai",
      shortDescription: "Experience the ultimate luxury in this futuristic city where cutting-edge architecture meets traditional Arabian culture.",
      fullDescription: "Dubai is a city of superlatives, home to the world's tallest building, largest mall, and some of the most luxurious hotels on the planet. Experience the perfect blend of futuristic architecture, traditional souks, and breathtaking desert landscapes.",
      mainImage: "https://images.unsplash.com/photo-1546412414-e1885e51cfa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Desert Safari"],
      travelTips: ["Best time to visit: November to March", "Dress modestly in public places", "Taxis are the most convenient way to get around", "The weekend is Friday and Saturday"]
    };
    
    const thailandDestination: Destination = {
      id: this.destinationId++,
      name: "Thailand",
      slug: "thailand",
      shortDescription: "Discover pristine beaches, vibrant culture, and mouth-watering cuisine in this tropical paradise of Southeast Asia.",
      fullDescription: "Thailand offers a perfect blend of bustling cities, serene beaches, rich cultural heritage, and delectable cuisine. From the vibrant streets of Bangkok to the tranquil islands of Phi Phi and Phuket, Thailand has something for every type of traveler.",
      mainImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Phi Phi Islands", "Bangkok", "Chiang Mai", "Phuket"],
      travelTips: ["Best time to visit: November to March", "Always respect temple etiquette", "Bargain at markets but stay friendly", "Try the street food"]
    };
    
    const singaporeDestination: Destination = {
      id: this.destinationId++,
      name: "Singapore",
      slug: "singapore",
      shortDescription: "Experience a perfect blend of culture, cuisine, and futuristic architecture in this dynamic city-state.",
      fullDescription: "Singapore is a fascinating blend of East and West, tradition and innovation. This small but mighty city-state boasts stunning architecture, world-class dining, shopping, and entertainment options alongside lush green spaces and cultural enclaves.",
      mainImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island", "Hawker Centers"],
      travelTips: ["English is widely spoken", "Public transport is efficient and affordable", "Strict fines for littering and jaywalking", "The weather is hot and humid year-round"]
    };
    
    const vietnamDestination: Destination = {
      id: this.destinationId++,
      name: "Vietnam",
      slug: "vietnam",
      shortDescription: "Immerse yourself in breathtaking landscapes, rich history, and delicious cuisine in this captivating country.",
      fullDescription: "Vietnam offers a mesmerizing mix of natural highlights and cultural diversity. From the terraced rice fields of the mountainous north to the picturesque valleys of Halong Bay, it's a country full of natural beauty and tranquil village life.",
      mainImage: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1557750255-c76072a4703d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Ha Long Bay", "Hoi An", "Hanoi", "Ho Chi Minh City"],
      travelTips: ["Best time to visit: October to April", "Learn basic Vietnamese phrases", "Try the famous Vietnamese coffee", "Motorbikes are the main form of transport"]
    };
    
    const indonesiaDestination: Destination = {
      id: this.destinationId++,
      name: "Indonesia",
      slug: "indonesia",
      shortDescription: "Explore beautiful beaches, ancient temples, and lush rainforests across this diverse archipelago nation.",
      fullDescription: "Indonesia, the world's largest archipelago, offers incredible diversity across its 17,000 islands. From the spiritual hub of Ubud in Bali to the pristine beaches of the Gili Islands, Indonesia offers unforgettable experiences for every type of traveler.",
      mainImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Bali", "Ubud", "Komodo Island", "Raja Ampat"],
      travelTips: ["Best time to visit: April to October", "Respect local customs and traditions", "Bargain at markets but stay respectful", "Try the local cuisine"]
    };
    
    const uaeDestination: Destination = {
      id: this.destinationId++,
      name: "UAE",
      slug: "uae",
      shortDescription: "Experience the perfect blend of modern luxury and traditional Arabian culture throughout the United Arab Emirates.",
      fullDescription: "The United Arab Emirates offers more than just Dubai. Explore Abu Dhabi's cultural attractions, Sharjah's heritage sites, the mountains of Ras Al Khaimah, and the beaches of Fujairah. Each emirate has its own unique character and attractions.",
      mainImage: "https://images.unsplash.com/photo-1577411571638-78f63bbf1e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400",
      bannerImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600",
      attractions: ["Abu Dhabi", "Sharjah", "Fujairah", "Ras Al Khaimah"],
      travelTips: ["Best time to visit: October to April", "Respect local customs", "Taxis and ride-sharing are common", "Alcohol is only served in licensed venues"]
    };
    
    // Add destinations to the map
    this.destinations.set(dubaiDestination.id, dubaiDestination);
    this.destinations.set(thailandDestination.id, thailandDestination);
    this.destinations.set(singaporeDestination.id, singaporeDestination);
    this.destinations.set(vietnamDestination.id, vietnamDestination);
    this.destinations.set(indonesiaDestination.id, indonesiaDestination);
    this.destinations.set(uaeDestination.id, uaeDestination);
    
    // Sample itineraries
    const dubaiLuxuryItinerary: Itinerary = {
      id: this.itineraryId++,
      title: "5 Days in Dubai – Luxury Edition",
      destinationId: dubaiDestination.id,
      duration: "5-7 days",
      budgetLevel: "Luxury",
      travelStyle: ["Luxury", "Shopping", "Adventure"],
      highlights: ["Burj Khalifa VIP", "Desert Safari", "Yacht Cruise", "Fine Dining"],
      description: "Experience the best of Dubai with this luxury itinerary featuring 5-star accommodations, fine dining, and VIP experiences.",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
    };
    
    const thailandBackpackingItinerary: Itinerary = {
      id: this.itineraryId++,
      title: "Backpacking Across Thailand in 7 Days",
      destinationId: thailandDestination.id,
      duration: "5-7 days",
      budgetLevel: "Budget-friendly",
      travelStyle: ["Adventure", "Cultural", "Food & Culinary"],
      highlights: ["Hostels", "Street Food", "Island Hopping", "Temple Tours"],
      description: "Explore the best of Thailand on a budget with this backpacker-friendly itinerary covering Bangkok, Chiang Mai, and island hopping.",
      image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
    };
    
    const singaporeFamilyItinerary: Itinerary = {
      id: this.itineraryId++,
      title: "Singapore Family Adventure – 4 Days",
      destinationId: singaporeDestination.id,
      duration: "3-4 days",
      budgetLevel: "Moderate",
      travelStyle: ["Family-friendly", "Adventure", "Food & Culinary"],
      highlights: ["Universal Studios", "Gardens by the Bay", "Singapore Zoo", "S.E.A. Aquarium"],
      description: "Perfect for families with children, this 4-day Singapore itinerary includes kid-friendly attractions, comfortable accommodations, and easy transportation.",
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300"
    };
    
    // Add itineraries to the map
    this.itineraries.set(dubaiLuxuryItinerary.id, dubaiLuxuryItinerary);
    this.itineraries.set(thailandBackpackingItinerary.id, thailandBackpackingItinerary);
    this.itineraries.set(singaporeFamilyItinerary.id, singaporeFamilyItinerary);
    
    // Sample testimonials
    const testimonial1: Testimonial = {
      id: this.testimonialId++,
      name: "Sarah J.",
      destination: "Dubai, UAE Trip",
      rating: 5,
      comment: "A seamless experience! Booking our Dubai trip was effortless, and every detail was perfectly curated. The desert safari and Burj Khalifa VIP experience were highlights we'll never forget.",
      date: "March 2023",
      avatarImage: "https://randomuser.me/api/portraits/women/32.jpg"
    };
    
    const testimonial2: Testimonial = {
      id: this.testimonialId++,
      name: "Michael T.",
      destination: "Thailand Adventure",
      rating: 4,
      comment: "The Thailand itinerary perfectly balanced adventure and relaxation. From street food tours in Bangkok to secluded beaches in Krabi, every recommendation was spot on. Can't wait to book my next trip!",
      date: "January 2023",
      avatarImage: "https://randomuser.me/api/portraits/men/47.jpg"
    };
    
    const testimonial3: Testimonial = {
      id: this.testimonialId++,
      name: "Priya K.",
      destination: "Singapore Family Trip",
      rating: 5,
      comment: "Traveling with two young children can be challenging, but our Singapore family itinerary made everything so easy! The kids loved Universal Studios and the Night Safari, while we adults appreciated the perfectly timed schedule.",
      date: "December 2022",
      avatarImage: "https://randomuser.me/api/portraits/women/63.jpg"
    };
    
    // Add testimonials to the map
    this.testimonials.set(testimonial1.id, testimonial1);
    this.testimonials.set(testimonial2.id, testimonial2);
    this.testimonials.set(testimonial3.id, testimonial3);
  }
}

export const storage = new MemStorage();
