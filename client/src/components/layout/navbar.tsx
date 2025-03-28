import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/95 shadow-md backdrop-blur-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          href="/" 
          className={cn(
            "font-heading font-bold text-2xl transition-colors duration-300",
            scrolled ? "text-primary" : "text-white"
          )}
        >
          <span className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 mr-2 animate-bounce-slow" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            TravelEase
          </span>
        </Link>
        
        <div className={cn(
          "hidden md:flex space-x-8 font-medium",
          scrolled ? "text-gray-800" : "text-white"
        )}>
          <Link 
            href="/#destinations"
            className={cn(
              "group relative py-2 font-semibold",
              isActive("/#destinations") ? "text-primary" : "hover:text-primary transition-colors"
            )}
          >
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              Destinations
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
          
          <Link 
            href="/itinerary-builder"
            className={cn(
              "group relative py-2 font-semibold",
              isActive("/itinerary-builder") ? "text-primary" : "hover:text-primary transition-colors"
            )}
          >
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
                />
              </svg>
              Itineraries
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
          
          <Link 
            href="/#testimonials"
            className={cn(
              "group relative py-2 font-semibold",
              isActive("/#testimonials") ? "text-primary" : "hover:text-primary transition-colors"
            )}
          >
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
              Testimonials
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
          
          <Link 
            href="/#consultation"
            className={cn(
              "group relative py-2 font-semibold",
              isActive("/#consultation") ? "text-primary" : "hover:text-primary transition-colors"
            )}
          >
            <span className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1.5 group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              Contact
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-in-out"></span>
          </Link>
        </div>
        
        <div className="hidden md:block">
          <Link href="/consultation">
            <Button 
              className={cn(
                "group overflow-hidden relative transition-all duration-300",
                scrolled ? "bg-primary text-white" : "bg-white/90 hover:bg-white text-primary"
              )}
            >
              <span className="flex items-center relative z-10 font-semibold">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1.5 group-hover:animate-ping" 
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
                Book Now
              </span>
              <span className={cn(
                "absolute inset-0 w-full h-full transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
                scrolled ? "bg-primary/80" : "bg-white"
              )}></span>
            </Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className={cn(
            "md:hidden text-2xl z-50 relative",
            scrolled || mobileMenuOpen ? "text-primary" : "text-white"
          )}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu - Sliding drawer */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col px-6 py-20 h-full">
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Navigation</h3>
            <div className="h-1 w-10 bg-primary rounded-full"></div>
          </div>
          
          <Link 
            href="/#destinations"
            className="flex items-center py-3 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            Destinations
          </Link>
          
          <Link 
            href="/itinerary-builder"
            className="flex items-center py-3 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
            Itineraries
          </Link>
          
          <Link 
            href="/#testimonials"
            className="flex items-center py-3 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
              />
            </svg>
            Testimonials
          </Link>
          
          <Link 
            href="/#consultation"
            className="flex items-center py-3 text-gray-700 hover:text-primary transition-colors border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
            Contact
          </Link>
          
          <div className="mt-8">
            <Link 
              href="/consultation"
              className="block bg-primary text-white py-3 px-4 rounded-md text-center font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
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
                Book Consultation
              </span>
            </Link>
          </div>
          
          <div className="mt-auto mb-6 text-center">
            <p className="text-gray-500 text-sm">© 2025 TravelEase</p>
            <p className="text-gray-400 text-xs mt-1">Explore · Experience · Enjoy</p>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
}
