export interface RoomItem {
  id: string;
  name: string;
  category: 'ROOM' | 'SUITE' | 'RESIDENCE';
  tagline: string;
  price: number;
  guests: number;
  bed: string;
  size: string;
  description: string;
  features: string[];
  image: string;
  images: string[];
  view: string;
}

export interface DiningItem {
  id: string;
  name: string;
  tagline: string;
  hours: string;
  cuisine: string;
  dressCode: string;
  description: string;
  image: string;
}

export interface WellnessItem {
  id: string;
  name: string;
  tagline: string;
  hours: string;
  description: string;
  image: string;
}

export interface DestinationItem {
  id: string;
  city: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  status: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hotel' | 'Rooms' | 'Dining' | 'Wellness' | 'Experiences';
  image: string;
  span?: string;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Checked In' | 'Checked Out' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export interface AdminRoom {
  id: string;
  roomNumber: string;
  type: string;
  floor: number;
  price: number;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance' | 'Reserved';
  guestName?: string;
  housekeeping: 'Clean' | 'Dirty' | 'In Progress' | 'Inspection' | 'Ready';
}

export interface GuestProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  totalSpend: number;
  staysCount: number;
  vipStatus: 'Diamond' | 'Platinum' | 'Gold' | 'Member';
  preferences: string[];
  lastStay: string;
}

export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  housekeeper: string;
  status: 'Clean' | 'Dirty' | 'In Progress' | 'Inspection' | 'Ready';
  priority: 'High' | 'Medium' | 'Low';
  lastCleaned: string;
  nextCleaning: string;
}

export interface StaffMember {
  id: string;
  name: string;
  department: 'Front Desk' | 'Housekeeping' | 'Restaurant' | 'Kitchen' | 'Spa' | 'Management' | 'Security';
  role: string;
  shift: 'Morning' | 'Evening' | 'Night';
  attendance: 'Present' | 'On Leave' | 'Scheduled';
  email: string;
}

