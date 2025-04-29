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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // helper: scroll into view if on "/", otherwise navigate to "/#id"
  function scrollToSection(id: string) {
    if (location === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // update URL hash without reloading
        window.history.replaceState(null, "", `#${id}`);
      }
    } else {
      // navigate back to home + hash
      setLocation(`/#${id}`);
    }
    setMobileMenuOpen(false);
  }

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
          Brijwasi Tours & Travels
        </Link>

        {/* Desktop menu */}
        <div
          className={cn(
            "hidden md:flex space-x-8 font-medium",
            scrolled ? "text-gray-800" : "text-white"
          )}
        >
          <button
            onClick={() => scrollToSection("destinations")}
            className="relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Destinations
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>

          <Link
            href="/itinerary-builder"
            className="relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Itineraries
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </Link>

          <button
            onClick={() => scrollToSection("testimonials")}
            className="relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => scrollToSection("consultation")}
            className="relative py-2 font-semibold hover:text-primary transition-colors"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
          </button>
        </div>

        {/* CTA button */}
        <div className="hidden md:block">
          <Link href="/consultation">
            <Button
              className={cn(
                scrolled ? "bg-primary text-white" : "bg-white/90 text-primary hover:bg-white",
                "group overflow-hidden relative transition-all duration-300"
              )}
            >
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          className={cn(
            "md:hidden text-2xl z-50 relative",
            scrolled || mobileMenuOpen ? "text-primary" : "text-white"
          )}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out z-40",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col px-6 py-20 h-full">
          <button
            onClick={() => {
              setLocation("/");
              setMobileMenuOpen(false);
            }}
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
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 text-gray-700 hover:text-primary border-b border-gray-100"
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
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-primary text-white py-3 px-4 rounded-md text-center font-semibold"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
);
}
