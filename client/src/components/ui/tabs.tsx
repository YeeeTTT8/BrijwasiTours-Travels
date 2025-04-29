// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  // shrink navbar on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // toggle mobile drawer
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  // If already on “/”, scrollIntoView. Otherwise navigate to "/#id"
  function scrollToSection(id: string) {
    if (location === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      setLocation(`/#${id}`);
    }
    setMobileMenuOpen(false);
  }

  // helper to mark active link
  const isActive = (path: string) => location === path;

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
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-heading font-bold text-2xl transition-colors duration-300",
            scrolled ? "text-primary" : "text-white"
          )}
        >
          <span className="flex items-center">
            {/* replace with your SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 mr-2 animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3.055 11H5a2 2…"/>
            </svg>
            Brijwasi Tours & Travels
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className={cn(
            "hidden md:flex space-x-8 font-medium",
            scrolled ? "text-gray-800" : "text-white"
          )}
        >
          <button
            onClick={() => scrollToSection("destinations")}
            className="group relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Destinations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>

          <Link
            href="/itinerary-builder"
            className={cn(
              "group relative py-2 font-semibold",
              isActive("/itinerary-builder")
                ? "text-primary"
                : "hover:text-primary transition-colors"
            )}
          >
            Itineraries
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>

          <button
            onClick={() => scrollToSection("testimonials")}
            className="group relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollToSection("consultation")}
            className="group relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>
        </div>

        {/* Book Now CTA */}
        <div className="hidden md:block">
          <Link href="/consultation">
            <Button
              className={cn(
                "group overflow-hidden relative transition-all duration-300",
                scrolled
                  ? "bg-primary text-white"
                  : "bg-white/90 hover:bg-white text-primary"
              )}
            >
              <span className="flex items-center relative z-10 font-semibold">
                {/* calendar icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5 group-hover:animate-ping"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10…"/>
                </svg>
                Book Now
              </span>
              <span
                className={cn(
                  "absolute inset-0 w-full h-full transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
                  scrolled ? "bg-primary/80" : "bg-white"
                )}
              />
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className={cn(
            "md:hidden text-2xl z-50 relative",
            scrolled || mobileMenuOpen ? "text-primary" : "text-white"
          )}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg /* X icon *//>
          ) : (
            <svg /* Hamburger icon *//>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col px-6 py-20 h-full">
          <button
            onClick={() => setLocation("/")}
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("destinations")}
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
          >
            Destinations
          </button>
          <Link
            href="/itinerary-builder"
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Itineraries
          </Link>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("consultation")}
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
          >
            Contact
          </button>

          <div className="mt-8">
            <Link
              href="/consultation"
              className="block bg-primary text-white py-3 px-4 rounded-md text-center font-semibold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Consultation
            </Link>
          </div>

          <div className="mt-auto mb-6 text-center">
            <p className="text-gray-500 text-sm">© 2025 Brijwasi Tours & Travels</p>
            <p className="text-gray-400 text-xs mt-1">Explore · Experience · Enjoy</p>
          </div>
        </div>
      </div>

      {/* backdrop when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
