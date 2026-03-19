"use client";

import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Client Name",
    text: "An exceptional experience from start to finish. Truly world-class quality and attention to detail.",
    rating: 5,
  },
  {
    name: "Client Name",
    text: "The best decision we ever made. Professional, reliable, and the results speak for themselves.",
    rating: 5,
  },
  {
    name: "Client Name",
    text: "Outstanding service and commitment to excellence. We couldn't be happier with the outcome.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Testimonials
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            What Our Clients Say
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-[var(--bg-card)] border border-[rgba(201,169,110,0.1)] p-8 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      className="text-[var(--gold)] fill-[var(--gold)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--text-secondary)] italic leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="text-sm font-serif text-[var(--gold)]">
                  {testimonial.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
