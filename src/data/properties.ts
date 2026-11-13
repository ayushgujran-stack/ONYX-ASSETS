// All architectural images sourced from Onyx Assets LLP official CDN (img1.wsimg.com)
// Verified specifications, unit sizes, proximities, and K-RERA numbers extracted from official Opulence & Riviera brochures.
const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

export type ProjectPhase = "ongoing" | "completed" | "pre-launch" | "future";

export interface UnitPlanSpec {
  unit: string;
  config: string;
  sbaSqFt: string;
  balconies?: string;
}

export interface ProximityItem {
  landmark: string;
  distance: string;
  category: "Education" | "Healthcare" | "Transit & Retail" | "Landmark";
}

export interface SpecificationCategory {
  title: string;
  items: string[];
}

export interface Property {
  id: string;
  name: string;
  tagline: string;
  category: "residence" | "villa" | "development" | "plot";
  projectPhase: ProjectPhase;
  status:
    | "Newly Launched"
    | "Ongoing"
    | "Pre-Launch"
    | "Future Vision"
    | "Sold"
    | "Signature Collection"
    | "Exclusive"
    | "Completed";
  location: string;
  mapQuery?: string;
  area?: string;
  units?: string;
  totalUnits?: string;
  possession?: string;
  landParcel?: string;
  reraId?: string;
  reraUrl?: string;
  description: string;
  image: string;
  gallery: string[];
  floorPlanImage?: string;
  unitPlans?: UnitPlanSpec[];
  proximities?: ProximityItem[];
  specifications?: SpecificationCategory[];
  approvedBanks?: string[];
  architect?: string;
  legalAdvisor?: string;
  features: string[];
  brochureUrl?: string;
  price?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  project: string;
  projectId: string;
  category: "Luxury Flats" | "Signature Flats" | "Private Villas";
  location: string;
  src: string;
  aspect: "landscape" | "portrait" | "wide";
}

export interface ClientTestimonial {
  name: string;
  tenure: string;
  headline: string;
  quote: string;
}

const SHARED_APARTMENT_SPECS: SpecificationCategory[] = [
  {
    title: "Living & Work Area",
    items: [
      "Main Door in Teakwood / Kinza Luxury Doors",
      "French Windows in UPVC",
      "Open floor plan with expansive living & dining bays",
      "Dedicated Wi-Fi and adequate TV points in living room",
      "Balcony in living / dining room",
    ],
  },
  {
    title: "Kitchen & Dining",
    items: [
      "Premium quality granite kitchen counter slab",
      "Reticulated piped gas terminal with individual meter",
      "Stainless steel sink with dedicated utility",
      "Washing machine point in dry balcony",
      "Adequate heavy-duty appliance power points",
    ],
  },
  {
    title: "Bedrooms",
    items: [
      "2x4 ft vitrified tile flooring throughout",
      "Flush doors across bedrooms",
      "Modular switches with concealed PVC provision for A.C.",
      "Dedicated balcony & TV point in Master Bedroom",
    ],
  },
  {
    title: "Bath & Sanitary",
    items: [
      "Full waterproofing treatment across all bathrooms",
      "Pressure-checked plumbing & leak-proof draining lines",
      "Hot & cold mixer units with Hindware / Jaquar fittings",
      "Concept series luster / matt ceramic wall tiles",
    ],
  },
];

const APPROVED_BANKING_PARTNERS = [
  "HDFC Bank",
  "Canara Bank",
  "State Bank of India (SBI)",
  "Union Bank of India",
  "ICICI Bank Ltd.",
];

