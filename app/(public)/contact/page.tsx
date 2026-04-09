import React from "react";
import { Metadata } from "next";
import { ContactInfoCard } from "@/components/features/contact/ContactInfoCard";
import { GoogleMap } from "@/components/features/contact/GoogleMap";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { 
  MapPin, 
  Phone, 
  Printer, 
  Smartphone, 
  Mail, 
  User 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | ICETMTSHS 2026",
  description: "Get in touch with the ICETMTSHS 2026 organizing committee. Contact details for Prof. Datin Dr. Hafizah Che Hassan and Prof. Dr. Idris A. Ahmed.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#9b1d20] mb-4">
              Contact
            </h1>
            <SquigglyLine />
            <div className="mt-6 flex items-center gap-3 text-gray-800">
              <User className="text-[#9b1d20]" size={20} />
              <p className="text-lg font-medium">
                Prof. Datin Dr. Hafizah Che Hassan / Prof. Dr. Idris A. Ahmed
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Contact Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Details</h2>
            
            <ContactInfoCard 
              icon={MapPin}
              title="Our Location"
              details={[
                "Lincoln University College, Wisma Lincoln,",
                "No. 12-18, Jalan SS 6/12, 47301 Petaling Jaya,",
                "Selangor D. E., Malaysia"
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactInfoCard 
                icon={Phone}
                title="Office Phone"
                details={[
                  "Malaysia: 1300 880 111",
                  "International: +603-7806 3478"
                ]}
              />

              <ContactInfoCard 
                icon={Printer}
                title="FAX"
                details={["+603-7806 3479"]}
              />

              <ContactInfoCard 
                icon={Smartphone}
                title="Mobile (H/p)"
                details={[
                  "+60 17-604 2393",
                  "+60 12-690 1393"
                ]}
              />

              <ContactInfoCard 
                icon={Mail}
                title="Email Address"
                details={["icetmtshs@lincoln.edu.my"]}
              />
            </div>
          </div>

          {/* Right Column: Map Only */}
          <div className="space-y-6 lg:pt-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-[#9b1d20]" />
              Location Map
            </h3>
            <GoogleMap />
            
            <div className="bg-[#9b1d20]/5 p-6 rounded-xl border border-[#9b1d20]/10 mt-8">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                For further inquiries regarding the conference, please feel free to reach out to us via the contact details provided. Our team is here to assist you with any questions about submissions, registration, or logistics.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
