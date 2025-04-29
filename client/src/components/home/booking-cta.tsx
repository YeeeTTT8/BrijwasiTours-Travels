import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface BookingCTAProps {
  destinations: string[];
}

export default function BookingCTA({ destinations }: BookingCTAProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Options for the form selections
  const budgetOptions = [
    { label: "Budget-friendly", value: "budget" },
    { label: "Moderate", value: "moderate" },
    { label: "Luxury", value: "luxury" },
    { label: "Ultra-luxury", value: "ultra-luxury" }
  ];
  
  const travelStyleOptions = [
    { label: "Adventure", value: "adventure" },
    { label: "Cultural", value: "cultural" },
    { label: "Relaxation", value: "relaxation" },
    { label: "Food & Culinary", value: "culinary" },
    { label: "Shopping", value: "shopping" }
  ];
  
  // Form state
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  
  // Intersection Observer to animate on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process booking request
    console.log({ destination, travelDate, budget, travelStyle });
    // In a real application, you would send this data to your backend
  };
  
  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-4 bg-gradient-to-br from-primary/5 via-white to-secondary/5 relative overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="dotPattern" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.03)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </div>
      
      <div className={cn(
        "container mx-auto transition-all duration-1000 transform",
        isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            Book Your Dream <span className="text-primary">Trip Today</span>
          </h2>
          <p className="text-lg text-gray-600">
            Let us take you on an unforgettable journey to the most beautiful 
            destinations in Southeast Asia and the Middle East.
          </p>
        </div>
        
        <div className={cn(
          "max-w-5xl mx-auto relative transition-all duration-1000 delay-300",
          isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
          {/* Floating Card with Booking Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 relative z-10 overflow-hidden">
            {/* Card background pattern */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/5 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-secondary/5 rounded-full"></div>
            
            <h3 className="text-2xl font-semibold mb-6 relative z-10">Plan Your Perfect Vacation</h3>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    Where would you like to go?
                  </label>
                  <div className="relative">
                    <select 
                      id="destination" 
                      value={destination} 
                      onChange={(e) => setDestination(e.target.value)}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 pr-10 shadow-sm 
+      focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 
+      bg-white appearance-none"
                      required
                    >
                      <option value="">Select a destination</option>
                      {destinations.map((dest, index) => (
                        <option key={index} value={dest}>{dest}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">
                    When are you planning to travel?
                  </label>
                  <input 
                    type="date" 
                    id="travelDate" 
                    value={travelDate} 
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="block w-full rounded-md border-gray-300 py-3 px-4 pr-10 shadow-sm 
+      focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 
+      bg-white appearance-none"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    What's your budget?
                  </label>
                  <div className="relative">
                    <select 
                      id="budget" 
                      value={budget} 
                      onChange={(e) => setBudget(e.target.value)}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 pr-10 shadow-sm 
+      focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 
+      bg-white appearance-none"
                      required
                    >
                      <option value="">Select your budget</option>
                      {budgetOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="travelStyle" className="block text-sm font-medium text-gray-700 mb-1">
                    What's your travel style?
                  </label>
                  <div className="relative">
                    <select 
                      id="travelStyle" 
                      value={travelStyle} 
                      onChange={(e) => setTravelStyle(e.target.value)}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 pr-10 shadow-sm 
+      focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50 
+      bg-white appearance-none"
                      required
                    >
                      <option value="">Select your travel style</option>
                      {travelStyleOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-10 rounded-md text-lg transition-all inline-flex items-center justify-center group relative overflow-hidden shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" 
                      />
                    </svg>
                    Find Your Perfect Trip
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary via-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Button>
              </div>
            </form>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary/20 rounded-full animate-bounce-slow delay-1000"></div>
        </div>
        
        {/* Travel Types */}
        <div className={cn(
          "mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-500",
          isInView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Adventure Travel</h3>
            <p className="text-gray-600">From trekking through lush jungles to scaling breathtaking peaks.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Luxury Escapes</h3>
            <p className="text-gray-600">Experience opulence and comfort with our premium five-star packages.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Cultural Immersion</h3>
            <p className="text-gray-600">Connect with local traditions, cuisine, and authentic experiences.</p>
          </div>
        </div>
      </div>
    </section>
  );
}