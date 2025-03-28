import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location === path;
  };
  
  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-primary font-heading font-bold text-2xl">
          TravelEase
        </Link>
        
        <div className="hidden md:flex space-x-6 text-dark">
          <Link 
            href="/#destinations"
            className={cn("hover:text-primary transition-colors", {
              "text-primary": isActive("/#destinations")
            })}
          >
            Destinations
          </Link>
          <Link 
            href="/itinerary-builder"
            className={cn("hover:text-primary transition-colors", {
              "text-primary": isActive("/itinerary-builder")
            })}
          >
            Itineraries
          </Link>
          <Link 
            href="/#testimonials"
            className={cn("hover:text-primary transition-colors", {
              "text-primary": isActive("/#testimonials")
            })}
          >
            Testimonials
          </Link>
          <Link 
            href="/#consultation"
            className={cn("hover:text-primary transition-colors", {
              "text-primary": isActive("/#consultation")
            })}
          >
            Contact
          </Link>
        </div>
        
        <div className="hidden md:block">
          <Link href="/consultation">
            <Button className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors">
              Book Consultation
            </Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-dark text-xl"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("md:hidden bg-white shadow-md", {
        "hidden": !mobileMenuOpen
      })}>
        <div className="px-4 py-3 space-y-2">
          <Link 
            href="/#destinations"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Destinations
          </Link>
          <Link 
            href="/itinerary-builder"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Itineraries
          </Link>
          <Link 
            href="/#testimonials"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="/#consultation"
            className="block py-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/consultation"
            className="block bg-primary text-white py-2 px-4 rounded-md text-center mt-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}