export interface SpaBooking {
  id: string;
  guestName: string;
  treatment: string;
  therapist: string;
  time: string;
  date: string;
  duration: string;
  price: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  capacity: number;
  location: 'Main Dining' | 'Terrace' | 'Private Room';
  status: 'Available' | 'Reserved' | 'Occupied';
  currentGuest?: string;
  reservationTime?: string;
}

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'sapphire-king',
    name: 'Sapphire King Suite',
    category: 'ROOM',
    tagline: 'Refined comfort with panoramic architectural views',
    price: 650,
    guests: 2,
    bed: 'King Bed',
    size: '65 sq.m / 700 sq.ft',
    description: 'Designed for the discerning traveller, the Sapphire King Suite features hand-stitched leather furnishings, bespoke marble finishes, and floor-to-ceiling glass frame vistas.',
    features: ['Private Balcony', 'Rain Shower & Freestanding Tub', 'Smart Room Controls', 'Custom Bar Cabinet', '24/7 Butler Service'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    view: 'City & Architectural Gardens View'
  },
  {
    id: 'executive-suite',
    name: 'Executive Horizon Suite',
    category: 'SUITE',
    tagline: 'An elevated sanctuary with separate lounge and ocean vistas',
    price: 1200,
    guests: 3,
    bed: 'Super King Bed',
    size: '110 sq.m / 1,180 sq.ft',
    description: 'Offering distinct living and entertaining areas, the Executive Horizon Suite integrates soft ambient illumination, curated artwork, and direct private elevator access.',
    features: ['Expansive Living Room', 'Carrara Marble Spa Bathroom', 'Dyson Supersonic Care', 'Private Dining Nook', 'Executive Lounge Access'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    view: 'Panoramic Skyline & Ocean Sunset View'
  },
  {
    id: 'grand-residence',
    name: 'The Grand Residence',
    category: 'RESIDENCE',
    tagline: 'Two-bedroom architectural masterpiece for ultimate luxury living',
    price: 2800,
    guests: 5,
    bed: '2 King Beds',
    size: '220 sq.m / 2,360 sq.ft',
    description: 'Designed as a private sanctuary in the sky, The Grand Residence incorporates a personal chef kitchen, private outdoor plunge pool, and custom audio visual studio controls.',
    features: ['Private Plunge Pool', 'Personal Chef Kitchen', 'Dedicated VIP Butler', 'Chopard Amenities', 'Dual Master Suites'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    view: '360-Degree Resort & Harbor Panorama'
  },
  {
    id: 'presidential-suite',
    name: 'Presidential Sapphire Penthouse',
    category: 'RESIDENCE',
    tagline: 'The pinnacle of global hospitality across the top penthouse level',
    price: 5500,
    guests: 6,
    bed: '3 Super King Beds',
    size: '450 sq.m / 4,840 sq.ft',
    description: 'Spanning the top floor of Sapphire Grand, this suite boasts a grand piano lounge, private wellness sauna, bulletproof glass terraces, and 24-hour security concierge.',
    features: ['Grand Piano Salon', 'Private In-Suite Spa & Sauna', 'Helipad Access', 'Sommelier Cellar Collection', 'Biometric Entry'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?auto=format&fit=crop&w=1200&q=80'
    ],
    view: 'Highest View Point over Sapphire Grand Grounds'
  }
];

export const DINING_DATA: DiningItem[] = [
  {
    id: 'lorangerie',
    name: 'L’Orangerie Fine Dining',
    tagline: 'Three Michelin-Star Culinary Arts',
    hours: '18:00 — 23:00',
    cuisine: 'Modern French & Mediterranean',
    dressCode: 'Formal Elegance',
    description: 'A sensory journey curated by world-renowned chefs, combining rare seasonal ingredients with delicate artistic presentation.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'horizon-lounge',
    name: 'Horizon Sky Lounge',
    tagline: 'Craft Cocktails Above the Clouds',
    hours: '16:00 — 02:00',
    cuisine: 'Artisanal Mixology & Tapas',
    dressCode: 'Smart Casual',
    description: 'Perched on the 42nd floor, Horizon features rare vintage spirits, live jazz performances, and breathtaking twilight vistas.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'the-conservatory',
    name: 'The Conservatory',
    tagline: 'Sunlit Botanical Breakfast & Tea',
    hours: '06:30 — 15:00',
    cuisine: 'International Artisanal Breakfast',
    dressCode: 'Resort Chic',
    description: 'Enjoy hand-roasted espresso, organic sourdoughs, and exotic fruit displays surrounded by lush glasshouse greenery.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'sapphire-cellar',
    name: 'Sapphire Private Sommelier Cellar',
    tagline: 'Exclusive Vintage Tasting Experience',
    hours: 'By Private Reservation',
    cuisine: 'Tasting Menu & Wine Pairing',
    dressCode: 'Black Tie / Cocktail',
    description: 'Housing over 4,500 rare estate vintages, our master sommelier conducts private candlelight pairings in stone vault dining rooms.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  }
];

export const WELLNESS_DATA: WellnessItem[] = [
  {
    id: 'infinity-pool',
    name: 'Infinity Sky Pool',
    tagline: 'Unbounded horizons overlooking the skyline',
    hours: '06:00 — 22:00',
    description: 'A temperature-controlled 50-meter floating pool lined with Italian volcanic stone and ambient underwater acoustics.',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'thermal-spa',
    name: 'Sapphire Thermal Spa',
    tagline: 'Holistic rejuvenation & ancient healing hydrotherapies',
    hours: '08:00 — 21:00',
    description: 'Indulge in organic botanical rituals, Himalayan salt saunas, ice fountains, and sound therapy pavilions.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'fitness-studio',
    name: 'Technogym ARTIS Studio',
    tagline: 'State-of-the-art movement & personal coaching',
    hours: '24 Hours',
    description: 'Equipped with AI bio-feedback resistance systems, private yoga sun decks, and biophilic air purification.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  }
];

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    tagline: 'Heritage meets contemporary elegance in Mayfair',
    description: 'Concept showcase for Sapphire Grand London, blending historic Victorian architecture with ultra-modern digital twin concierge service.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    status: 'Flagship Concept'
  },
  {
    id: 'new-york',
    city: 'New York',
    country: 'United States',
    tagline: 'Monumental luxury above Central Park',
    description: 'A vertical architectural marvel incorporating sky gardens, private helipad, and Sapphire’s automated room management.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    status: 'Conceptual Development'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Futuristic beachfront sanctuary on Palm Jumeirah',
    description: 'Ultra-luxurious island resort showcasing private yacht docks, digital twin room control, and underwater spa facilities.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    status: 'Flagship Concept'
  },
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    tagline: 'Biophilic garden skyscraper along Marina Bay',
    description: 'An eco-sustainable luxury retreat integrating lush indoor rainforests, solar glass facades, and automated guest dispatching.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    status: 'Conceptual Development'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Architectural Façade & Grand Entrance',
    category: 'Hotel',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2 row-span-2'
  },
  {
    id: 'g2',
    title: 'The Sapphire King Bedroom Lounge',
    category: 'Rooms',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g3',
    title: 'L’Orangerie Evening Dining Ambience',
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g4',
    title: 'Infinity Sky Pool Sunset',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g5',
    title: 'Private Yacht Charter Excursion',
    category: 'Experiences',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80',
    span: 'col-span-2'
  },
  {
    id: 'g6',
    title: 'Grand Marble Foyer & Chandelier',
    category: 'Hotel',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'g7',
    title: 'Sapphire Thermal Spa Himalayan Pavilion',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
  }
];

