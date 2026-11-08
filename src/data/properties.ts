// All images sourced from Onyx Assets LLP official CDN (img1.wsimg.com)
// Strictly REAL architectural photos & 3D elevations — NO floor plan blueprints
const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

export interface Property {
  id: string;
  name: string;
  tagline: string;
  category: "residence" | "villa" | "development" | "plot";
  status: "Newly Launched" | "Ongoing" | "Sold" | "Signature Collection" | "Exclusive" | "Completed";
  location: string;
  area?: string;
  units?: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  brochureUrl?: string;
  price?: string;
}

// ─── ACTIVE LAUNCHES ────────────────────────────────────────────────
export const ACTIVE_PROPERTIES: Property[] = [
  {
    id: "opulence",
    name: "Opulence by Onyx",
    tagline: "The Pinnacle of High-Living in Kunjibettu",
    category: "development",
    status: "Newly Launched",
    location: "Kunjibettu, Udupi, Karnataka",
    area: "2,450 – 3,800 sq.ft",
    units: "3 & 4 BHK Palatial Homes",
    description:
      "A grand architectural statement defining the skyline of Kunjibettu. Opulence combines panoramic vistas, bespoke interior craftsmanship, and world-class resort amenities — delivered with uncompromising structural precision.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`, // Actual building front elevation
    gallery: [
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg`,
      `${CDN}/1.jpeg`,
    ],
    features: [
      "Sky Deck & Infinity Lounge",
      "Triple-Height Grand Reception",
      "Smart Automation Ready",
      "EV Charging Infrastructure",
      "Olympic-Length Temperature Pool",
    ],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Opulence%20New%20(1).pdf",
    price: "Pricing on Request",
  },
  {
    id: "riviera",
    name: "Riviera by Onyx",
    tagline: "Waterfront Serenity Meets Architectural Rigor",
    category: "development",
    status: "Ongoing",
    location: "Mission Compound, Udupi, Karnataka",
    area: "1,680 – 2,520 sq.ft",
    units: "2 & 3 BHK Scenic Residences",
    description:
      "Nestled along the serene water edge at Mission Compound, Riviera offers an oasis of natural calm, open-air breezeways, and artisanal living spaces tailored for discerning families. Where the ocean's rhythm meets refined architecture.",
    image: `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`, // Actual riverfront building elevation
    gallery: [
      `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
      `${CDN}/Marpalli%201.jpeg`,
      `${CDN}/1.jpeg`,
      `${CDN}/2.jpeg`,
    ],
    features: [
      "Riverfront Promenade & Jogging Deck",
      "Biophilic Landscaped Courtyards",
      "State-of-the-Art Wellness Gym",
      "Private Viewing Balconies",
      "Round-the-clock Concierge",
    ],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Brochure-2.pdf",
    price: "Inquire for Availability",
  },
];

