import { Link } from "wouter";
import { type Destination } from "@/types";

interface DestinationsGridProps {
  destinations: Destination[];
}

export default function DestinationsGrid({ destinations }: DestinationsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <div 
          key={destination.id}
          className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
        >
          <div className="h-64 overflow-hidden relative">
            <img 
              src={destination.mainImage}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h3 className="absolute bottom-4 left-4 text-white font-heading font-bold text-2xl">{destination.name}</h3>
          </div>
          <div className="p-5">
            <p className="text-gray-700 mb-4">{destination.shortDescription}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {destination.attractions.slice(0, 4).map((attraction, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{attraction}</span>
              ))}
            </div>
            <Link href={`/destinations/${destination.slug}`}>
              <a className="text-primary font-semibold hover:text-accent transition-colors flex items-center">
                Explore {destination.name}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