// ADMIN MOCK DATA
export const ADMIN_KPIS = {
  totalBookings: 1284,
  todayArrivals: 48,
  todayDepartures: 36,
  occupancyRate: 87,
  totalRevenue: 284650,
  availableRooms: 126,
  averageDailyRate: 485,
  revPAR: 421.95
};

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 185000, occupancy: 72 },
  { month: 'Feb', revenue: 210000, occupancy: 78 },
  { month: 'Mar', revenue: 245000, occupancy: 82 },
  { month: 'Apr', revenue: 260000, occupancy: 85 },
  { month: 'May', revenue: 278000, occupancy: 88 },
  { month: 'Jun', revenue: 310000, occupancy: 93 },
  { month: 'Jul', revenue: 345000, occupancy: 96 },
  { month: 'Aug', revenue: 330000, occupancy: 94 },
  { month: 'Sep', revenue: 290000, occupancy: 89 },
  { month: 'Oct', revenue: 275000, occupancy: 86 },
  { month: 'Nov', revenue: 265000, occupancy: 84 },
  { month: 'Dec', revenue: 320000, occupancy: 95 }
];

export const RESERVATIONS_DATA: Reservation[] = [
  { id: 'RES-8941', guestName: 'Alexander Wright', guestEmail: 'a.wright@vanguard.com', roomType: 'Presidential Penthouse', roomNumber: '4201', checkIn: '2026-08-27', checkOut: '2026-09-02', guests: 2, amount: 33000, status: 'Checked In', paymentStatus: 'Paid' },
  { id: 'RES-8942', guestName: 'Elena Rostova', guestEmail: 'elena.r@luxurygroup.fr', roomType: 'The Grand Residence', roomNumber: '3804', checkIn: '2026-08-27', checkOut: '2026-08-30', guests: 4, amount: 8400, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'RES-8943', guestName: 'Marcus Sterling', guestEmail: 'm.sterling@capital.co.uk', roomType: 'Executive Horizon Suite', roomNumber: '2512', checkIn: '2026-08-28', checkOut: '2026-08-31', guests: 2, amount: 3600, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'RES-8944', guestName: 'Dr. Sophia Chen', guestEmail: 'sophia.chen@stanford.edu', roomType: 'Sapphire King Suite', roomNumber: '1408', checkIn: '2026-08-26', checkOut: '2026-08-28', guests: 1, amount: 1300, status: 'Checked In', paymentStatus: 'Paid' },
  { id: 'RES-8945', guestName: 'Liam Vance', guestEmail: 'liam@vancemedia.io', roomType: 'Sapphire King Suite', roomNumber: '1205', checkIn: '2026-08-27', checkOut: '2026-08-29', guests: 2, amount: 1300, status: 'Pending', paymentStatus: 'Pending' },
  { id: 'RES-8946', guestName: 'Claire Beauchamp', guestEmail: 'c.beauchamp@geneva-art.ch', roomType: 'Executive Horizon Suite', roomNumber: '2602', checkIn: '2026-08-25', checkOut: '2026-08-27', guests: 2, amount: 2400, status: 'Checked Out', paymentStatus: 'Paid' },
  { id: 'RES-8947', guestName: 'Hiroshi Tanaka', guestEmail: 'tanaka@tokyoprimes.jp', roomType: 'The Grand Residence', roomNumber: '3901', checkIn: '2026-08-30', checkOut: '2026-09-05', guests: 3, amount: 16800, status: 'Confirmed', paymentStatus: 'Paid' },
  { id: 'RES-8948', guestName: 'Amara Diop', guestEmail: 'amara.diop@africafund.org', roomType: 'Sapphire King Suite', roomNumber: '1104', checkIn: '2026-08-27', checkOut: '2026-08-28', guests: 1, amount: 650, status: 'Cancelled', paymentStatus: 'Refunded' }
];

