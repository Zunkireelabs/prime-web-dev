"use client";

import { useState } from "react";
import TextReveal from "@/components/animations/TextReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import GalleryLightbox from "@/components/ui/GalleryLightbox";

const galleryImages = [
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
  "/images/gallery/gallery-6.jpg",
];

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)] mb-4">
              Visual Journey
            </p>
          </ScrollReveal>

          <TextReveal
            as="h2"
            className="text-3xl md:text-5xl font-serif font-light text-[var(--text-primary)]"
          >
            Gallery
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <button
                onClick={() => openLightbox(i)}
                className="w-full aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() =>
          setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
        }
        onPrev={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
          )
        }
      />
    </section>
  );
}
