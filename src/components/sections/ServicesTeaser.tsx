"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    title: "Service One",
    description: "Description of your first service offering.",
    image: "/images/services/service-1.jpg",
  },
  {
    title: "Service Two",
    description: "Description of your second service offering.",
    image: "/images/services/service-2.jpg",
  },
  {
    title: "Service Three",
    description: "Description of your third service offering.",
    image: "/images/services/service-3.jpg",
  },
  {
    title: "Service Four",
    description: "Description of your fourth service offering.",
    image: "/images/services/service-4.jpg",
  },
  {
    title: "Service Five",
    description: "Description of your fifth service offering.",
    image: "/images/services/service-5.jpg",
  },
  {
    title: "Service Six",
    description: "Description of your sixth service offering.",
    image: "/images/services/service-6.jpg",
  },
];

export default function ServicesTeaser() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[var(--bg-plum)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              What We Offer
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            Our Services
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="group perspective-container">
                <div className="bg-[var(--bg-card)] border border-[rgba(201,169,110,0.1)] overflow-hidden transition-all duration-500 hover:border-[rgba(201,169,110,0.3)] perspective-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-[var(--text-primary)] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
