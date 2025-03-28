import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [isInView, setIsInView] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);
  
  const footerRef = useRef<HTMLElement>(null);
  
  // Track when footer comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribing(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubscribedEmail(email);
        setEmail("");
        setIsSubscribing(false);
      }, 1500);
    }
  };
  
  // Social media links with icons and hover effects
  const socialLinks = [
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      href: "#"
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: "#"
    },
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      ),
      href: "#"
    },
    {
      name: "Pinterest",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      ),
      href: "#"
    }
  ];
  
  const destinations = [
    { name: "Dubai, UAE", href: "/destinations/dubai" },
    { name: "Thailand", href: "/destinations/thailand" },
    { name: "Singapore", href: "/destinations/singapore" },
    { name: "Vietnam", href: "/destinations/vietnam" },
    { name: "Indonesia (Bali)", href: "/destinations/indonesia" }
  ];
  
  const resources = [
    { name: "Travel Guides", href: "#" },
    { name: "Visa Information", href: "#" },
    { name: "Travel Insurance", href: "#" },
    { name: "Packing Tips", href: "#" },
    { name: "Travel Blog", href: "#" }
  ];
  
  return (
    <footer 
      ref={footerRef}
      className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Company Info */}
          <div className={cn(
            "lg:col-span-4 transition-all duration-1000 transform",
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="flex items-center mb-5">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-primary mr-3" 
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
              <h3 className="font-heading font-bold text-3xl">TravelEase</h3>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Crafting unforgettable travel experiences across Southeast Asia and the Middle East. 
              We provide authentic journeys tailored to your preferences.
            </p>
            
            {/* Newsletter Section */}
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-3 text-white">Subscribe to our newsletter</h4>
              
              {subscribedEmail ? (
                <div className="bg-primary/20 text-white rounded-lg p-4 animate-in slide-in-from-bottom">
                  <div className="flex items-center text-sm">
                    <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>
                      Thanks for subscribing! We've sent a confirmation to <span className="font-medium">{subscribedEmail}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="relative">
                  <div className={cn(
                    "flex overflow-hidden rounded-lg transition-all duration-300 border",
                    focusedInput 
                      ? "border-primary shadow-glow" 
                      : "border-gray-700"
                  )}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "w-full py-3 px-4 bg-gray-800 text-white placeholder-gray-500 outline-none transition-all",
                        focusedInput ? "bg-gray-800" : "bg-gray-800/80"
                      )}
                      placeholder="Enter your email"
                      required
                      onFocus={() => setFocusedInput(true)}
                      onBlur={() => setFocusedInput(false)}
                    />
                    <button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-white py-3 px-5 flex-shrink-0 transition-all duration-300 font-medium relative overflow-hidden group"
                      disabled={isSubscribing}
                    >
                      <span className="relative z-10 flex items-center">
                        {isSubscribing ? (
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-1 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        )}
                        {isSubscribing ? "Sending..." : "Subscribe"}
                      </span>
                      <span className="absolute inset-0 w-full h-full bg-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center">
                <span>Follow us</span>
                <span className="h-px flex-grow bg-gray-800 ml-3"></span>
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={social.name}
                    href={social.href} 
                    className={cn(
                      "h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary/80 hover:text-white transition-all duration-300 transform hover:scale-110",
                      isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}
                    style={{ transitionDelay: `${150 + index * 75}ms` }}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={cn(
            "lg:col-span-2 transition-all duration-1000 delay-150 transform",
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h4 className="font-heading font-semibold text-lg mb-5 pb-2 border-b border-gray-800">
              Destinations
            </h4>
            <ul className="space-y-3">
              {destinations.map((destination, index) => (
                <li 
                  key={destination.name}
                  className={cn(
                    "transform transition-all",
                    isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <Link 
                    href={destination.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all mr-0 group-hover:mr-2"></span>
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className={cn(
            "lg:col-span-2 transition-all duration-1000 delay-300 transform",
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h4 className="font-heading font-semibold text-lg mb-5 pb-2 border-b border-gray-800">
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li 
                  key={resource.name}
                  className={cn(
                    "transform transition-all",
                    isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <a 
                    href={resource.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all mr-0 group-hover:mr-2"></span>
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className={cn(
            "lg:col-span-4 transition-all duration-1000 delay-500 transform",
            isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h4 className="font-heading font-semibold text-lg mb-5 pb-2 border-b border-gray-800">
              Contact Us
            </h4>
            
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start group">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="pt-1">
                  <span className="block group-hover:text-white transition-colors">
                    123 Travel Street, Suite 456<br/>
                    New York, NY 10001<br/>
                    United States
                  </span>
                </div>
              </li>
              
              <li className="flex items-center group">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors">+1 (555) 123-4567</span>
              </li>
              
              <li className="flex items-center group">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors">info@travelease.com</span>
              </li>
              
              <li className="flex items-center group">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="group-hover:text-white transition-colors">
                  Mon-Fri: 9:00 AM - 6:00 PM EST<br/>
                  Sat: 10:00 AM - 4:00 PM EST
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Site Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">&copy; {currentYear} TravelEase. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors hover:underline">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors hover:underline">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors hover:underline">Sitemap</a>
            </div>
          </div>
          
          {/* Back to top button */}
          <div className="flex justify-center mt-8">
            <a 
              href="#top" 
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-white transition-all duration-300 transform hover:scale-110 group"
              aria-label="Back to top"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 transform transition-transform group-hover:-translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Global styles are now in index.css */}
    </footer>
  );
}
