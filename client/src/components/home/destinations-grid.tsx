import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { type Destination } from "@/types";
import { cn } from "@/lib/utils";

interface DestinationsGridProps {
  destinations: Destination[];
}

export default function DestinationsGrid({ destinations }: DestinationsGridProps) {
  const [inView, setInView] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            if (!inView.includes(id)) {
              setInView(prev => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const cards = document.querySelectorAll('.destination-card');
    cards.forEach(card => observer.observe(card));
    
    return () => observer.disconnect();
  }, [destinations, inView]);
  
  return (
    <div 
      ref={gridRef} 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
    >
      {destinations.map((destination, index) => {
        const isVisible = inView.includes(destination.id);
        const delay = index * 150; // Staggered animation delay
        
        return (
          <div 
            key={destination.id}
            data-id={destination.id}
            className={cn(
              "destination-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white group relative transform",
              isVisible 
                ? "translate-y-0 opacity-100" 
                : "translate-y-10 opacity-0"
            )}
            style={{ 
              transitionDelay: `${delay}ms`,
              transitionProperty: "transform, opacity, box-shadow"
            }}
          >
            <div className="h-80 overflow-hidden relative">
              <img 
                src={destination.mainImage}
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Glowing Overlay Effect */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"></div>
              
              {/* Destination Name */}
              <div className="absolute bottom-0 inset-x-0 p-6 transform transition-transform duration-500">
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white drop-shadow-md mb-2">
                  {destination.name}
                </h3>
                
                {/* Info that appears on hover */}
                <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
                  <div className="pt-3 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-primary/80 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                        Top Attractions
                      </span>
                      <span className="bg-secondary/80 text-white text-xs py-1 px-3 rounded-full backdrop-blur-sm">
                        Best Time to Visit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4 line-clamp-2">{destination.shortDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {destination.attractions.slice(0, 3).map((attraction, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gray-100 hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors duration-300"
                  >
                    {attraction}
                  </span>
                ))}
                {destination.attractions.length > 3 && (
                  <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                    +{destination.attractions.length - 3} more
                  </span>
                )}
              </div>
              
              <Link 
                href={`/destinations/${destination.slug}`}
                className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center group/link"
              >
                <span className="mr-2 relative">
                  Explore {destination.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300"></span>
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
