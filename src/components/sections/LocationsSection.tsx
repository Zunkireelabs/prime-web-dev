"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MapPin } from "lucide-react";

const locations = [
  {
    name: "Location One",
    address: "123 Main Street, City, Country",
    phone: "+1 (555) 000-0001",
    image: "/images/locations/location-1.jpg",
  },
  {
    name: "Location Two",
    address: "456 Oak Avenue, City, Country",
    phone: "+1 (555) 000-0002",
    image: "/images/locations/location-2.jpg",
  },
];

export default function LocationsSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Find Us
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            Our Locations
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, i) => (
            <ScrollReveal key={location.name} delay={i * 0.2}>
              <div className="bg-[var(--bg-card)] border border-[rgba(201,169,110,0.1)] overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[var(--text-primary)] mb-3">
                    {location.name}
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)] mb-2">
                    <MapPin size={14} className="mt-1 text-[var(--gold)]" />
                    <span>{location.address}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {location.phone}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
