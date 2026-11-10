"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description: string;
  imgSrc: string;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  onItemClick?: (item: CardItem, index: number) => void;
  onInspectActive?: (item: CardItem, index: number) => void;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
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
    const [activeIndex, setActiveIndex] = React.useState<number>(
      defaultActiveIndex
    );
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const gridStyle = React.useMemo(() => {
      if (isDesktop) {
        const columns = items
          .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
          .join(" ");
        return { gridTemplateColumns: columns };
      }
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }, [activeIndex, items.length, isDesktop]);

    const handleCardClick = (item: CardItem, index: number) => {
      if (activeIndex === index) {
        if (onInspectActive) onInspectActive(item, index);
        return;
      }
      setActiveIndex(index);
      if (onItemClick) onItemClick(item, index);
    };

    return (
      <ul
        className={cn(
          "w-full gap-2",
          "grid",
          "h-[620px] md:h-[560px]",
          "transition-[grid-template-columns,grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          className
        )}
        style={{
          ...gridStyle,
          ...(isDesktop
            ? { gridTemplateRows: "1fr" }
            : { gridTemplateColumns: "1fr" }),
        }}
        ref={ref}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              className={cn(
                "group relative cursor-pointer overflow-hidden bg-[#141517] transition-all duration-500",
                "md:min-w-[72px]",
                "min-h-0 min-w-0 focus-visible:outline-2 focus-visible:outline-[#9c8052]"
              )}
              onMouseEnter={() => {
                setActiveIndex(index);
                if (onItemClick) onItemClick(item, index);
              }}
              onFocus={() => setActiveIndex(index)}
              onClick={() => handleCardClick(item, index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(item, index);
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

              <article className="absolute inset-0 flex flex-col justify-end gap-2 p-5 md:p-8 select-none">
                {/* Collapsed vertical label on desktop */}
                <h3 className="hidden origin-left rotate-90 text-[11px] font-mono uppercase tracking-[0.25em] text-white/80 opacity-100 transition-opacity duration-300 md:block group-data-[active=true]:opacity-0 whitespace-nowrap pl-4">
                  {item.title}
                </h3>

                {/* Subtitle location & status */}
                {item.subtitle && (
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#dfc082] opacity-0 transition-all duration-500 delay-75 ease-out group-data-[active=true]:opacity-100">
                    {item.subtitle}
                  </span>
                )}

                {/* Active Title */}
                <h3 className="font-serif text-2xl md:text-4xl font-light text-white opacity-0 transition-all duration-500 delay-150 ease-out group-data-[active=true]:opacity-100 leading-tight">
                  {item.title}
                </h3>

                {/* Active Description */}
                <p className="w-full max-w-lg text-xs md:text-sm text-white/80 font-light leading-relaxed opacity-0 transition-all duration-500 delay-200 ease-out group-data-[active=true]:opacity-100 line-clamp-2">
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
    );
  }
);
ExpandingCards.displayName = "ExpandingCards";