// ─── 7 CURATED MASTERPIECES (for the expanding showcase) ────────────
export const CURATED_MASTERPIECES: Property[] = [
  {
    id: "opulence",
    name: "Opulence by Onyx",
    tagline: "High-Living Landmark in Kunjibettu",
    category: "development",
    status: "Newly Launched",
    location: "Kunjibettu, Udupi",
    area: "2,450 – 3,800 sq.ft",
    units: "3 & 4 BHK Palatial Homes",
    description:
      "A grand architectural statement defining the skyline of Kunjibettu with panoramic coastal vistas and bespoke interior craftsmanship.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
    gallery: [
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
    ],
    features: ["Sky Deck & Infinity Lounge", "EV Charging", "Olympic-Length Pool"],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Opulence%20New%20(1).pdf",
    price: "Pricing on Request",
  },
  {
    id: "riviera",
    name: "Riviera by Onyx",
    tagline: "Waterfront Serenity & Architectural Rigor",
    category: "development",
    status: "Ongoing",
    location: "Mission Compound, Udupi",
    area: "1,680 – 2,520 sq.ft",
    units: "2 & 3 BHK Scenic Suites",
    description:
      "Nestled along scenic riverine breezes at Mission Compound, offering an oasis of calm with open-air garden breezeways.",
    image: `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
    gallery: [
      `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
      `${CDN}/1.jpeg`,
    ],
    features: ["Riverfront Promenade", "Biophilic Courtyards", "Private Balconies"],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Brochure-2.pdf",
    price: "Inquire for Availability",
  },
  {
    id: "sampoorna-villa",
    name: "Sampoorna Grand Villa",
    tagline: "Grandeur and Privacy in Perfect Synthesis",
    category: "villa",
    status: "Signature Collection",
    location: "Coastal Green Belt, Udupi",
    area: "4,200 sq.ft",
    units: "5 BHK Custom Mansion",
    description:
      "An expansive modern villa elevation featuring double-height porticos, private swimming pavilion, and sculpted perimeter gardens.",
    image: `${CDN}/Sampoorna%20Big%20Villa%20Elevation.jpeg`,
    gallery: [
      `${CDN}/Sampoorna%20Big%20Villa%20Elevation.jpeg`,
      `${CDN}/SAMPOORNA%201.jpeg`,
    ],
    features: ["Private Lap Pool", "Double-Height Atrium", "Independent Staff Suite"],
    price: "Private Consultations",
  },
  {
    id: "sattva",
    name: "A.R. Sattva by Onyx",
    tagline: "Timeless Heritage Crafted with Modern Purity",
    category: "residence",
    status: "Sold",
    location: "Urban Prime, Udupi",
    area: "2,250 sq.ft",
    units: "3 BHK Signature Suites",
    description:
      "A testament to structural honesty and serene simplicity, harmonizing coastal ventilation principles with high-end European fittings.",
    image: `${CDN}/1.jpeg`,
    gallery: [`${CDN}/1.jpeg`, `${CDN}/2.jpeg`, `${CDN}/3.jpeg`],
    features: ["Vastu Orientation", "Acoustic Glass Windows", "Designer Teak Joinery"],
    price: "Sold Out / Resale Inquiries",
  },
  {
    id: "v4-greens",
    name: "V4 Greens Luxury Villa",
    tagline: "Biophilic Tropical Architecture",
    category: "villa",
    status: "Ongoing",
    location: "Coastal Belt, Udupi",
    area: "3,650 sq.ft",
    units: "4 BHK Private Villa",
    description:
      "Surrounded by lush native foliage, V4 Greens balances contemporary geometry with terracotta screens and expansive terrace gardens.",
    image: `${CDN}/V4%20Greens%20Villa%20Elevation.jpeg`,
    gallery: [
      `${CDN}/V4%20Greens%20Villa%20Elevation.jpeg`,
      `${CDN}/V4%20Phase%202%20Villa%202.jpeg`,
    ],
    features: ["Terrace Sky Lounge", "Solar Smart Grid", "Rainwater Harvesting"],
    price: "Inquire for Availability",
  },
  {
    id: "marpalli-estate",
    name: "Marpalli Coastal Villa",
    tagline: "Secluded Sanctuary with Architectural Distinction",
    category: "villa",
    status: "Sold",
    location: "Marpalli, Udupi",
    area: "3,400 sq.ft",
    units: "4 BHK Bespoke Home",
    description:
      "A completed private masterwork crafted with local laterite and modern concrete forms, maximizing natural coastal sea breezes.",
    image: `${CDN}/Marpalli%201.jpeg`,
    gallery: [`${CDN}/Marpalli%201.jpeg`, `${CDN}/Marpalli%202.jpeg`],
    features: ["Lush Courtyard", "Private Car Port", "Italian Marble Flooring"],
    price: "Sold",
  },
  {
    id: "v4-phase2",
    name: "Onyx Villa Phase 2",
    tagline: "Bespoke Enclave Living",
    category: "villa",
    status: "Ongoing",
    location: "Udupi Enclave",
    area: "3,800 sq.ft",
    units: "4 & 5 BHK Estate",
    description:
      "Contemporary cubist aesthetic with expansive cantilevered balconies and floor-to-ceiling glass envelopes facing green vistas.",
    image: `${CDN}/V4%20Phase%202%20Villa%202.jpeg`,
    gallery: [
      `${CDN}/V4%20Phase%202%20Villa%202.jpeg`,
      `${CDN}/Plot%2024.jpeg`,
    ],
    features: ["Private Garden Lawns", "Smart Security", "EV Charging Point"],
    price: "Inquire for Availability",
  },
];