export const ROOMS_ADMIN_DATA: AdminRoom[] = [
  { id: 'r1', roomNumber: '4201', type: 'Presidential Penthouse', floor: 42, price: 5500, status: 'Occupied', guestName: 'Alexander Wright', housekeeping: 'Clean' },
  { id: 'r2', roomNumber: '3804', type: 'The Grand Residence', floor: 38, price: 2800, status: 'Reserved', guestName: 'Elena Rostova', housekeeping: 'Ready' },
  { id: 'r3', roomNumber: '2512', type: 'Executive Horizon Suite', floor: 25, price: 1200, status: 'Reserved', guestName: 'Marcus Sterling', housekeeping: 'Inspection' },
  { id: 'r4', roomNumber: '1408', type: 'Sapphire King Suite', floor: 14, price: 650, status: 'Occupied', guestName: 'Dr. Sophia Chen', housekeeping: 'Clean' },
  { id: 'r5', roomNumber: '1205', type: 'Sapphire King Suite', floor: 12, price: 650, status: 'Cleaning', housekeeping: 'In Progress' },
  { id: 'r6', roomNumber: '2602', type: 'Executive Horizon Suite', floor: 26, price: 1200, status: 'Cleaning', housekeeping: 'Dirty' },
  { id: 'r7', roomNumber: '1104', type: 'Sapphire King Suite', floor: 11, price: 650, status: 'Available', housekeeping: 'Ready' },
  { id: 'r8', roomNumber: '3102', type: 'Executive Horizon Suite', floor: 31, price: 1200, status: 'Maintenance', housekeeping: 'Dirty' }
];