// ─── ACTIVE / ONGOING FLAT LAUNCHES (Verified Brochure & RERA Data) ─
export const ACTIVE_PROPERTIES: Property[] = [
  {
    id: "opulence",
    name: "Opulence by Onyx",
    tagline: "The Pinnacle of High-Rise Flats in Kunjibettu",
    category: "development",
    projectPhase: "ongoing",
    status: "Newly Launched",
    location: "Kunjibettu, Shivalli, Udupi, Karnataka",
    mapQuery: "Kunjibettu, Udupi, Karnataka",
    area: "956 – 1,968 sq.ft SBA",
    units: "2, 3 & 4 BHK Luxury Flats",
    totalUnits: "42 Exclusive Apartments",
    possession: "Possession Dec 2027",
    landParcel: "Kunjibettu • 42 Units",
    reraId: "PRM/KA/RERA/1273/318/PR/160426/008587",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "A 42-unit landmark apartment tower in the prestigious Kunjibettu corridor of Udupi. Opulence pairs spacious 2, 3 & 4 BHK flats featuring up to 4 balconies with a signature top-floor Sports Arena, yoga & gym hall, and seamless proximity to MGM College and Manipal.",
    image: `${CDN}/1.jpeg`,
    gallery: [
      `${CDN}/1.jpeg`,
      `${CDN}/2.jpeg`,
      `${CDN}/3.jpeg`,
    ],
    floorPlanImage: "/assets/plans/opulence-floor-plan.png",
    unitPlans: [
      { unit: "Unit 1", config: "4 BHK Luxury", sbaSqFt: "1,968 sq.ft", balconies: "4 Balconies" },
      { unit: "Unit 2", config: "3 BHK Corner", sbaSqFt: "1,721 sq.ft", balconies: "3 Balconies" },
      { unit: "Unit 7", config: "3 BHK Suite", sbaSqFt: "1,565 sq.ft", balconies: "3 Balconies" },
      { unit: "Unit 6", config: "2 BHK Spacious", sbaSqFt: "1,295 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 3", config: "2 BHK Classic", sbaSqFt: "1,261 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 5", config: "2 BHK Urban", sbaSqFt: "1,080 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 4", config: "2 BHK Compact", sbaSqFt: "956 sq.ft", balconies: "2 Balconies" },
    ],
    proximities: [
      { landmark: "MGM College", distance: "200 Mtrs", category: "Education" },
      { landmark: "Nearest Bus Stop", distance: "100 Mtrs", category: "Transit & Retail" },
      { landmark: "Westside & Baliga Law College", distance: "500 Mtrs", category: "Transit & Retail" },
      { landmark: "Udupi City Bus Stand & Railway Station", distance: "1 Km", category: "Transit & Retail" },
      { landmark: "D-Mart & Kadiyali Temple", distance: "1.4 Km", category: "Landmark" },
      { landmark: "Shri Krishna Matha, Udupi", distance: "2 Km", category: "Landmark" },
      { landmark: "KMC Hospital & MIT Manipal", distance: "3.0 – 3.2 Km", category: "Healthcare" },
      { landmark: "Malpe Beach", distance: "7 Km", category: "Landmark" },
    ],
    specifications: SHARED_APARTMENT_SPECS,
    approvedBanks: APPROVED_BANKING_PARTNERS,
    architect: "Prime Constructions, Udupi",
    legalAdvisor: "Vani Rao & Associates, Manipal",
    features: [
      "Top-Floor Indoor Sports Arena (Pool, Table Tennis, Mini Golf)",
      "Dedicated Yoga Hall & Fitness Gym",
      "Reticulated Gas Supply with Meter",
      "Up to 4 Balconies in 3 & 4 BHK Units",
      "24-Hour Water, Power & CCTV Security",
      "CREDAI Udupi Member Development",
    ],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Opulence%20New%20(1).pdf",
    price: "Pricing on Request",
  },
  {
    id: "riviera",
    name: "Riviera by Onyx",
    tagline: "1, 2 & 3 BHK Apartments in Mission Compound",
    category: "development",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Mission Compound, Chitpady, Udupi, Karnataka",
    mapQuery: "Mission Compound, Udupi, Karnataka",
    area: "680 – 1,560 sq.ft SBA",
    units: "1, 2 & 3 BHK Apartments",
    totalUnits: "28 Scenic Apartments",
    possession: "Possession by 2027",
    landParcel: "Mission Compound • 28 Units",
    reraId: "PRM/KA/RERA/1273/318/PR/261125/008279",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "Nestled in the prestigious Udupi Mission Compound layout, Riviera is a boutique 28-unit apartment development combining serene green surroundings, ample balconies, a signature rooftop Sports Arena, and walking proximity to Ajjarkad Park and TMA Pai Hospital.",
    image: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
    gallery: [
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
      `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg`,
    ],
    floorPlanImage: "/assets/plans/riviera-floor-plan.png",
    unitPlans: [
      { unit: "Unit 1", config: "3 BHK Corner", sbaSqFt: "1,560 sq.ft", balconies: "4 Balconies" },
      { unit: "Unit 3", config: "3 BHK Residence", sbaSqFt: "1,469 sq.ft", balconies: "3 Balconies" },
      { unit: "Unit 7", config: "2 BHK Grand", sbaSqFt: "1,297 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 4", config: "2 BHK Spacious", sbaSqFt: "1,172 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 6", config: "2 BHK Classic", sbaSqFt: "1,095 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 2", config: "2 BHK Functional", sbaSqFt: "1,089 sq.ft", balconies: "2 Balconies" },
      { unit: "Unit 5", config: "1 BHK Suite", sbaSqFt: "680 sq.ft", balconies: "1 Balcony" },
    ],
    proximities: [
      { landmark: "CSI Jubilee Church & Basel Church", distance: "250 – 400 Mtrs", category: "Landmark" },
      { landmark: "Ajjarkad Park & SLVT Temple", distance: "500 Mtrs", category: "Landmark" },
      { landmark: "TMA Pai Hospital & Lombard Hospital", distance: "550 – 600 Mtrs", category: "Healthcare" },
      { landmark: "Smart Bazaar", distance: "650 Mtrs", category: "Transit & Retail" },
      { landmark: "Udupi City Bus Stand & Poorna Prajna College", distance: "1.0 – 1.3 Km", category: "Education" },
      { landmark: "Shri Krishna Temple", distance: "1.7 Km", category: "Landmark" },
      { landmark: "Udupi Railway Station", distance: "3.5 Km", category: "Transit & Retail" },
      { landmark: "KMC Hospital & MIT Manipal", distance: "7.0 – 7.1 Km", category: "Healthcare" },
    ],
    specifications: SHARED_APARTMENT_SPECS,
    approvedBanks: APPROVED_BANKING_PARTNERS,
    architect: "Prime Constructions, Udupi",
    legalAdvisor: "Vani Rao & Associates, Manipal",
    features: [
      "Top-Floor Sports Arena (Air Hockey, Pool, TT, Foosball, Trampoline)",
      "Dedicated Yoga & Fitness Gym Hall",
      "Reticulated Gas Supply & 24-Hr Water",
      "Walking Distance to TMA Pai Hospital & Ajjarkad Park",
      "CREDAI Udupi Member Development",
    ],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Brochure-2.pdf",
    price: "Inquire for Availability",
  },
];