// ─── SIGNATURE RESIDENCES (A.R. Sattva) ─────────────────────────────
export const SATTVA_PROPERTIES: Property[] = [
  {
    id: "sattva-1",
    name: "A.R. Sattva by Onyx",
    tagline: "Timeless Heritage Crafted with Modern Purity",
    category: "residence",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    area: "1,950 – 2,900 sq.ft",
    units: "3 BHK Premium Suites",
    description:
      "A testament to structural honesty and serene simplicity. A.R. Sattva harmonizes coastal Karnataka's ventilation principles with high-end European fittings and Vastu-compliant spatial planning.",
    image: `${CDN}/1.jpeg`,
    gallery: [`${CDN}/1.jpeg`, `${CDN}/2.jpeg`, `${CDN}/3.jpeg`],
    features: [
      "Vastu-Compliant Orientation",
      "Acoustic Glass Windows",
      "Rainwater Harvesting Integration",
      "Designer Italian Kitchens",
      "Polished Concrete Flooring",
    ],
    price: "Sold Out / Resale Inquiries",
  },
  {
    id: "sattva-2",
    name: "A.R. Sattva by Onyx",
    tagline: "Natural Light. Pure Form. Coastal Calm.",
    category: "residence",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    area: "2,100 sq.ft",
    units: "3 BHK",
    description:
      "Part of the Sattva collection — a curated series of homes where every proportion, material, and threshold reflects a deep philosophy of simplicity and permanence.",
    image: `${CDN}/2.jpeg`,
    gallery: [`${CDN}/2.jpeg`, `${CDN}/1.jpeg`, `${CDN}/3.jpeg`],
    features: [
      "Open Courtyard Planning",
      "High Ceilings with Clerestory Windows",
      "Thermally Efficient Walls",
    ],
    price: "Sold",
  },
  {
    id: "sattva-3",
    name: "A.R. Sattva by Onyx",
    tagline: "Where Restraint Becomes Grandeur",
    category: "residence",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    area: "2,250 sq.ft",
    units: "3 BHK",
    description:
      "The third in the Sattva signature series. Understated materials — terracotta, pale stone, lacquered teak — create a home that only reveals its luxury upon close inspection.",
    image: `${CDN}/3.jpeg`,
    gallery: [`${CDN}/3.jpeg`, `${CDN}/1.jpeg`, `${CDN}/2.jpeg`],
    features: [
      "Lacquered Teak Joinery",
      "Concealed LED Lighting",
      "Terracotta Facade Elements",
    ],
    price: "Sold",
  },
];

// ─── ONYX VILLAS 2–12 ────────────────────────────────────────────────
const VILLA_IMAGES = [
  `${CDN}/V4%20Phase%202%20Villa%202.jpeg`,         // Villa 2
  `${CDN}/Marpalli%201.jpeg`,                        // Villa 3
  `${CDN}/Marpalli%202.jpeg`,                        // Villa 4
  `${CDN}/SAMPOORNA%201.jpeg`,                       // Villa 5
  `${CDN}/Sampoorna%20Big%20Villa%20Elevation.jpeg`, // Villa 6
  `${CDN}/V4%20Greens%20Villa%20Elevation.jpeg`,     // Villa 7
  `${CDN}/WhatsApp%20Image%202023-11-04%20at%206.46.13%20AM.jpeg`, // Villa 8
  `${CDN}/WhatsApp%20Image%202023-11-04%20at%206.46.14%20AM.jpeg`, // Villa 9
  `${CDN}/RSN%20PLOT14%201.jpeg`,                    // Villa 10
  `${CDN}/Plot%2024.jpeg`,                           // Villa 11
  `${CDN}/WhatsApp%20Image%202023-11-16%20at%2012.34.09%20AM.jpeg`, // Villa 12
];

