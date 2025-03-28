import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { type HeroImage } from "@/types";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero images for the slider
  const heroImages: HeroImage[] = [
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080",
      alt: "Dubai skyline with Burj Khalifa"
    },
    {
      src: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080",
      alt: "Thailand Phi Phi Islands"
    },
    {
      src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080",
      alt: "Marina Bay Sands Singapore"
    },
    {
      src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080",
      alt: "Bali beaches and temples"
    }
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Hero Image Slider */}
      <div className="relative h-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: index === currentSlide ? 1 : 0 }}
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Discover Your Dream Getaway
          </h1>
          <p className="font-body text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Unforgettable Experiences in Dubai, Thailand, Singapore and More!
          </p>
          <Link href="#destinations">
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold py-3 px-8 rounded-md text-lg transition-colors inline-block">
              Explore Destinations
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Navigation Dots */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-30">
        {heroImages.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/70 hover:bg-white"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`View slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