// ─── CURATED MASTERPIECES (Flats Strictly Prioritized First) ────────
export const CURATED_MASTERPIECES: Property[] = [
  ACTIVE_PROPERTIES[0],
  ACTIVE_PROPERTIES[1],
  {
    id: "sattva",
    name: "A.R. Sattva by Onyx",
    tagline: "Timeless Heritage Crafted with Modern Purity",
    category: "residence",
    projectPhase: "completed",
    status: "Sold",
    location: "Urban Prime, Udupi",
    mapQuery: "Udupi, Karnataka",
    area: "1,950 – 2,900 sq.ft",
    units: "3 BHK Signature Flats",
    possession: "Delivered • Occupied",
    landParcel: "Udupi Prime",
    reraId: "Completed • Occupancy Certified",
    description:
      "A testament to structural honesty and serene simplicity, harmonizing coastal ventilation principles with high-end European fittings across signature flats.",
    image: `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
    gallery: [
      `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
      `${CDN}/1.jpeg`,
      `${CDN}/2.jpeg`,
    ],
    features: ["Vastu Orientation", "Acoustic Glass Windows", "Designer Teak Joinery"],
    price: "Sold Out",
  },
  {
    id: "sattva-2",
    name: "A.R. Sattva — East Wing",
    tagline: "Natural Light. Pure Form. Coastal Calm.",
    category: "residence",
    projectPhase: "completed",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "2,100 sq.ft",
    units: "3 BHK Corner Flats",
    possession: "Delivered • Occupied",
    landParcel: "Udupi Urban Prime",
    reraId: "Completed • Occupancy Certified",
    description:
      "Part of the Sattva collection — boutique corner apartments where every proportion, material, and threshold reflects simplicity and permanence.",
    image: `${CDN}/2.jpeg`,
    gallery: [`${CDN}/2.jpeg`, `${CDN}/3.jpeg`],
    features: ["Open Courtyard Planning", "High Ceilings", "Thermally Efficient Walls"],
    price: "Sold",
  },
  {
    id: "v4-greens",
    name: "V4 Greens Luxury Villa",
    tagline: "Biophilic Tropical Architecture",
    category: "villa",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Coastal Belt, Udupi",
    mapQuery: "Udupi, Karnataka",
    area: "3,650 sq.ft",
    units: "4 BHK Private Villa",
    possession: "Ongoing",
    landParcel: "Coastal Enclave",
    reraId: "K-RERA Compliant",
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
    id: "sampoorna-villa",
    name: "Sampoorna Grand Villa",
    tagline: "Grandeur and Privacy in Perfect Synthesis",
    category: "villa",
    projectPhase: "completed",
    status: "Signature Collection",
    location: "Coastal Green Belt, Udupi",
    mapQuery: "Udupi, Karnataka",
    area: "4,200 sq.ft",
    units: "5 BHK Custom Villa",
    possession: "Completed",
    landParcel: "Private Estate",
    reraId: "100% Compliant",
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
];

