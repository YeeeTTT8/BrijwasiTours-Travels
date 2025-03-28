import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { type Destination, type Itinerary } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import DestinationHeader from "@/components/destination/destination-header";
import AttractionList from "@/components/destination/attraction-list";
import { SampleItineraries } from "@/components/itinerary/sample-itineraries";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DestinationPage() {
  const [, params] = useRoute<{ slug: string }>("/destinations/:slug");
  const slug = params?.slug;
  
  const { data: destination, isLoading: isDestinationLoading, error: destinationError } = useQuery<Destination>({
    queryKey: [`/api/destinations/${slug}`],
    enabled: !!slug
  });
  
  const { data: itineraries, isLoading: isItinerariesLoading } = useQuery<Itinerary[]>({
    queryKey: [`/api/destinations/${destination?.id}/itineraries`],
    enabled: !!destination?.id
  });
  
  if (isDestinationLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-12 w-2/3 mb-4" />
        <Skeleton className="h-24 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  
  if (destinationError || !destination) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load destination. Please try again later.
          </AlertDescription>
        </Alert>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <DestinationHeader destination={destination} />
      
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img 
                  src={destination.bannerImage}
                  alt={`${destination.name} panoramic view`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Experience {destination.name}</h2>
                <p className="text-lg text-gray-700 mb-6">
                  {destination.fullDescription}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">Must-Visit Attractions</h4>
                      <AttractionList attractions={destination.attractions} />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">Travel Tips</h4>
                      <ul className="text-gray-600">
                        {destination.travelTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Link href="/itinerary-builder">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-heading font-semibold py-3 px-6 rounded-md inline-block transition-colors self-start">
                    Plan Your {destination.name} Trip
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {isItinerariesLoading ? (
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-2/3 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      ) : itineraries && itineraries.length > 0 ? (
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-3">
                {destination.name} Itineraries
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our carefully crafted itineraries for your {destination.name} adventure
              </p>
            </div>
            
            <SampleItineraries itineraries={itineraries} />
            
            <div className="text-center mt-12">
              <Link href="/itinerary-builder">
                <Button className="bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold py-3 px-8 rounded-md inline-block transition-colors">
                  Create Your Custom Itinerary
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
