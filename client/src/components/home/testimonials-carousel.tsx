import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { type Testimonial } from "@/types";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const slidesPerView =
    typeof window !== "undefined"
      ? window.innerWidth < 768
        ? 1
        : window.innerWidth < 1024
        ? 2
        : 3
      : 3;
  const totalSlides = testimonials
    ? Math.ceil(testimonials.length / slidesPerView)
    : 0;

  // Observe when it comes into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (carouselRef.current) obs.observe(carouselRef.current);
    return () => obs.disconnect();
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplayActive || !isInView || totalSlides < 2) return;
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(id);
  }, [autoplayActive, isInView, totalSlides]);

  const handleMouseEnter = (i: number) => {
    setHoveredIndex(i);
    setAutoplayActive(false);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setAutoplayActive(true);
  };
  const prevSlide = () => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    setAutoplayActive(false);
  };
  const nextSlide = () => {
    setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1));
    setAutoplayActive(false);
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex gap-4">
          {[...Array(slidesPerView)].map((_, i) => (
            <div key={i} className="w-full flex-shrink-0 px-4">
              <Skeleton className="h-64" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error || !testimonials?.length) {
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
    <>
      {/* Carousel */}
      <div
        ref={carouselRef}
        className="relative overflow-hidden pb-16"
        id="testimonial-carousel"
      >
        {/* Subtle dotted-pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Slides */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${(currentSlide * 100) / slidesPerView}%)`,
          }}
        >
          {testimonials.map((t, idx) => {
            const isHovered = hoveredIndex === idx;
            const isVisible =
              Math.floor(idx / slidesPerView) === currentSlide;
            return (
              <div
                key={t.id}
                className={cn(
                  "w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 transition-opacity duration-500",
                  isVisible ? "opacity-100" : "opacity-50"
                )}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={cn(
"bg-white rounded-xl p-7 h-full flex flex-col transition-all duration-300 relative",
    isHovered 
      ? "shadow-xl scale-105 z-10"
      : "shadow-md hover:shadow-lg"

                  )}
                >
                  <div className="absolute -top-2 -left-2 text-primary/10 text-5xl font-serif opacity-80">
                    “
                  </div>
                  <div className="flex items-center mb-5">
                    <img
                      src={t.avatarImage}
                      alt={t.name}
                      className={cn(
                        "w-16 h-16 rounded-full object-cover border-2",
                        isHovered ? "border-primary" : "border-gray-200"
                      )}
                    />
                    <div className="ml-4">
                      <h4
                        className={cn(
                          "font-semibold text-lg",
                          isHovered ? "text-primary" : "text-gray-800"
                        )}
                      >
                        {t.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {t.destination}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic flex-grow">
                    {t.comment}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-primary/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Traveled: {t.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prev / Next */}
        {totalSlides > 1 && (
          <>
            <button
              className={cn(
                "absolute top-1/2 left-4 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center",
                currentSlide === 0 && "opacity-50 cursor-not-allowed"
              )}
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            <button
              className={cn(
                "absolute top-1/2 right-4 -translate-y-1/2 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center",
                currentSlide === totalSlides - 1 &&
                  "opacity-50 cursor-not-allowed"
              )}
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
            >
              ›
            </button>
          </>
        )}

        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === currentSlide
                    ? "w-8 h-2 bg-primary"
                    : "w-3 h-3 bg-gray-300 hover:bg-primary/50"
                )}
                onClick={() => {
                  setCurrentSlide(i);
                  setAutoplayActive(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ——— Centered CTA below carousel ——— */}
      <div className="text-center mt-12">
        <Link href="/consultation">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4">
            Book Your Free Consultation
          </Button>
        </Link>
      </div>
    </>
  );
}
