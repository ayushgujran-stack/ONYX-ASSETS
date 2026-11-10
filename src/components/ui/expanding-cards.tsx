"use client";

import * as React from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description: string;
  imgSrc: string;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  onItemClick?: (item: CardItem, index: number) => void;
  onInspectActive?: (item: CardItem, index: number) => void;
}

export const ExpandingCards = React.forwardRef<
  HTMLDivElement,
  ExpandingCardsProps
>(
  (
    {
      className,
      items,
      defaultActiveIndex = 0,
      onItemClick,
      onInspectActive,
      ...props
    },
    ref
  ) => {
    const [desktopActiveIndex, setDesktopActiveIndex] =
      React.useState<number>(defaultActiveIndex);
    const [mobileActiveIndex, setMobileActiveIndex] =
      React.useState<number>(defaultActiveIndex);

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    // Desktop dynamic grid template columns (1fr collapsed, 5fr expanded on hover)
    const desktopColumns = React.useMemo(() => {
      return items
        .map((_, index) => (index === desktopActiveIndex ? "5fr" : "1fr"))
        .join(" ");
    }, [desktopActiveIndex, items.length]);

    const handleDesktopCardClick = (item: CardItem, index: number) => {
      if (desktopActiveIndex === index) {
        if (onInspectActive) onInspectActive(item, index);
        return;
      }
      setDesktopActiveIndex(index);
      if (onItemClick) onItemClick(item, index);
    };

    // Mobile scroll tracker: identify which card is centered in viewport
    const handleMobileScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== mobileActiveIndex) {
        setMobileActiveIndex(closestIndex);
      }
    };

    // Smooth scroll to card when user taps a pagination dot or arrow button
    const scrollMobileTo = (index: number) => {
      const targetCard = cardRefs.current[index];
      const container = scrollContainerRef.current;
      if (!targetCard || !container) return;

      const targetLeft =
        targetCard.offsetLeft - (container.clientWidth - targetCard.offsetWidth) / 2;
      container.scrollTo({ left: targetLeft, behavior: "smooth" });
      setMobileActiveIndex(index);
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* ─── 1. Desktop & Laptop View (Horizontal Expanding Columns on Mouse Hover) ─── */}
        <ul
          className={cn(
            "hidden md:grid w-full gap-2",
            "h-[560px]",
            "transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          )}
          style={{
            gridTemplateColumns: desktopColumns,
            gridTemplateRows: "1fr",
          }}
        >
          {items.map((item, index) => {
            const isActive = desktopActiveIndex === index;
            return (
              <li
                key={item.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                className={cn(
                  "group relative cursor-pointer overflow-hidden bg-[#141517] transition-all duration-500 rounded-xl",
                  "min-w-[72px]",
                  "min-h-0 focus-visible:outline-2 focus-visible:outline-[#9c8052]"
                )}
                onMouseEnter={() => {
                  setDesktopActiveIndex(index);
                  if (onItemClick) onItemClick(item, index);
                }}
                onFocus={() => setDesktopActiveIndex(index)}
                onClick={() => handleDesktopCardClick(item, index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDesktopCardClick(item, index);
                  }
                }}
                data-active={isActive}
              >
                {/* Background photograph with smooth zoom on focus */}
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-data-[active=true]:scale-100 group-data-[active=true]:brightness-100 scale-110 brightness-[0.72] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-opacity duration-500 group-data-[active=true]:from-black/88 group-data-[active=true]:via-black/35" />

                <article className="absolute inset-0 flex flex-col justify-end gap-2 p-8 select-none">
                  {/* Collapsed vertical label on desktop */}
                  <h3 className="origin-left rotate-90 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 opacity-100 transition-opacity duration-300 block group-data-[active=true]:opacity-0 whitespace-nowrap pl-4">
                    {item.title}
                  </h3>

                  {/* Subtitle location & status */}
                  {item.subtitle && (
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#dfc082] opacity-0 transition-all duration-500 delay-75 ease-out group-data-[active=true]:opacity-100">
                      {item.subtitle}
                    </span>
                  )}

                  {/* Active Title */}
                  <h3 className="font-serif text-3xl lg:text-4xl font-light text-white opacity-0 transition-all duration-500 delay-150 ease-out group-data-[active=true]:opacity-100 leading-tight">
                    {item.title}
                  </h3>

                  {/* Active Description */}
                  <p className="w-full max-w-lg text-sm text-white/80 font-light leading-relaxed opacity-0 transition-all duration-500 delay-200 ease-out group-data-[active=true]:opacity-100 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Inline modal open affordance inside expanded card */}
                  <span className="inline-flex items-center gap-1.5 pt-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white opacity-0 transition-all duration-500 delay-250 ease-out group-data-[active=true]:opacity-100 group-hover:text-[#dfc082]">
                    <span>View Residence</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </article>
              </li>
            );
          })}
        </ul>

        {/* ─── 2. Mobile View: Fluid Swipeable Portrait Gallery with Touch Snapping ─── */}
        <div className="block md:hidden w-full space-y-4">
          {/* Scrollable Card Track */}
          <div
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            data-lenis-prevent
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 -mx-4 py-2 touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((item, index) => {
              const isCenter = mobileActiveIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => {
                    if (onInspectActive) onInspectActive(item, index);
                  }}
                  className={cn(
                    "snap-center shrink-0 w-[84vw] max-w-[340px] h-[510px] rounded-2xl relative overflow-hidden bg-[#141517] shadow-xl transition-all duration-500 cursor-pointer active:scale-[0.98]",
                    isCenter ? "ring-1 ring-[#c5a059]/50" : "opacity-90"
                  )}
                >
                  {/* High Quality Photograph with active zoom */}
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
                      isCenter ? "scale-105" : "scale-100"
                    )}
                  />

                  {/* Cinematic Dark Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/20" />

                  {/* Top Tag */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="text-[11px] font-mono tracking-widest text-[#dfc082] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase">
                      (0{index + 1} / 0{items.length})
                    </span>
                    {item.subtitle && (
                      <span className="text-[10px] font-mono tracking-wider text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full truncate max-w-[170px] uppercase border border-white/10">
                        {item.subtitle.split("•")[0]?.trim()}
                      </span>
                    )}
                  </div>

                  {/* Bottom Content Body */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 space-y-3">
                    {item.subtitle && item.subtitle.includes("•") && (
                      <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#dfc082] block">
                        {item.subtitle.split("•")[1]?.trim()}
                      </span>
                    )}

                    <h3 className="font-serif text-3xl font-light text-white leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-white/75 font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono uppercase tracking-widest active:bg-[#c5a059] active:text-black transition-colors">
                        <span>Explore Residence</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#dfc082]" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Bottom Navigation & Progress Indicator */}
          <div className="flex items-center justify-between px-2 pt-2">
            {/* Active Counter & Swipe Hint */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-widest text-[#9c8052] font-semibold">
                0{mobileActiveIndex + 1}
              </span>
              <span className="text-xs font-mono text-black/30">/</span>
              <span className="text-xs font-mono text-black/40">
                0{items.length}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-black/40 ml-2">
                • Swipe to explore
              </span>
            </div>

            {/* Prev / Next Touch Arrows & Dot Indicators */}
            <div className="flex items-center gap-3">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollMobileTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      mobileActiveIndex === i
                        ? "w-6 bg-[#9c8052]"
                        : "w-1.5 bg-black/20"
                    )}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollMobileTo(Math.max(0, mobileActiveIndex - 1))}
                  disabled={mobileActiveIndex === 0}
                  aria-label="Previous residence"
                  className="w-8 h-8 rounded-full border border-black/15 bg-white flex items-center justify-center text-black/70 disabled:opacity-30 disabled:pointer-events-none active:bg-black active:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    scrollMobileTo(
                      Math.min(items.length - 1, mobileActiveIndex + 1)
                    )
                  }
                  disabled={mobileActiveIndex === items.length - 1}
                  aria-label="Next residence"
                  className="w-8 h-8 rounded-full border border-black/15 bg-white flex items-center justify-center text-black/70 disabled:opacity-30 disabled:pointer-events-none active:bg-black active:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
ExpandingCards.displayName = "ExpandingCards";