export const GUESTS_DATA: GuestProfile[] = [
  { id: 'g1', name: 'Alexander Wright', email: 'a.wright@vanguard.com', phone: '+1 212 555 0192', country: 'United States', totalSpend: 142000, staysCount: 12, vipStatus: 'Diamond', preferences: ['High Floor', 'Quiet Suite', 'Dom Pérignon 2012', 'Feather Pillows'], lastStay: '2026-08-27' },
  { id: 'g2', name: 'Elena Rostova', email: 'elena.r@luxurygroup.fr', phone: '+33 1 42 68 55 00', country: 'France', totalSpend: 86500, staysCount: 8, vipStatus: 'Platinum', preferences: ['Ocean View', 'Organic Spa Products', 'Late Check-out'], lastStay: '2026-08-27' },
  { id: 'g3', name: 'Marcus Sterling', email: 'm.sterling@capital.co.uk', phone: '+44 20 7946 0912', country: 'United Kingdom', totalSpend: 54000, staysCount: 5, vipStatus: 'Gold', preferences: ['Private Airport Transfer', 'Sparkling Water'], lastStay: '2026-08-28' },
  { id: 'g4', name: 'Dr. Sophia Chen', email: 'sophia.chen@stanford.edu', phone: '+1 650 555 0143', country: 'United States', totalSpend: 19200, staysCount: 3, vipStatus: 'Member', preferences: ['Non-Smoking', 'Desk Setup'], lastStay: '2026-08-26' }
];

export const HOUSEKEEPING_DATA: HousekeepingTask[] = [
  { id: 'h1', roomNumber: '2602', housekeeper: 'Maria Santos', status: 'Dirty', priority: 'High', lastCleaned: '2026-08-25 11:00', nextCleaning: '2026-08-27 14:00' },
  { id: 'h2', roomNumber: '1205', housekeeper: 'Jean-Luc Moreau', status: 'In Progress', priority: 'High', lastCleaned: '2026-08-26 10:00', nextCleaning: '2026-08-27 13:30' },
  { id: 'h3', roomNumber: '2512', housekeeper: 'Anna Kovacs', status: 'Inspection', priority: 'Medium', lastCleaned: '2026-08-27 11:30', nextCleaning: '2026-08-27 12:30' },
  { id: 'h4', roomNumber: '3102', housekeeper: 'Maintenance Team', status: 'Dirty', priority: 'High', lastCleaned: '2026-08-24 15:00', nextCleaning: '2026-08-27 16:00' }
];

export const STAFF_DATA: StaffMember[] = [
  { id: 's1', name: 'Guillaume Bernard', department: 'Management', role: 'General Manager', shift: 'Morning', attendance: 'Present', email: 'g.bernard@sapphiregrand.com' },
  { id: 's2', name: 'Victoria Thorne', department: 'Front Desk', role: 'Head Concierge', shift: 'Morning', attendance: 'Present', email: 'v.thorne@sapphiregrand.com' },
  { id: 's3', name: 'Chef Laurent Mercier', department: 'Kitchen', role: 'Executive Chef', shift: 'Evening', attendance: 'Scheduled', email: 'l.mercier@sapphiregrand.com' },
  { id: 's4', name: 'Maria Santos', department: 'Housekeeping', role: 'Housekeeping Supervisor', shift: 'Morning', attendance: 'Present', email: 'm.santos@sapphiregrand.com' },
  { id: 's5', name: 'Camilla Rossi', department: 'Spa', role: 'Spa Director', shift: 'Morning', attendance: 'Present', email: 'c.rossi@sapphiregrand.com' }
];

export const SPA_BOOKINGS_DATA: SpaBooking[] = [
  { id: 'sp1', guestName: 'Alexander Wright', treatment: 'Couples Sapphire Himalayan Ritual', therapist: 'Camilla Rossi', time: '15:00', date: '2026-08-27', duration: '90 min', price: 750, status: 'Confirmed' },
  { id: 'sp2', guestName: 'Elena Rostova', treatment: 'Deep Tissue Botanical Therapy', therapist: 'Kenji Sato', time: '17:30', date: '2026-08-27', duration: '60 min', price: 380, status: 'Confirmed' },
  { id: 'sp3', guestName: 'Claire Beauchamp', treatment: 'Diamond Glow Anti-Aging Facial', therapist: 'Elena Vance', time: '11:00', date: '2026-08-27', duration: '75 min', price: 420, status: 'Completed' }
];
