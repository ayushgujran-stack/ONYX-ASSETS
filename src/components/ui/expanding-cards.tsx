"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  onItemClick?: (item: CardItem, index: number) => void;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, onItemClick, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
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
    if (activeIndex === null) return {};

    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-7xl gap-3",
        "grid",
        "h-[620px] md:h-[540px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
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
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card text-card-foreground shadow-lg transition-all duration-300",
            "md:min-w-[80px]",
            "min-h-0 min-w-0",
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => {
            handleInteraction(index);
            if (onItemClick) onItemClick(item, index);
          }}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          {/* Background image */}
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:brightness-100 scale-110 brightness-[0.75] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-data-[active=true]:from-black/90 group-data-[active=true]:via-black/40" />

          <article className="absolute inset-0 flex flex-col justify-end gap-2.5 p-5 md:p-6 select-none">
            {/* Collapsed vertical title on desktop */}
            <h3 className="hidden origin-left rotate-90 text-xs font-mono uppercase tracking-[0.25em] text-white/80 opacity-100 transition-all duration-300 ease-out md:block group-data-[active=true]:opacity-0 whitespace-nowrap pl-4">
              {item.title}
            </h3>

            {/* Active Icon */}
            <div className="text-[#9c8052] opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            {/* Active Title */}
            <h3 className="font-serif text-2xl md:text-3xl font-light text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100 leading-tight">
              {item.title}
            </h3>

            {/* Active Description */}
            <p className="w-full max-w-md text-xs md:text-sm text-white/80 font-light leading-relaxed opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100 line-clamp-3">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
