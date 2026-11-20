import type { Category, Order, Product, Profile } from '../api/types';

export const categories: Category[] = [
  { id: 'mobility-aids', name: 'Mobility Aids', description: 'Wheelchairs, walkers and walking sticks', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85' },
  { id: 'hearing-assistance', name: 'Hearing Assistance', description: 'Rechargeable aids and listening devices', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85' },
  { id: 'vision-reading', name: 'Vision & Reading', description: 'Braille displays, readers and magnifiers', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=900&q=85' },
  { id: 'daily-living', name: 'Daily Living', description: 'Adaptive tools for comfortable routines', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85' },
  { id: 'communication', name: 'Communication', description: 'Speech, voice and communication aids', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85' },
  { id: 'accessible-learning', name: 'Accessible Learning', description: 'Inclusive tools for reading and learning', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85' },
];

export const products: Product[] = [
  {
    id: 'folding-wheelchair', name: 'Lightweight Folding Wheelchair', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'Freedom Mobility',
    price: 489, rentalRates: { daily: 18, weekly: 110, monthly: 340 }, rating: 4.9, reviews: 184,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=85',
    description: 'A dependable, easy-fold companion with supportive seating and a lightweight aircraft-grade frame for days out and travel.',
    specs: { 'Weight capacity': '300 lb', 'Product weight': '34 lb', 'Folded width': '12 in', 'Seat width': '18 in', 'Frame': 'Aircraft-grade aluminium', 'Accessibility': 'Flip-back arms · swing-away footrests' },
    primaryUse: 'Mobility', weight: '34 lb', featured: true,
  },
  {
    id: 'clearsound-hearing-aids', name: 'ClearSound Rechargeable Hearing Aids', category: 'Hearing Assistance', categoryId: 'hearing-assistance', vendor: 'ClearHear',
    price: 799, rentalRates: { daily: 24, weekly: 96, monthly: 96 }, rating: 4.8, reviews: 126,
    image: 'https://images.unsplash.com/photo-1587560699334-bea933604b25?auto=format&fit=crop&w=1000&q=85',
    description: 'Comfortable rechargeable hearing support with simple controls, clear conversations and a compact charging case.',
    specs: { 'Battery life': 'Up to 24 hours', 'Charging time': '3 hours', 'Fit': 'Behind the ear', 'Programs': '4 listening modes', 'Connectivity': 'Bluetooth compatible' },
    primaryUse: 'Hearing support', weight: '0.2 oz', featured: true,
  },
  {
    id: 'hable-one', name: 'Hable One Braille Display', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'HumanWare',
    price: 1249, rentalRates: { daily: 9, weekly: 39, monthly: 149 }, rating: 4.7, reviews: 98,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=85',
    description: 'A portable tactile reading companion that makes digital text easier to access at home, school, or on the go.',
    specs: { 'Display': '20-cell refreshable braille', 'Connectivity': 'USB-C and Bluetooth', 'Battery life': 'Up to 12 hours', 'Compatible with': 'iOS, Android, Windows', 'Weight': '0.9 lb' },
    primaryUse: 'Braille reading', weight: '0.9 lb', featured: true,
  },
  {
    id: 'smartsight-reader', name: 'SmartSight AI Screen Reader', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'AccessVision',
    price: 299, rentalRates: null, rating: 4.8, reviews: 73,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85',
    description: 'An intuitive screen-reading device with natural speech, clear navigation and offline support for everyday tasks.',
    specs: { 'Voice options': '12 natural voices', 'Languages': '18 languages', 'Offline mode': 'Included', 'Controls': 'Large tactile keys' },
    primaryUse: 'Digital accessibility', weight: '1.1 lb', featured: true,
  },
  {
    id: 'ergo-rise-walker', name: 'ErgoRise Standing Walker', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'Freedom Mobility',
    price: 279, rentalRates: { daily: 16, weekly: 32, monthly: 210 }, rating: 4.8, reviews: 112,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85',
    description: 'A stable, adjustable walker designed to support a comfortable upright posture, confident steps and everyday independence.',
    specs: { 'Weight capacity': '285 lb', 'Product weight': '18 lb', 'Handle height': 'Adjustable 34–40 in', 'Brakes': 'Locking hand brakes', 'Primary use': 'Standing support' },
    primaryUse: 'Standing support', weight: '18 lb',
  },
  {
    id: 'braillesense-20', name: 'BrailleSense 20 Braille Display', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'HumanWare',
    price: 1899, rentalRates: { daily: 11, weekly: 49, monthly: 189 }, rating: 4.9, reviews: 87,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85',
    description: 'A responsive 20-cell braille display built for comfortable reading, note-taking and accessible productivity.',
    specs: { 'Display': '20 braille cells', 'Storage': '32 GB', 'Connectivity': 'Wi-Fi, Bluetooth, USB-C', 'Battery life': 'Up to 16 hours' },
    primaryUse: 'Braille reading', weight: '1.5 lb',
  },
  {
    id: 'easyreach-kit', name: 'EasyReach Daily Living Kit', category: 'Daily Living', categoryId: 'daily-living', vendor: 'AbleHome',
    price: 129, rentalRates: { daily: 4, weekly: 8, monthly: 28 }, rating: 4.7, reviews: 64,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
    description: 'Thoughtful adaptive essentials that make reaching, gripping and preparing everyday items a little easier.',
    specs: { 'Kit includes': '6 adaptive tools', 'Grip': 'Soft non-slip handles', 'Material': 'Food-safe silicone and steel', 'Care': 'Dishwasher safe' },
    primaryUse: 'Daily living', weight: '2.2 lb',
  },
  {
    id: 'speaktext-tablet', name: 'SpeakText Communication Tablet', category: 'Communication', categoryId: 'communication', vendor: 'ClearVoice Labs',
    price: 649, rentalRates: { daily: 8, weekly: 30, monthly: 112 }, rating: 4.6, reviews: 51,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
    description: 'A simple, customizable communication tablet with clear choices, natural voice output and an easy-to-read display.',
    specs: { 'Screen': '10.1 in HD touchscreen', 'Voice output': 'Natural speech', 'Battery life': 'Up to 10 hours', 'Access methods': 'Touch and switch-ready' },
    primaryUse: 'Communication', weight: '1.2 lb',
  },
  {
    id: 'orbitone-magnifier', name: 'OrbitOne Hands-Free Magnifier', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'Orbit Read',
    price: 349, rentalRates: { daily: 7, weekly: 14, monthly: 56 }, rating: 4.8, reviews: 92,
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=85',
    description: 'A hands-free magnifier with adjustable illumination and a crisp, comfortable view for close-up reading.',
    specs: { 'Magnification': '2× to 12×', 'Lighting': 'Adjustable LED', 'Working distance': 'Up to 12 in', 'Primary use': 'Low-vision reading' },
    primaryUse: 'Low-vision reading', weight: '2.4 lb',
  },
  {
    id: 'learnbright-keyboard', name: 'LearnBright Large-Key Keyboard', category: 'Accessible Learning', categoryId: 'accessible-learning', vendor: 'Inclusive EdTech',
    price: 89, rentalRates: null, rating: 4.5, reviews: 43,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85',
    description: 'A high-visibility keyboard with generously spaced, easy-press keys for more comfortable and confident learning.',
    specs: { 'Key size': '1 in high-contrast keys', 'Connection': 'USB plug and play', 'Compatibility': 'Windows and Mac', 'Layout': 'Standard QWERTY' },
    primaryUse: 'Accessible learning', weight: '1.4 lb',
  },
  {
    id: 'wewalk-stick', name: 'Smart walking stick “WeWalk”', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'WeWalk',
    price: 245, rentalRates: { daily: 5, weekly: 12, monthly: 44 }, rating: 4.6, reviews: 138,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    description: 'A balanced smart cane with helpful navigation cues and a comfortable ergonomic handle for exploring with confidence.',
    specs: { 'Handle': 'Ergonomic grip', 'Navigation': 'Obstacle alerts', 'Battery life': 'Up to 20 hours', 'Length': 'Adjustable' },
    primaryUse: 'Guided mobility', weight: '1.3 lb',
  },
  {
    id: 'orbitone-pocket', name: 'OrbitOne Pocket Magnifier', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'Orbit Read',
    price: 179, rentalRates: { daily: 5, weekly: 12, monthly: 42 }, rating: 4.6, reviews: 38,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=85',
    description: 'A compact illuminated magnifier for reading labels, menus and everyday print while away from home.',
    specs: { 'Magnification': 'Up to 8×', 'Display': '5 in', 'Lighting': 'LED', 'Charging': 'USB-C' },
    primaryUse: 'Portable reading', weight: '0.7 lb',
  },
];

export const sampleProfile: Profile = {
  name: 'Maya Chen',
  email: 'maya@example.com',
  address: '240 Market Street, San Francisco, CA',
};

export const sampleOrders: Order[] = [
  { id: 'AK-10482', type: 'Purchase', date: 'Nov 18, 2026', status: 'Preparing', total: 489, items: ['Lightweight Folding Wheelchair'] },
  { id: 'AK-10483', type: 'Rental', date: 'Nov 18, 2026', status: 'Scheduled', total: 146, items: ['ClearSound Rechargeable Hearing Aids'] },
];
