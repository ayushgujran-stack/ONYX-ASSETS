// All architectural images sourced from Onyx Assets LLP official CDN (img1.wsimg.com)
// Verified specifications, unit sizes, proximities, and K-RERA numbers extracted from official Opulence & Riviera brochures.
export const CDN = "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e";

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
  category: "tower" | "riverfront" | "suite";
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
  category: "Luxury Towers" | "Riverfront Residences" | "Signature Suites";
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
      "French Windows in UPVC with clear acoustic glazing",
      "Open floor plan with expansive living & dining bays",
      "Dedicated Wi-Fi and adequate TV points in living room",
      "Expansive cantilevered balcony in living / dining room",
    ],
  },
  {
    title: "Kitchen & Dining",
    items: [
      "Premium quality granite kitchen counter slab",
      "Reticulated piped gas terminal with individual meter",
      "Stainless steel sink with dedicated utility space",
      "Washing machine point in dry utility balcony",
      "Adequate heavy-duty appliance power points",
    ],
  },
  {
    title: "Bedrooms",
    items: [
      "2x4 ft vitrified tile flooring throughout",
      "Flush doors across all bedroom suites",
      "Modular switches with concealed PVC provision for A.C.",
      "Dedicated private balcony & TV point in Master Bedroom",
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

// ─── ONGOING RESIDENTIAL APARTMENT LAUNCHES ─────────────────────────
export const ACTIVE_PROPERTIES: Property[] = [
  {
    id: "opulence",
    name: "Opulence by Onyx",
    tagline: "The Pinnacle of High-Rise Living in Kunjibettu",
    category: "tower",
    projectPhase: "ongoing",
    status: "Newly Launched",
    location: "Kunjibettu, Shivalli, Udupi, Karnataka",
    mapQuery: "Kunjibettu, Udupi, Karnataka",
    area: "956 – 1,968 sq.ft SBA",
    units: "2, 3 & 4 BHK Luxury Apartments",
    totalUnits: "42 Exclusive Apartments",
    possession: "Possession Dec 2027",
    landParcel: "Kunjibettu • 7 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/160426/008587",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "A 42-unit landmark 7-storey apartment tower in the prestigious Kunjibettu corridor of Udupi. Opulence pairs spacious 2, 3 & 4 BHK flats featuring up to 4 balconies with a signature top-floor Sports Arena, yoga & fitness gym, and seamless proximity to MGM College and Manipal.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
    gallery: [
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg",
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
      "Reticulated Gas Supply with Individual Meter",
      "Up to 4 Balconies in 3 & 4 BHK Units",
      "24-Hour Water, Generator Backup & CCTV Security",
      "CREDAI Udupi Member Development",
    ],
    brochureUrl:
      "https://img1.wsimg.com/blobby/go/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/Opulence%20New%20(1).pdf",
    price: "Pricing on Request",
  },
  {
    id: "riviera",
    name: "Riviera by Onyx",
    tagline: "Riverfront Residences in Mission Compound",
    category: "riverfront",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Mission Compound, Chitpady, Udupi, Karnataka",
    mapQuery: "Mission Compound, Udupi, Karnataka",
    area: "680 – 1,560 sq.ft SBA",
    units: "1, 2 & 3 BHK Riverfront Apartments",
    totalUnits: "28 Scenic Apartments",
    possession: "Possession by 2027",
    landParcel: "Mission Compound • 6 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/261125/008279",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "Nestled in the prestigious Mission Compound corridor, Riviera is a 28-unit waterfront apartment development combining tranquil riverine surroundings, sweeping view decks, a rooftop Sports Arena, and walking proximity to Ajjarkad Park and TMA Pai Hospital.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
    gallery: [
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg",
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
  {
    id: "onyx-azure",
    name: "Onyx Azure Heights",
    tagline: "14-Storey Coastal Sky Tower with Panoramic Ocean Terraces",
    category: "tower",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Brahmagiri Heights, Udupi, Karnataka",
    mapQuery: "Brahmagiri, Udupi, Karnataka",
    area: "1,650 – 2,850 sq.ft SBA",
    units: "3 & 4 BHK Sky Apartments",
    totalUnits: "48 Luxury High-Rise Flats",
    possession: "Possession 2028",
    landParcel: "Brahmagiri • 14 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/190528/009142",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "Rising 14 storeys above the coastal palm ridge, Onyx Azure Heights represents contemporary high-rise excellence. Features champagne bronze architectural louvers, floor-to-ceiling glass balconies, an infinity sky deck, and sweeping sunset panoramas.",
    image: "/assets/estates/onyx_azure_heights.jpg",
    gallery: [
      "/assets/estates/onyx_azure_heights.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
    ],
    features: [
      "14-Storey Monumental Tower Architecture",
      "Infinity Rooftop Sky Deck with Sunset Views",
      "Double-Height Glass Entrance Lobby",
      "Private Elevators & High-Speed Lifts",
      "Integrated EV Charging Bays",
    ],
    price: "Inquire for Availability",
  },
  {
    id: "onyx-meridian",
    name: "Onyx Meridian Towers",
    tagline: "12-Storey Landmark with Fluted Limestone & Cantilever Sky Gardens",
    category: "tower",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Manipal Greens Corridor, Karnataka",
    mapQuery: "Manipal, Karnataka",
    area: "1,520 – 2,650 sq.ft SBA",
    units: "3 & 4 BHK Executive Suites",
    totalUnits: "54 High-Rise Residences",
    possession: "Possession 2028",
    landParcel: "Manipal Corridor • 12 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/210828/009385",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "A 12-storey architectural statement featuring fluted warm limestone facades, vertical cantilever sky gardens, glass-wrapped living chambers, and an illuminated motor court with reflective fountain pools in the heart of Manipal.",
    image: "/assets/estates/onyx_meridian_towers.jpg",
    gallery: [
      "/assets/estates/onyx_meridian_towers.jpg",
      "/assets/estates/onyx_celestia_sky_residences.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg",
    ],
    features: [
      "Integrated Cascading Vertical Sky Gardens",
      "Reflective Fountain Plaza & Motor Court",
      "Smart-Home Integrated Climate Systems",
      "24/7 Concierge & Executive Business Lounge",
      "Full Seismic-Resistant RCC Engineering",
    ],
    price: "Pricing on Request",
  },
  {
    id: "onyx-riverview",
    name: "Onyx Riverview Atrium",
    tagline: "10-Storey Curvilinear Riverfront Residences & Promenade",
    category: "riverfront",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Kallianpur Waterfront, Udupi, Karnataka",
    mapQuery: "Kallianpur, Udupi, Karnataka",
    area: "1,420 – 2,400 sq.ft SBA",
    units: "2 & 3 BHK Riverfront Flats",
    totalUnits: "40 Waterfront Residences",
    possession: "Possession 2027",
    landParcel: "Kallianpur Waterfront • 10 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/241027/009614",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "An organic 10-storey curvilinear waterfront tower featuring sweeping wave-pattern balconies with glowing infinity LED ribbons. Sits directly upon an illuminated palm riverfront promenade overlooking coastal river waters.",
    image: "/assets/estates/onyx_riverview_atrium.jpg",
    gallery: [
      "/assets/estates/onyx_riverview_atrium.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg",
    ],
    features: [
      "10-Storey Curvilinear Wave Architecture",
      "Direct Private Waterfront Boardwalk Access",
      "Glowing Infinity LED Cove Balconies",
      "Panoramic Floor-to-Ceiling Thermal Glass",
      "Deep Rainwater Recharge System",
    ],
    price: "Inquire for Availability",
  },
  {
    id: "onyx-celestia",
    name: "Onyx Celestia Sky Residences",
    tagline: "16-Storey Ultra-Luxury High-Rise with Crown Glass Penthouses",
    category: "tower",
    projectPhase: "ongoing",
    status: "Newly Launched",
    location: "Ambalpady Ridge, Udupi, Karnataka",
    mapQuery: "Ambalpady, Udupi, Karnataka",
    area: "1,850 – 3,400 sq.ft SBA",
    units: "3 & 4 BHK Sky Penthouses",
    totalUnits: "36 Crown Residences",
    possession: "Possession 2029",
    landParcel: "Ambalpady Ridge • 16 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/110129/009840",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "A monumental 16-storey ultra-luxury residential skyscraper commanding 360-degree views of the Arabian Sea and Western Ghats. Boasts double-height crown sky penthouses, illuminated bronze mullions, and private cantilevered deck lounges.",
    image: "/assets/estates/onyx_celestia_sky_residences.jpg",
    gallery: [
      "/assets/estates/onyx_celestia_sky_residences.jpg",
      "/assets/estates/onyx_azure_heights.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
    ],
    features: [
      "16-Storey Monumental Luxury Skyscraper",
      "Double-Height Crown Glass Penthouses",
      "Grand Motor Court with Water Choreography",
      "Private Residents Sky Club & Temperature-Controlled Pool",
      "Advanced 3-Tier Security & Biometric Access",
    ],
    price: "Pricing on Request",
  },
  {
    id: "onyx-palm-vista",
    name: "Onyx Palm Vista Towers",
    tagline: "10-Storey Coastal Residences Amidst Verdant Palm Groves",
    category: "tower",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Kinnimulky Coastal Corridor, Udupi, Karnataka",
    mapQuery: "Kinnimulky, Udupi, Karnataka",
    area: "1,350 – 2,150 sq.ft SBA",
    units: "2 & 3 BHK Modern Living",
    totalUnits: "40 Coastal Apartments",
    possession: "Possession 2027",
    landParcel: "Kinnimulky • 10 Floors",
    reraId: "PRM/KA/RERA/1273/318/PR/140727/008892",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "Crafted with warm sand-toned textured concrete and undulating glass balustrades, Onyx Palm Vista rises 10 storeys amidst lush coastal palms with an open stilt entrance lobby and private pool deck.",
    image: "/assets/estates/onyx_palm_vista_towers.jpg",
    gallery: [
      "/assets/estates/onyx_palm_vista_towers.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg",
    ],
    features: [
      "10-Storey Sand-Toned Architectural Concrete",
      "Undulating Corner Glass Balconies",
      "Ground-Level Resort Swimming Pool & Deck",
      "Cross-Ventilated Vastu Architectural Planning",
      "Private Covered Basement Parking",
    ],
    price: "Inquire for Availability",
  },
  {
    id: "riviera-suites",
    name: "Riviera Waterfront Suites",
    tagline: "Signature Riverside Wing Overlooking Mangrove Estuaries",
    category: "riverfront",
    projectPhase: "ongoing",
    status: "Ongoing",
    location: "Mission Compound Waterfront, Udupi, Karnataka",
    mapQuery: "Mission Compound, Udupi, Karnataka",
    area: "1,200 – 1,880 sq.ft SBA",
    units: "2 & 3 BHK Riverfront Suites",
    totalUnits: "24 Exclusive Suites",
    possession: "Possession 2027",
    landParcel: "Mission Compound • Waterfront Wing",
    reraId: "PRM/KA/RERA/1273/318/PR/261125/008280",
    reraUrl: "https://rera.karnataka.gov.in/",
    description:
      "The dedicated riverfront wing of the Riviera development. Oriented towards morning breezes and twilight reflections across Udupi's calm water corridors, offering private sunrise breakfast decks.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg",
    gallery: [
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-3.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
    ],
    features: [
      "Unobstructed Riverine Sunrise Balconies",
      "Acoustic Double Glazing for Absolute Serenity",
      "Direct Promenade & Jogging Track Access",
      "Dedicated EV Charging Points",
      "Exclusive Rooftop Solarium Lounge",
    ],
    price: "Inquire for Availability",
  },
];

// ─── COMPLETED SIGNATURE APARTMENTS & SUITES ─────────────────────────
export const SATTVA_PROPERTIES: Property[] = [
  {
    id: "sattva-1",
    name: "A.R. Sattva by Onyx",
    tagline: "Timeless Heritage Apartment Landmark Crafted with Modern Purity",
    category: "suite",
    projectPhase: "completed",
    status: "Sold",
    location: "Alevoor Corridor, Udupi, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "1,950 – 2,900 sq.ft",
    units: "3 BHK Premium Apartments",
    totalUnits: "32 Completed Units",
    possession: "Delivered",
    landParcel: "Urban Prime • 5 Floors",
    reraId: "Completed • Delivered",
    description:
      "A testament to structural honesty and serene simplicity. A.R. Sattva harmonizes coastal Karnataka's ventilation principles with high-end European fittings, expansive balconies, and Vastu-compliant spatial planning.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg",
    gallery: [
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
    ],
    features: [
      "Vastu-Compliant Master Orientation",
      "Acoustic Glass Windows & Thermal Insulation",
      "Deep Rainwater Harvesting Integration",
      "Designer Kitchens with Granite Slabs",
    ],
    price: "Sold Out / Resale Inquiries",
  },
  {
    id: "sattva-2",
    name: "A.R. Sattva — Courtyard Wing",
    tagline: "Natural Light. Pure Form. Coastal Calm.",
    category: "suite",
    projectPhase: "completed",
    status: "Sold",
    location: "Alevoor Corridor, Udupi, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "2,100 sq.ft",
    units: "3 BHK Corner Flats",
    totalUnits: "16 Completed Suites",
    possession: "Delivered",
    landParcel: "Urban Prime • East Wing",
    reraId: "Completed • Delivered",
    description:
      "Part of the Sattva collection — a curated series of homes where every proportion, material, and threshold reflects a deep philosophy of simplicity and permanence.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
    gallery: ["https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg", "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg"],
    features: [
      "Open Courtyard Architecture",
      "High Ceilings with Clerestory Glazing",
      "Thermally Efficient Cavity Walls",
    ],
    price: "Sold",
  },
  {
    id: "sattva-3",
    name: "A.R. Sattva — Teak Atrium",
    tagline: "Where Restraint Becomes Grandeur",
    category: "suite",
    projectPhase: "completed",
    status: "Sold",
    location: "Alevoor Corridor, Udupi, Karnataka",
    mapQuery: "Udupi, Karnataka",
    area: "2,250 sq.ft",
    units: "3 BHK Atelier Flats",
    totalUnits: "12 Completed Suites",
    possession: "Delivered",
    landParcel: "Urban Prime • West Wing",
    reraId: "Completed • Delivered",
    description:
      "The third in the Sattva signature series. Understated materials — terracotta, pale stone, lacquered teak — create an apartment home that reveals its luxury upon close inspection.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg",
    gallery: ["https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg", "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg"],
    features: [
      "Lacquered Teak Joinery",
      "Concealed LED Architectural Lighting",
      "Terracotta Facade Heat Shields",
    ],
    price: "Sold",
  },
  {
    id: "onyx-grandview",
    name: "Onyx Grandview Residences",
    tagline: "Grand Multi-Storey Residential Complex at Bannanje Circle",
    category: "suite",
    projectPhase: "completed",
    status: "Completed",
    location: "Bannanje Circle, Udupi, Karnataka",
    mapQuery: "Bannanje, Udupi, Karnataka",
    area: "1,750 – 2,450 sq.ft",
    units: "3 BHK Premium Suites",
    totalUnits: "24 Completed Units",
    possession: "Delivered",
    landParcel: "Bannanje Prime • 5 Floors",
    reraId: "Completed • Delivered",
    description:
      "A completed monumental multi-storey residential building at Bannanje Circle. Delivers expansive 3 BHK suites with private utility yards and dedicated covered stilt parking.",
    image: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
    gallery: ["https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg", "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg"],
    features: [
      "Central Urban Connectivity",
      "Generous Balcony Proportions",
      "Full Generator Power Backup",
      "24-Hour Pressurized Water Supply",
    ],
    price: "Completed • Delivered",
  },
  {
    id: "onyx-zenith",
    name: "Onyx Zenith Towers",
    tagline: "Modern High-Rise Apartment Living with Engineered Rigor",
    category: "tower",
    projectPhase: "completed",
    status: "Completed",
    location: "Diana Circle, Udupi, Karnataka",
    mapQuery: "Diana Circle, Udupi, Karnataka",
    area: "1,480 – 2,200 sq.ft",
    units: "2 & 3 BHK Urban Residences",
    totalUnits: "36 Completed Units",
    possession: "Delivered",
    landParcel: "Diana Circle • 7 Floors",
    reraId: "Completed • Delivered",
    description:
      "Engineered for urban professionals and families, Onyx Zenith Towers stands 7 storeys tall with clean structural lines, modern passenger lifts, and acoustic sound insulation.",
    image: "/assets/estates/onyx_azure_heights.jpg",
    gallery: [
      "/assets/estates/onyx_azure_heights.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/3.jpeg",
    ],
    features: [
      "7-Storey Urban High-Rise Design",
      "High-Speed Automatic Passenger Lifts",
      "Intercom Security & CCTV Surveillance",
      "Rooftop Community Gathering Pavilion",
    ],
    price: "Completed • Delivered",
  },
  {
    id: "onyx-horizon",
    name: "Onyx Horizon Promenade",
    tagline: "Coastal Promenade Apartments with Sea-Breeze Architecture",
    category: "riverfront",
    projectPhase: "completed",
    status: "Completed",
    location: "Malpe Promenade, Udupi, Karnataka",
    mapQuery: "Malpe, Udupi, Karnataka",
    area: "1,600 – 2,500 sq.ft",
    units: "3 & 4 BHK Coastal Flats",
    totalUnits: "20 Completed Units",
    possession: "Delivered",
    landParcel: "Malpe Promenade • 5 Floors",
    reraId: "Completed • Delivered",
    description:
      "A prestigious completed coastal apartment development near the Malpe waterfront promenade, featuring deep shaded verandas and weather-resistant marine-grade architectural finishes.",
    image: "/assets/estates/onyx_riverview_atrium.jpg",
    gallery: [
      "/assets/estates/onyx_riverview_atrium.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
    ],
    features: [
      "Direct Coastal Sea-Breeze Cross Ventilation",
      "Marine-Grade Exterior Coatings",
      "Deep Sun-Shaded Private Verandas",
      "Dedicated Landscaped Ground Courtyard",
    ],
    price: "Completed • Delivered",
  },
  {
    id: "onyx-solitaire",
    name: "Onyx Solitaire Towers",
    tagline: "Hilltop Architectural Apartments with Elevated Vistas",
    category: "suite",
    projectPhase: "completed",
    status: "Completed",
    location: "Indrali Hilltop, Udupi, Karnataka",
    mapQuery: "Indrali, Udupi, Karnataka",
    area: "1,550 – 2,300 sq.ft",
    units: "2 & 3 BHK Luxury Suites",
    totalUnits: "28 Completed Units",
    possession: "Delivered",
    landParcel: "Indrali Hill • 6 Floors",
    reraId: "Completed • Delivered",
    description:
      "Situated upon the elevated ridge of Indrali, Onyx Solitaire delivers peaceful hilltop living with unobstructed valley vistas, high ceilings, and premium imported sanitary ware.",
    image: "/assets/estates/onyx_meridian_towers.jpg",
    gallery: [
      "/assets/estates/onyx_meridian_towers.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/2.jpeg",
    ],
    features: [
      "Elevated Ridge Topography & Panoramic Views",
      "Premium Imported Vitrified Tiles & Fittings",
      "Rainwater Recharge & Eco-Conscious Lighting",
      "Covered Stilt & Open Guest Parking",
    ],
    price: "Completed • Delivered",
  },
  {
    id: "onyx-royale",
    name: "Onyx Royale Residences",
    tagline: "Completed Monumental Apartment Tower in Court Road Corridor",
    category: "tower",
    projectPhase: "completed",
    status: "Completed",
    location: "Court Back Road, Udupi, Karnataka",
    mapQuery: "Court Road, Udupi, Karnataka",
    area: "1,800 – 2,750 sq.ft",
    units: "3 & 4 BHK Royal Residences",
    totalUnits: "32 Completed Units",
    possession: "Delivered",
    landParcel: "Court Road • 7 Floors",
    reraId: "Completed • Delivered",
    description:
      "A completed 7-storey luxury apartment residence featuring a grand double-height entrance reception, granite-clad public corridors, and spacious family room layouts.",
    image: "/assets/estates/onyx_celestia_sky_residences.jpg",
    gallery: [
      "/assets/estates/onyx_celestia_sky_residences.jpg",
      "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
    ],
    features: [
      "Grand Double-Height Entrance Reception",
      "Granite & Italian Marble Public Corridors",
      "Top-Tier Acoustic Insulation Between Floors",
      "Round-the-Clock Dedicated Concierge & Maintenance",
    ],
    price: "Completed • Delivered",
  },
];

// ─── COMBINED PORTFOLIO (16 All-Apartment Developments) ──────────────
export const ALL_PORTFOLIO: Property[] = [
  ...ACTIVE_PROPERTIES,
  ...SATTVA_PROPERTIES,
];

// ─── CURATED MASTERPIECES (6 Flagship High-Rises for Homepage) ───────
export const CURATED_MASTERPIECES: Property[] = [
  ALL_PORTFOLIO[0], // Opulence by Onyx
  ALL_PORTFOLIO[1], // Riviera by Onyx
  ALL_PORTFOLIO[2], // Onyx Azure Heights
  ALL_PORTFOLIO[3], // Onyx Meridian Towers
  ALL_PORTFOLIO[4], // Onyx Riverview Atrium
  ALL_PORTFOLIO[5], // Onyx Celestia Sky Residences
];

// ─── ALL PROPERTIES for slider ───────────────────────────────────────
export const PROPERTIES: Property[] = [...CURATED_MASTERPIECES];

// ─── CURATED ARCHITECTURAL GALLERY PHOTOGRAPHS (100% Apartments) ─────
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "gal-opulence-1",
    title: "Opulence — 7-Storey Architectural Dusk Perspective",
    project: "Opulence by Onyx",
    projectId: "opulence",
    category: "Luxury Towers",
    location: "Kunjibettu, Udupi",
    src: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/1.jpeg",
    aspect: "wide",
  },
  {
    id: "gal-riviera-1",
    title: "Riviera — Riverfront Mission Compound Facade",
    project: "Riviera by Onyx",
    projectId: "riviera",
    category: "Riverfront Residences",
    location: "Mission Compound, Udupi",
    src: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38.jpeg",
    aspect: "landscape",
  },
  {
    id: "gal-azure-1",
    title: "Onyx Azure Heights — 14-Storey Coastal Sky Tower",
    project: "Onyx Azure Heights",
    projectId: "onyx-azure",
    category: "Luxury Towers",
    location: "Brahmagiri Heights, Udupi",
    src: "/assets/estates/onyx_azure_heights.jpg",
    aspect: "portrait",
  },
  {
    id: "gal-meridian-1",
    title: "Onyx Meridian — Fluted Limestone & Sky Gardens",
    project: "Onyx Meridian Towers",
    projectId: "onyx-meridian",
    category: "Luxury Towers",
    location: "Manipal Greens Corridor",
    src: "/assets/estates/onyx_meridian_towers.jpg",
    aspect: "portrait",
  },
  {
    id: "gal-celestia-1",
    title: "Onyx Celestia — 16-Storey Crown Sky Penthouses",
    project: "Onyx Celestia Sky Residences",
    projectId: "onyx-celestia",
    category: "Luxury Towers",
    location: "Ambalpady Ridge, Udupi",
    src: "/assets/estates/onyx_celestia_sky_residences.jpg",
    aspect: "portrait",
  },
  {
    id: "gal-riverview-1",
    title: "Onyx Riverview — Water Reflections & Promenade",
    project: "Onyx Riverview Atrium",
    projectId: "onyx-riverview",
    category: "Riverfront Residences",
    location: "Kallianpur Waterfront",
    src: "/assets/estates/onyx_riverview_atrium.jpg",
    aspect: "portrait",
  },
  {
    id: "gal-palm-1",
    title: "Onyx Palm Vista — Undulating Coastal Balconies",
    project: "Onyx Palm Vista Towers",
    projectId: "onyx-palm-vista",
    category: "Luxury Towers",
    location: "Kinnimulky, Udupi",
    src: "/assets/estates/onyx_palm_vista_towers.jpg",
    aspect: "portrait",
  },
  {
    id: "gal-sattva-1",
    title: "A.R. Sattva — Completed Heritage Apartment Landmark",
    project: "A.R. Sattva by Onyx",
    projectId: "sattva-1",
    category: "Signature Suites",
    location: "Alevoor Corridor, Udupi",
    src: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202024-04-25%20at%201.17.26%20PM.jpeg",
    aspect: "landscape",
  },
  {
    id: "gal-riviera-2",
    title: "Riviera — Sunset Waterfront Wing",
    project: "Riviera by Onyx",
    projectId: "riviera",
    category: "Riverfront Residences",
    location: "Mission Compound, Udupi",
    src: "https://img1.wsimg.com/isteam/ip/7e14b4a8-9a34-427d-8eef-b5c2635b8f6e/WhatsApp%20Image%202025-07-08%20at%2008.08.38-2.jpeg",
    aspect: "landscape",
  },
];

// ─── VERIFIED CLIENT TESTIMONIALS (from onyxassets.in/about) ─────────
export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    name: "Deepa A",
    tenure: "Opulence Enclave • Homeowner (3 Yrs)",
    headline: "End-to-end execution from construction to bank loan processing",
    quote:
      "The firm helps with the complete process including bank loan processing, registration, and paperwork. Hassle-free experience, very reliable execution with great taste and quality. Best in Udupi & Mangalore.",
  },
  {
    name: "Anupama Harihar",
    tenure: "Riviera Residences • Homeowner (2 Yrs)",
    headline: "Integrity, transparency, and consistent communication",
    quote:
      "Their team is highly professional, responsive, and knowledgeable. They guided us through every step, ensuring a smooth and efficient handover.",
  },
  {
    name: "Raghav",
    tenure: "A.R. Sattva • First-Time Homeowner",
    headline: "Purchaser-friendly experience led by Mr. Harish Bhat",
    quote:
      "If you are looking in and around Udupi, Onyx Assets is the right choice. Thank you to Mr. Harish Bhat for all the extended support in realizing my first home.",
  },
  {
    name: "Gururaj S",
    tenure: "Manipal Corridor • Portfolio Investor",
    headline: "Landmark residential locations across Udupi and Manipal",
    quote:
      "Onyx Assets LLP delivers high-class construction quality in amazing localities with dedicated, knowledgeable staff. Strongly recommended for Udupi real estate.",
  },
  {
    name: "Navyashri Rao",
    tenure: "Udupi Enclave • Homeowner",
    headline: "Patience, personal guidance, and relationship beyond business",
    quote:
      "Highly satisfied with our project and grateful to Harish Bhat sir for his patient guidance and support throughout the journey.",
  },
  {
    name: "Krishnaraja",
    tenure: "Signature Towers • Homeowner (3 Yrs)",
    headline: "Punctual delivery and relationship-driven craftsmanship",
    quote:
      "A trusted name for quality construction in Udupi. Professional, punctual, and genuine value delivered on commitment.",
  },
];

// ─── COMPANY STATS ───────────────────────────────────────────────────
export const COMPANY_STATS = [
  { value: "30+", label: "Years Combined Mastery", sub: "Architects & Builders" },
  { value: "100%", label: "Structural Trust", sub: "Zero-compromise Quality" },
  { value: "16", label: "Masterpiece Developments", sub: "Towers, Waterfront & Suites" },
  { value: "500+", label: "Satisfied Homeowners", sub: "Across Udupi & Manipal" },
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
