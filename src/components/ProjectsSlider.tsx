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
  // Strictly filter to the 8 delivered / completed residential towers
  const completedProperties = useMemo(
    () => ALL_PORTFOLIO.filter((p) => p.projectPhase === "completed"),
    []
  );

  const cards: CardItem[] = useMemo(
    () =>
      completedProperties.map((prop) => ({
        imgUrl: prop.image,
        alt: prop.name,
        linkUrl: `/estates/${prop.id}`,
        title: prop.name,
        subtitle: `${prop.location} • Handed Over`,
      })),
    [completedProperties]
  );

  const handleCardClick = (_: CardItem, index: number) => {
    const target = completedProperties[index];
    if (target) {
      onSelectProperty(target);
    }
  };

  return (
    <section
      id="completed"
      className="py-24 md:py-32 bg-[#dcd9c8] border-t border-dashed border-black/12 relative overflow-clip"
    >
      {/* Warm stone concrete grain — greige variant */}
      <ConcreteTexture variant="greige" />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Minimalist Heading — Delivered Landmarks */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#141416] font-light tracking-tight">
            <MaskedWords
              segments={[
                { text: "Delivered " },
                {
                  text: "Landmarks",
                  className: "italic font-normal text-[#9c8052]",
                },
              ]}
            />
          </h2>
        </div>

        {/* Fanned Arc Carousel with Elastic GSAP Physics for Delivered Masterpieces */}
        <SocialCards cards={cards} onCardClick={handleCardClick} />
      </div>
    </section>
  );
}
