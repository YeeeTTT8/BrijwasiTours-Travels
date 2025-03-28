import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/home/hero-section";
import DestinationsGrid from "@/components/home/destinations-grid";
import DestinationFeature from "@/components/home/destination-feature";
import TestimonialsCarousel from "@/components/home/testimonials-carousel";
import BookingCTA from "@/components/home/booking-cta";
import { ConsultationForm } from "@/components/consultation/consultation-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type Destination } from "@/types";

export default function HomePage() {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  return (
    <div className="overflow-hidden">
      <HeroSection />
      
      <section id="destinations" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked collection of breathtaking destinations across Southeast Asia and the Middle East
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <Skeleton className="h-64 w-full" />
                  <div className="p-5 space-y-4">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load destinations. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <DestinationsGrid destinations={destinations || []} />
          )}
        </div>
      </section>
      
      {/* Book Your Trip Section with Floating Card */}
      {destinations && (
        <BookingCTA 
          destinations={destinations.map(dest => dest.name)} 
        />
      )}
      
      {destinations && destinations.length > 0 && (
        <DestinationFeature destination={destinations[0]} />
      )}
      
      <section id="testimonials" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">Traveler Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from travelers who have experienced unforgettable journeys with us
            </p>
          </div>
          
          <TestimonialsCarousel />
        </div>
      </section>
      
      <section id="consultation" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="bg-primary/10 rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full h-full">
              <svg 
                className="absolute top-0 right-0 h-full w-full text-primary/5" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                fill="currentColor"
              >
                <polygon points="0,0 100,0 100,100" />
              </svg>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 p-8 md:p-12">
              <div className="animate-in slide-in-from-left duration-700">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-dark">
                  Need Help Planning Your Next Trip?
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our travel experts are here to craft your perfect itinerary. Get personalized advice, insider tips, and a custom travel plan tailored to your preferences.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Personalized recommendations based on your interests</p>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Expert advice on accommodations, activities and dining</p>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Insider tips to make the most of your journey</p>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">100% free consultation, no obligation</p>
                  </div>
                </div>
                
                <a 
                  href="/consultation" 
                  className="bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                >
                  <span>Schedule a Call</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 group-hover:animate-pulse" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-in slide-in-from-right duration-700 hover:shadow-xl transition-shadow">
                <h3 className="font-heading font-semibold text-xl mb-6">Book Your Free Consultation</h3>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