// ─── SIGNATURE COMPLETED FLATS (A.R. Sattva) ────────────────────────
export const SATTVA_PROPERTIES: Property[] = [
  {
    id: "sattva-1",
    name: "A.R. Sattva by Onyx",
    tagline: "Timeless Heritage Crafted with Modern Purity",
    category: "residence",
    projectPhase: "completed",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "1,950 – 2,900 sq.ft",
    units: "3 BHK Premium Flats",
    possession: "Delivered",
    landParcel: "Udupi Urban Prime",
    reraId: "Completed • Delivered",
    description:
      "A testament to structural honesty and serene simplicity. A.R. Sattva harmonizes coastal Karnataka's ventilation principles with high-end European fittings and Vastu-compliant spatial planning.",
    image: `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
    gallery: [
      `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
      `${CDN}/1.jpeg`,
      `${CDN}/2.jpeg`,
    ],
    features: [
      "Vastu-Compliant Orientation",
      "Acoustic Glass Windows",
      "Rainwater Harvesting Integration",
      "Designer Kitchens",
    ],
    price: "Sold Out / Resale Inquiries",
  },
  {
    id: "sattva-2",
    name: "A.R. Sattva — Courtyard Wing",
    tagline: "Natural Light. Pure Form. Coastal Calm.",
    category: "residence",
    projectPhase: "completed",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "2,100 sq.ft",
    units: "3 BHK Corner Flats",
    possession: "Delivered",
    landParcel: "Udupi Urban Prime",
    reraId: "Completed • Delivered",
    description:
      "Part of the Sattva collection — a curated series of homes where every proportion, material, and threshold reflects a deep philosophy of simplicity and permanence.",
    image: `${CDN}/2.jpeg`,
    gallery: [`${CDN}/2.jpeg`, `${CDN}/3.jpeg`],
    features: [
      "Open Courtyard Planning",
      "High Ceilings with Clerestory Windows",
      "Thermally Efficient Walls",
    ],
    price: "Sold",
  },
  {
    id: "sattva-3",
    name: "A.R. Sattva — Teak Atrium",
    tagline: "Where Restraint Becomes Grandeur",
    category: "residence",
    projectPhase: "completed",
    status: "Sold",
    location: "Udupi Urban Prime, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "2,250 sq.ft",
    units: "3 BHK Atelier Flats",
    possession: "Delivered",
    landParcel: "Udupi Urban Prime",
    reraId: "Completed • Delivered",
    description:
      "The third in the Sattva signature series. Understated materials — terracotta, pale stone, lacquered teak — create a home that reveals its luxury upon close inspection.",
    image: `${CDN}/3.jpeg`,
    gallery: [`${CDN}/3.jpeg`, `${CDN}/1.jpeg`],
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
    projectPhase: isOngoing ? "ongoing" : "completed",
    status: isOngoing ? "Ongoing" : "Sold",
    location: "Coastal Green Belt, Udupi, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: `${3200 + i * 180} – ${3800 + i * 200} sq.ft`,
    units: `4 & 5 BHK Private Villa`,
    possession: isOngoing ? "Ongoing" : "Delivered",
    landParcel: "Coastal Enclave",
    reraId: isOngoing ? "K-RERA Compliant" : "Completed • Delivered",
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

// ─── COMBINED PORTFOLIO (Flats Listed Before Villas) ──────────────────
export const ALL_PORTFOLIO: Property[] = [
  ...ACTIVE_PROPERTIES,
  ...SATTVA_PROPERTIES,
  ...VILLA_PROPERTIES,
];

// ─── CURATED ARCHITECTURAL GALLERY PHOTOGRAPHS (Flats Lead First) ───
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-opulence-1",
    title: "Opulence — Architectural Dusk Perspective",
    project: "Opulence by Onyx",
    projectId: "opulence",
    category: "Luxury Flats",
    location: "Kunjibettu, Udupi",
    src: `${CDN}/1.jpeg`,
    aspect: "wide",
  },
  {
    id: "gal-riviera-1",
    title: "Riviera — Mission Compound Facade",
    project: "Riviera by Onyx",
    projectId: "riviera",
    category: "Luxury Flats",
    location: "Mission Compound, Udupi",
    src: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-opulence-2",
    title: "Opulence — Curved Balcony Elevation",
    project: "Opulence by Onyx",
    projectId: "opulence",
    category: "Luxury Flats",
    location: "Kunjibettu, Udupi",
    src: `${CDN}/2.jpeg`,
    aspect: "portrait",
  },
  {
    id: "gal-riviera-2",
    title: "Riviera — Corner Wing & Landscaped Entry",
    project: "Riviera by Onyx",
    projectId: "riviera",
    category: "Luxury Flats",
    location: "Mission Compound, Udupi",
    src: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-opulence-3",
    title: "Opulence — Sky Deck & Courtyard Glow",
    project: "Opulence by Onyx",
    projectId: "opulence",
    category: "Luxury Flats",
    location: "Kunjibettu, Udupi",
    src: `${CDN}/3.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-riviera-3",
    title: "Riviera — Evening Boulevard Perspective",
    project: "Riviera by Onyx",
    projectId: "riviera",
    category: "Luxury Flats",
    location: "Mission Compound, Udupi",
    src: `${CDN}/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-sattva-1",
    title: "A.R. Sattva — Grand Heritage Elevation",
    project: "A.R. Sattva by Onyx",
    projectId: "sattva-1",
    category: "Signature Flats",
    location: "Urban Prime, Udupi",
    src: `${CDN}/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-v4-greens",
    title: "V4 Greens — Tropical Foliage Envelope",
    project: "Onyx Villa 7",
    projectId: "villa-7",
    category: "Private Villas",
    location: "Coastal Belt, Udupi",
    src: `${CDN}/V4%20Greens%20Villa%20Elevation.jpeg`,
    aspect: "landscape",
  },
  {
    id: "gal-sampoorna",
    title: "Sampoorna — Double-Height Courtyard Porch",
    project: "Onyx Villa 6",
    projectId: "villa-6",
    category: "Private Villas",
    location: "Coastal Green Belt, Udupi",
    src: `${CDN}/Sampoorna%20Big%20Villa%20Elevation.jpeg`,
    aspect: "portrait",
  },
];

// ─── VERIFIED CLIENT TESTIMONIALS (from onyxassets.in/about) ─────────
export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    name: "Deepa A",
    tenure: "Homeowner • 3 Years",
    headline: "End-to-end execution from construction to bank loan processing",
    quote:
      "The firm helps with the complete process including bank loan processing, registration, and paperwork. Hassle-free experience, very reliable execution with great taste and quality. Best in Udupi & Mangalore.",
  },
  {
    name: "Anupama Harihar",
    tenure: "Homeowner • 2 Years",
    headline: "Integrity, transparency, and consistent communication",
    quote:
      "Their team is highly professional, responsive, and knowledgeable. They guided us through every step, ensuring a smooth and efficient handover.",
  },
  {
    name: "Raghav",
    tenure: "Homeowner • Udupi",
    headline: "Purchaser-friendly experience led by Mr. Harish Bhat",
    quote:
      "If you are looking in and around Udupi, Onyx Assets is the right choice. Thank you to Mr. Harish Bhat for all the extended support in realizing my first home.",
  },
  {
    name: "Gururaj S",
    tenure: "Investor • 1 Year",
    headline: "Landmark residential locations across Udupi and Manipal",
    quote:
      "Onyx Assets LLP delivers high-class construction quality in amazing localities with dedicated, knowledgeable staff. Strongly recommended for Udupi real estate.",
  },
  {
    name: "Navyashri Rao",
    tenure: "Homeowner",
    headline: "Patience, personal guidance, and relationship beyond business",
    quote:
      "Highly satisfied with our project and grateful to Harish Bhat sir for his patient guidance and support throughout the journey.",
  },
  {
    name: "Krishnaraja",
    tenure: "Homeowner • 3 Years",
    headline: "Punctual delivery and relationship-driven craftsmanship",
    quote:
      "A trusted name for quality construction in Udupi. Professional, punctual, and genuine value delivered on commitment.",
  },
];

// ─── COMPANY STATS ───────────────────────────────────────────────────
export const COMPANY_STATS = [
  { value: "30+", label: "Years Combined Mastery", sub: "Architects & Builders" },
  { value: "100%", label: "Structural Trust", sub: "Zero-compromise Quality" },
  { value: "2", label: "Flagship Flat Launches", sub: "Opulence & Riviera" },
  { value: "70", label: "Luxury Flat Units", sub: "42 Opulence • 28 Riviera" },
];

export const PILLARS = [
  {
    number: "01",
    title: "Promise, Deliver, Exceed",
    tagline: "Realistic commitments fulfilled openly.",
    description:
      "We do not make promises we cannot keep. Every milestone is communicated transparently across structural pouring, K-RERA filings, and handover.",
  },
  {
    number: "02",
    title: "Quality Craftsmanship",
    tagline: "Every finish engineered to last generations.",
    description:
      "Teakwood doors, UPVC French windows, Hindware/Jaquar fixtures, and rigorous structural testing ensure lasting coastal resilience.",
  },
  {
    number: "03",
    title: "Clear Communication",
    tagline: "Total clarity from booking to registration.",
    description:
      "Dedicated guidance across SBI, HDFC, Canara, ICICI & Union Bank home loan processing, registration, and legal paperwork.",
  },
  {
    number: "04",
    title: "Sustainable Craftsmanship",
    tagline: "Eco-conscious materials built for longevity.",
    description:
      "Reticulated gas infrastructure, deep rainwater harvesting tanks, and cross-ventilated floor plans lower long-term maintenance.",
  },
];
