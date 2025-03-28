import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const slidesPerView = typeof window !== 'undefined' ? 
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3 : 3;
  
  const totalSlides = testimonials ? Math.ceil(testimonials.length / slidesPerView) : 0;
  
  // Intersection Observer to detect when carousel is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.2 }
    );
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplayActive || !isInView || testimonials?.length === 0 || !totalSlides) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev < totalSlides - 1 ? prev + 1 : 0
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplayActive, testimonials, totalSlides, isInView]);
  
  // Mouse enter/leave handlers for cards
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setAutoplayActive(false);
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setAutoplayActive(true);
  };
  
  // Move to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
    setAutoplayActive(false);
    setTimeout(() => setAutoplayActive(true), 5000);
  };
  
  // Move to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
    setAutoplayActive(false);
    setTimeout(() => setAutoplayActive(true), 5000);
  };
  
  // Get flag emoji for country
  const getCountryFlag = (country: string): string => {
    const countryMap: Record<string, string> = {
      'UAE': '🇦🇪',
      'Thailand': '🇹🇭',
      'Singapore': '🇸🇬',
      'Vietnam': '🇻🇳',
      'Indonesia': '🇮🇩',
      'Malaysia': '🇲🇾',
      'Japan': '🇯🇵'
    };
    
    for (const [key, flag] of Object.entries(countryMap)) {
      if (country.includes(key)) {
        return flag;
      }
    }
    
    // Default flag if no match found
    return '🌍';
  };
  
  if (isLoading) {
    return (
      <div className="relative py-8">
        <div className="flex gap-4">
          {[...Array(slidesPerView)].map((_, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full border border-gray-100">
                <div className="flex items-center mb-6">
                  <Skeleton className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <Skeleton className="h-3 w-24 mt-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !testimonials || testimonials.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load testimonials. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden pb-16" 
      id="testimonial-carousel"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="testimonial-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testimonial-dots)" />
          </svg>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div 
        className="flex transition-transform duration-700 ease-out relative"
        style={{ transform: `translateX(-${currentSlide * 100 / slidesPerView}%)` }}
      >
        {testimonials.map((testimonial, index) => {
          const isHovered = hoveredIndex === index;
          const isVisible = Math.floor(index / slidesPerView) === currentSlide;
          
          return (
            <div 
              key={testimonial.id}
              className={cn(
                "w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 transition-opacity duration-500",
                isVisible ? "opacity-100" : "opacity-50"
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={cn(
                "bg-white rounded-xl p-7 h-full flex flex-col transition-all duration-300 relative",
                isHovered 
                  ? "shadow-xl scale-105 z-10" 
                  : "shadow-md hover:shadow-lg"
              )}>
                {/* Quote mark */}
                <div className="absolute -top-2 -left-2 text-primary/10 text-5xl font-serif opacity-80">
                  "
                </div>
                
                {/* User info with staggered entrance */}
                <div className={cn(
                  "flex items-center mb-5 transition-transform duration-500",
                  isHovered ? "transform translate-y-0" : "transform translate-y-0"
                )}>
                  <div className="relative">
                    <img 
                      src={testimonial.avatarImage}
                      alt={testimonial.name}
                      className={cn(
                        "w-16 h-16 rounded-full object-cover border-2 shadow-sm transition-all duration-300",
                        isHovered ? "border-primary" : "border-gray-200"
                      )}
                    />
                    <span className="absolute -top-1 -right-1 text-lg">
                      {getCountryFlag(testimonial.destination)}
                    </span>
                  </div>
                  
                  <div className="ml-4">
                    <h4 className={cn(
                      "font-semibold text-lg transition-colors duration-300",
                      isHovered ? "text-primary" : "text-gray-800"
                    )}>{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.destination}
                    </p>
                  </div>
                </div>
                
                {/* Star rating */}
                <div className={cn(
                  "flex mb-4 transition-all duration-500 ease-out", 
                  isHovered ? "text-yellow-400 scale-110 origin-left" : "text-secondary"
                )}>
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={cn(
                        "h-5 w-5 transition-transform",
                        isHovered && i < testimonial.rating ? "animate-pulse-slow" : ""
                      )}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={i < testimonial.rating ? 0 : 2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                
                {/* Comment with reveal animation */}
                <div className="relative overflow-hidden flex-grow">
                  <p className={cn(
                    "text-gray-700 italic leading-relaxed transition-all duration-500",
                    isHovered ? "text-black" : "text-gray-600"
                  )}>
                    "{testimonial.comment}"
                  </p>
                </div>
                
                {/* Travel date */}
                <div className={cn(
                  "flex items-center mt-5 pt-4 text-xs text-gray-500 border-t border-gray-100 transition-all duration-300",
                  isHovered ? "text-gray-700 border-gray-200" : ""
                )}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1 text-primary/60" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Traveled: {testimonial.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Carousel Controls */}
      {testimonials.length > slidesPerView && (
        <>
          <button 
            className={cn(
              "absolute top-1/2 left-4 -translate-y-1/2 bg-white hover:bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-primary/50",
              currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            )}
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={cn(
              "absolute top-1/2 right-4 -translate-y-1/2 bg-white hover:bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-primary/50",
              currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            )}
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Carousel Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-3">
          {[...Array(totalSlides)].map((_, index) => (
            <button 
              key={index}
              className={cn(
                "transition-all duration-300 focus:outline-none",
                index === currentSlide 
                  ? "w-8 h-3 bg-primary rounded-full" 
                  : "w-3 h-3 bg-gray-300 hover:bg-primary/30 rounded-full hover:scale-110"
              )}
              onClick={() => {
                setCurrentSlide(index);
                setAutoplayActive(false);
                setTimeout(() => setAutoplayActive(true), 5000);
              }}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
      
      {/* Autoplay indicator */}
      <div className="absolute bottom-4 right-4 flex items-center text-xs text-gray-500">
        <button
          onClick={() => setAutoplayActive(!autoplayActive)}
          className="flex items-center focus:outline-none group"
          aria-label={autoplayActive ? "Pause autoplay" : "Start autoplay"}
        >
          {autoplayActive ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="group-hover:text-gray-700 transition-colors">Auto</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary group-hover:text-primary/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="group-hover:text-gray-700 transition-colors">Play</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
