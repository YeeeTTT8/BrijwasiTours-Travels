import { type Destination } from "@/types";

interface DestinationHeaderProps {
  destination: Destination;
}

export default function DestinationHeader({ destination }: DestinationHeaderProps) {
  return (
    <div className="relative pt-16">
      <div className="h-96 overflow-hidden">
        <img 
          src={destination.bannerImage}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-white container mx-auto px-4">
        <h1 className="font-heading font-bold text-4xl md:text-5xl">{destination.name}</h1>
        <p className="text-xl mt-2 max-w-2xl">{destination.shortDescription}</p>
      </div>
    </div>
  );
}
