import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ItineraryForm } from "@/components/itinerary/itinerary-form";
import { SampleItineraries } from "@/components/itinerary/sample-itineraries";
import { type Destination, type Itinerary, type ItineraryFormData } from "@/types";

export default function ItineraryBuilderPage() {
  const [formData, setFormData] = useState<ItineraryFormData | null>(null);
  
  const { data: destinations, isLoading: isDestinationsLoading, error: destinationsError } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });
  
  const { data: allItineraries, isLoading: isItinerariesLoading, error: itinerariesError } = useQuery<Itinerary[]>({
    queryKey: ["/api/itineraries"],
  });
  
  // Filter itineraries based on form data
  const filteredItineraries = allItineraries && formData ? 
    allItineraries.filter((itinerary) => {
      const destinationMatch = formData.destination === "all" || 
        destinations?.find(d => d.id === itinerary.destinationId)?.slug === formData.destination;
      
      const durationMatch = formData.duration === "any" || itinerary.duration === formData.duration;
      const budgetMatch = formData.budget === "any" || itinerary.budgetLevel === formData.budget;
      
      const stylesMatch = formData.travelStyles.length === 0 || 
        formData.travelStyles.some(style => itinerary.travelStyle.includes(style));
      
      return destinationMatch && durationMatch && budgetMatch && stylesMatch;
    }) : 
    allItineraries;
  
  const isLoading = isDestinationsLoading || isItinerariesLoading;
  const error = destinationsError || itinerariesError;
  
  return (
    <div>
      <div className="bg-primary/10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Customize Your Dream Itinerary</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Build your perfect travel plan with our interactive itinerary builder, tailored to your preferences
          </p>
        </div>
      </div>
      
      <section id="itineraries" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <Skeleton className="h-8 w-1/2 mb-6" />
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <Skeleton className="h-8 w-1/2 mb-6" />
                  <div className="space-y-6">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <h3 className="font-heading font-bold text-xl mb-4">Design Your Journey</h3>
                  <ItineraryForm 
                    destinations={destinations || []} 
                    onSubmit={setFormData} 
                  />
                </div>
                
                <div className="lg:col-span-2">
                  <h3 className="font-heading font-bold text-xl mb-4">
                    {formData ? "Your Personalized Itineraries" : "Sample Itineraries"}
                  </h3>
                  
                  {filteredItineraries && filteredItineraries.length > 0 ? (
                    <SampleItineraries itineraries={filteredItineraries} />
                  ) : (
                    <div className="bg-white rounded-lg p-8 text-center">
                      <h4 className="font-heading font-semibold text-lg mb-2">No itineraries match your criteria</h4>
                      <p className="text-gray-600 mb-4">Try adjusting your filters to see more options</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
