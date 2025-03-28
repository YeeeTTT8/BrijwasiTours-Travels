import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type Testimonial } from "@/types";

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  const slidesPerView = typeof window !== 'undefined' ? 
    window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3 : 3;
  
  const totalSlides = testimonials ? Math.ceil(testimonials.length / slidesPerView) : 0;
  
  // Move to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  };
  
  // Move to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };
  
  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex gap-4">
          {[...Array(slidesPerView)].map((_, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="flex items-center mb-4">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-20 w-full" />
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
    <div className="relative overflow-hidden" id="testimonial-carousel">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100 / slidesPerView}%)` }}
      >
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className={`w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4`}
          >
            <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatarImage}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.destination}</p>
                </div>
              </div>
              
              <div className="flex text-secondary mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill={i < testimonial.rating ? "currentColor" : "none"}
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={i < testimonial.rating ? 0 : 2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-700 italic flex-grow">
                "{testimonial.comment}"
              </p>
              
              <p className="text-xs text-gray-500 mt-4">Traveled: {testimonial.date}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Carousel Controls */}
      {testimonials.length > slidesPerView && (
        <>
          <button 
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors z-10"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors z-10"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Carousel Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-primary" : "bg-gray-300 hover:bg-primary/50 transition-colors"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
