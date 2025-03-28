import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Itinerary, type Destination } from "@/types";

interface SampleItinerariesProps {
  itineraries: Itinerary[];
}

export function SampleItineraries({ itineraries }: SampleItinerariesProps) {
  const { data: destinations } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });
  
  // Helper function to get destination name by id
  const getDestinationName = (destinationId: number) => {
    const destination = destinations?.find(d => d.id === destinationId);
    return destination ? destination.name : "Unknown Destination";
  };
  
  // Helper function to get destination slug by id
  const getDestinationSlug = (destinationId: number) => {
    const destination = destinations?.find(d => d.id === destinationId);
    return destination ? destination.slug : "";
  };
  
  // Helper function to get budget class color
  const getBudgetClass = (budgetLevel: string) => {
    switch (budgetLevel) {
      case "Budget-friendly":
        return "bg-green-100 text-green-700";
      case "Moderate":
        return "bg-blue-100 text-blue-700";
      case "Luxury":
        return "bg-secondary/10 text-secondary";
      case "Ultra-luxury":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  
  return (
    <div className="space-y-6">
      {itineraries.map((itinerary) => (
        <div 
          key={itinerary.id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src={itinerary.image}
                alt={itinerary.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-heading font-bold text-lg">{itinerary.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBudgetClass(itinerary.budgetLevel)}`}>
                  {itinerary.budgetLevel}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{itinerary.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {itinerary.highlights.map((highlight, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {highlight}
                  </span>
                ))}
              </div>
              <Link 
                href={`/destinations/${getDestinationSlug(itinerary.destinationId)}`}
                className="text-primary font-semibold hover:text-accent transition-colors text-sm flex items-center"
              >
                View Full Itinerary
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