const VILLA_FEATURES_POOL = [
  ["Private Lap Pool", "Landscaped Garden", "Double-Height Atrium"],
  ["Rooftop Terrace", "Private Porch", "Modular Luxury Kitchen"],
  ["Basement Parking", "Staff Quarters", "Smart Home Systems"],
  ["Solar Panels", "Rainwater Harvesting", "EV Charging"],
  ["Gated Security", "CCTV Perimeter", "Intercom Systems"],
];

export const VILLA_PROPERTIES: Property[] = Array.from({ length: 11 }, (_, i) => {
  const villaNum = i + 2; // Villas 2–12
  const isOngoing = villaNum >= 7;
  return {
    id: `villa-${villaNum}`,
    name: `Onyx Villa ${villaNum}`,
    tagline: `A Private Estate of Singular Character`,
    category: "villa" as const,
    status: isOngoing ? "Ongoing" : "Sold",
    location: "Coastal Green Belt, Udupi, Karnataka",
    area: `${3200 + i * 180} – ${3800 + i * 200} sq.ft`,
    units: `4 & 5 BHK Private Villa`,
    description:
      `Onyx Villa ${villaNum} stands as an independent private estate — a bespoke residence conceived for those who value absolute privacy, curated landscape, and architectural distinction in coastal Karnataka.`,
    image: VILLA_IMAGES[i],
    gallery: [
      VILLA_IMAGES[i],
      VILLA_IMAGES[(i + 1) % VILLA_IMAGES.length],
      VILLA_IMAGES[(i + 2) % VILLA_IMAGES.length],
    ],
    features: VILLA_FEATURES_POOL[i % VILLA_FEATURES_POOL.length],
    price: isOngoing ? "Inquire for Availability" : "Sold",
  };
});

// ─── ALL PROPERTIES for slider ───────────────────────────────────────
export const PROPERTIES: Property[] = [...CURATED_MASTERPIECES];

// ─── COMBINED PORTFOLIO for grid display ─────────────────────────────
export const ALL_PORTFOLIO: Property[] = [
  ...ACTIVE_PROPERTIES,
  ...SATTVA_PROPERTIES,
  ...VILLA_PROPERTIES,
];

// ─── COMPANY STATS ───────────────────────────────────────────────────
export const COMPANY_STATS = [
  { value: "30+", label: "Years Combined Mastery", sub: "Architects & Builders" },
  { value: "100%", label: "Structural Trust", sub: "Zero-compromise Quality" },
  { value: "11", label: "Exclusive Villa Estates", sub: "Villas 2 through 12" },
  { value: "2", label: "Flagship Landmark Launches", sub: "Opulence & Riviera" },
];

export const PILLARS = [
  {
    number: "01",
    title: "Structural Integrity",
    tagline: "Uncompromising engineering from the ground up.",
    description:
      "Every foundation is cast with precision-engineered reinforcement, deep soil analysis, and earthquake-resistant seismic bracing, ensuring generations of safety.",
  },
  {
    number: "02",
    title: "Timeless Architecture",
    tagline: "Inspired living that transcends passing trends.",
    description:
      "Fluid open plans, natural ventilation corridors, and double-height living spaces celebrate coastal Karnataka's climate while honoring minimalist international design.",
  },
  {
    number: "03",
    title: "Discretion & Exclusivity",
    tagline: "Curated sanctuaries for the discerning few.",
    description:
      "Low-density floor layouts, private elevator lobbies, and landscaped buffer zones provide uncompromising privacy and serene tranquility.",
  },
  {
    number: "04",
    title: "Sustainable Craftsmanship",
    tagline: "Eco-conscious materials built for longevity.",
    description:
      "Solar-ready infrastructure, deep rainwater harvesting tanks, and energy-efficient thermal envelopes reduce environmental footprint without sacrificing luxury.",
  },
];
