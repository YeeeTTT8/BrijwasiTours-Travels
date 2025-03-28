import { ConsultationForm } from "@/components/consultation/consultation-form";

export default function ConsultationPage() {
  return (
    <div>
      <div className="bg-primary/10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">Book Your Travel Consultation</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our travel experts are here to craft your perfect itinerary. Get personalized advice and a custom travel plan tailored to your preferences.
          </p>
        </div>
      </div>
      
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-primary p-8 md:p-12 text-white">
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">Why Book a Consultation?</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">Personalized Experience</h4>
                      <p className="text-white/80">Custom recommendations based on your travel style and interests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">Local Expertise</h4>
                      <p className="text-white/80">Insider knowledge of hidden gems and authentic experiences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">Save Time & Stress</h4>
                      <p className="text-white/80">Avoid hours of research and planning with our expert help</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-lg">100% Free</h4>
                      <p className="text-white/80">Our consultation service comes with no obligations</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <h4 className="font-semibold text-lg mb-2">What to Expect</h4>
                  <p className="text-white/80 mb-4">
                    After submitting your request, one of our travel experts will contact you within 24 hours to schedule a call at your convenience.
                  </p>
                  <p className="text-white/80">
                    During the consultation, we'll discuss your travel preferences, answer your questions, and start crafting your personalized itinerary.
                  </p>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <h3 className="font-heading font-semibold text-xl mb-6">Request Your Free Consultation</h3>
                <ConsultationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
