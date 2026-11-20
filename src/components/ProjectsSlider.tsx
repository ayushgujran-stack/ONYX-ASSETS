"use client";

import React, { useMemo } from "react";
import { ALL_PORTFOLIO, Property } from "@/data/properties";
import { SocialCards, CardItem } from "@/components/ui/card-fan-carousel";
import { MaskedWords } from "@/components/ui/motion-primitives";
import { ConcreteTexture } from "@/components/ui/ConcreteTexture";

interface ProjectsSliderProps {
  onSelectProperty: (property: Property) => void;
  onOpenBookVisit?: () => void;
}

export function ProjectsSlider({ onSelectProperty }: ProjectsSliderProps) {
  const cards: CardItem[] = useMemo(
    () =>
      ALL_PORTFOLIO.slice(0, 10).map((prop) => ({
        imgUrl: prop.image,
        alt: prop.name,
        linkUrl: `/estates/${prop.id}`,
        title: prop.name,
        subtitle: `${prop.location} • ${prop.status}`,
      })),
    []
  );

  const handleCardClick = (_: CardItem, index: number) => {
    const target = ALL_PORTFOLIO[index];
    if (target) {
      onSelectProperty(target);
    }
  };

  return (
    <section
      id="projects"
      className="py-24 md:py-32 bg-[#dcd9c8] border-t border-dashed border-black/12 relative overflow-clip"
    >
      {/* Warm stone concrete grain — greige variant */}
      <ConcreteTexture variant="greige" />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Minimalist Heading — Extra text removed as requested */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141416] font-light tracking-tight">
            <MaskedWords
              segments={[
                { text: "Architectural " },
                {
                  text: "Excellence",
                  className: "italic font-normal text-[#9c8052]",
                },
              ]}
            />
          </h2>
        </div>

        {/* Fanned Arc Carousel with Elastic GSAP Physics */}
        <SocialCards cards={cards} onCardClick={handleCardClick} />
      </div>
    </section>
  );
}
