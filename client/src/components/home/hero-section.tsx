import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { type HeroImage } from "@/types";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero images for the slider with higher quality versions
  const heroImages: HeroImage[] = [
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&h=1200&q=90",
      alt: "Dubai skyline with Burj Khalifa"
    },
    {
      src: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&h=1200&q=90",
      alt: "Thailand Phi Phi Islands"
    },
    {
      src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&h=1200&q=90",
      alt: "Marina Bay Sands Singapore"
    },
    {
      src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&h=1200&q=90",
      alt: "Bali beaches and temples"
    }
  ];
  
  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = window.scrollY;
        containerRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Auto-slide functionality with transition animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating) {
        setAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        setTimeout(() => setAnimating(false), 1000);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [heroImages.length, animating]);
  
  // Handle manual slide change
  const changeSlide = (index: number) => {
    if (!animating && index !== currentSlide) {
      setAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setAnimating(false), 1000);
    }
  };
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/30 z-10"></div>
      
      {/* Hero Image Slider with Parallax */}
      <div ref={containerRef} className="relative h-[120%] -top-[10%] overflow-hidden">
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-1500 scale-[1.01]",
              { 
                "opacity-100 scale-100": index === currentSlide,
                "opacity-0 scale-110": index !== currentSlide 
              }
            )}
            style={{ 
              zIndex: index === currentSlide ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" 
            }}
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full transform scale-[1.05]"
            />
          </div>
        ))}
      </div>
      
      {/* Text Content with Animations */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h1 
            className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight drop-shadow-lg animate-in slide-in-from-bottom duration-1000"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Discover Your Dream Getaway
          </h1>
          <p 
            className="font-body text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto opacity-90 drop-shadow-md animate-in slide-in-from-bottom delay-300 duration-1000"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Unforgettable Experiences in Dubai, Thailand, Singapore and More!
          </p>
          <div className="animate-in slide-in-from-bottom delay-500 duration-1000 mt-4">
            <Link href="#destinations" className="inline-block">
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-white font-heading font-semibold py-5 px-12 rounded-md text-lg transition-all inline-block shadow-xl hover:shadow-2xl hover:scale-105 group relative overflow-hidden transform hover:-translate-y-1"
                size="lg"
              >
                <span className="relative z-10">Explore Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-secondary w-full h-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                <span className="absolute w-full h-full inset-0 animate-pulse-slow opacity-0 group-hover:opacity-100 bg-white/10 rounded-md"></span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Hero Navigation Dots */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-30">
        {heroImages.map((_, index) => (
          <button 
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 hover:scale-125",
              index === currentSlide 
                ? "bg-white w-5" 
                : "bg-white/60 hover:bg-white"
            )}
            onClick={() => changeSlide(index)}
            aria-label={`View slide ${index + 1}`}
            disabled={animating}
          ></button>
        ))}
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
