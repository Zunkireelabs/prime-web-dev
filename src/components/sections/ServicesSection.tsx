"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";

const services = [
  {
    title: "Service One",
    description: "Detailed description of your first service offering.",
    duration: "60 min",
    price: "$100",
    image: "/images/services/service-1.jpg",
  },
  {
    title: "Service Two",
    description: "Detailed description of your second service offering.",
    duration: "90 min",
    price: "$150",
    image: "/images/services/service-2.jpg",
  },
  {
    title: "Service Three",
    description: "Detailed description of your third service offering.",
    duration: "60 min",
    price: "$120",
    image: "/images/services/service-3.jpg",
  },
  {
    title: "Service Four",
    description: "Detailed description of your fourth service offering.",
    duration: "120 min",
    price: "$200",
    image: "/images/services/service-4.jpg",
  },
  {
    title: "Service Five",
    description: "Detailed description of your fifth service offering.",
    duration: "90 min",
    price: "$180",
    image: "/images/services/service-5.jpg",
  },
  {
    title: "Service Six",
    description: "Detailed description of your sixth service offering.",
    duration: "60 min",
    price: "$100",
    image: "/images/services/service-6.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Full Menu
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            All Services
          </TextReveal>
        </div>

        <div className="space-y-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="flex flex-col md:flex-row gap-6 bg-[var(--bg-card)] border border-[rgba(201,169,110,0.1)] overflow-hidden">
                <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-serif text-[var(--text-primary)] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[var(--text-muted)]">
                      {service.duration}
                    </span>
                    <span className="text-[var(--gold)] font-medium">
                      {service.price}
                    </span>
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
