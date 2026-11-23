import type { Category, Order, Product, Profile } from '../api/types';

export const categories: Category[] = [
  { id: 'mobility-aids', name: 'Mobility Aids', description: 'Wheelchairs, walkers and walking sticks', image: 'https://images.pexels.com/photos/8543045/pexels-photo-8543045.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'hearing-assistance', name: 'Hearing Assistance', description: 'Rechargeable aids and listening devices', image: 'https://images.pexels.com/photos/36485822/pexels-photo-36485822.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'vision-reading', name: 'Vision & Reading', description: 'Braille displays, readers and magnifiers', image: 'https://images.pexels.com/photos/7188526/pexels-photo-7188526.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'daily-living', name: 'Daily Living', description: 'Adaptive tools for comfortable routines', image: 'https://images.pexels.com/photos/7495872/pexels-photo-7495872.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'communication', name: 'Communication', description: 'Speech, voice and communication aids', image: 'https://images.pexels.com/photos/2261059/pexels-photo-2261059.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'accessible-learning', name: 'Accessible Learning', description: 'Inclusive tools for reading and learning', image: 'https://images.pexels.com/photos/7416571/pexels-photo-7416571.jpeg?auto=compress&cs=tinysrgb&w=900' },
];

export const products: Product[] = [
  {
    id: 'folding-wheelchair', name: 'Lightweight Folding Wheelchair', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'Freedom Mobility',
    price: 5499, rentalRates: { daily: 249, weekly: 999, monthly: 2999 }, rating: 4.9, reviews: 184,
    image: 'https://images.pexels.com/photos/8543045/pexels-photo-8543045.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A dependable, easy-fold companion with supportive seating and a lightweight aircraft-grade frame for days out and travel.',
    specs: { 'Weight capacity': '300 lb', 'Product weight': '34 lb', 'Folded width': '12 in', 'Seat width': '18 in', 'Frame': 'Aircraft-grade aluminium', 'Accessibility': 'Flip-back arms · swing-away footrests' },
    primaryUse: 'Mobility', weight: '34 lb', featured: true,
  },
  {
    id: 'clearsound-hearing-aids', name: 'ClearSound Rechargeable Hearing Aids', category: 'Hearing Assistance', categoryId: 'hearing-assistance', vendor: 'ClearHear',
    price: 25000, rentalRates: { daily: 399, weekly: 1499, monthly: 4499 }, rating: 4.8, reviews: 126,
    image: 'https://images.pexels.com/photos/36485822/pexels-photo-36485822.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Comfortable rechargeable hearing support with simple controls, clear conversations and a compact charging case.',
    specs: { 'Battery life': 'Up to 24 hours', 'Charging time': '3 hours', 'Fit': 'Behind the ear', 'Programs': '4 listening modes', 'Connectivity': 'Bluetooth compatible' },
    primaryUse: 'Hearing support', weight: '0.2 oz', featured: true,
  },
  {
    id: 'hable-one', name: 'Hable One Portable Braille Keyboard', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'Hable One',
    price: 42478, rentalRates: { daily: 699, weekly: 2499, monthly: 7499 }, rating: 4.7, reviews: 98,
    image: 'https://images.pexels.com/photos/7416571/pexels-photo-7416571.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A portable tactile reading companion that makes digital text easier to access at home, school, or on the go.',
    specs: { 'Controls': '8 tactile buttons', 'Connectivity': 'Bluetooth', 'Compatible with': 'iOS and Android phones and tablets', 'Battery': 'Rechargeable', 'Support': 'Onboarding and tutorials included' },
    primaryUse: 'Braille reading', weight: '0.9 lb', featured: true,
  },
  {
    id: 'smartsight-reader', name: 'SmartSight OCR Reading Pen', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'AccessVision',
    price: 12447, rentalRates: { daily: 399, weekly: 1399, monthly: 4199 }, rating: 4.8, reviews: 73,
    image: 'https://images.pexels.com/photos/6913315/pexels-photo-6913315.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A portable OCR reading pen that scans printed text and reads it aloud for study and everyday reading.',
    specs: { 'Reading speed': 'Up to 3,000 characters per minute', 'Connectivity': 'Bluetooth', 'Text-to-speech': 'Included', 'Compatibility': 'Mac, Windows, iOS and Android' },
    primaryUse: 'Digital accessibility', weight: '1.1 lb', featured: true,
  },
  {
    id: 'ergo-rise-walker', name: 'ErgoRise Standing Walker', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'Freedom Mobility',
    price: 12499, rentalRates: { daily: 299, weekly: 1199, monthly: 3499 }, rating: 4.8, reviews: 112,
    image: 'https://images.pexels.com/photos/33061506/pexels-photo-33061506.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A stable, adjustable walker designed to support a comfortable upright posture, confident steps and everyday independence.',
    specs: { 'Weight capacity': '285 lb', 'Product weight': '18 lb', 'Handle height': 'Adjustable 34–40 in', 'Brakes': 'Locking hand brakes', 'Primary use': 'Standing support' },
    primaryUse: 'Standing support', weight: '18 lb',
  },
  {
    id: 'braillesense-20', name: 'BrailleSense 20 Braille Display', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'HumanWare',
    price: 299999, rentalRates: { daily: 2499, weekly: 9999, monthly: 29999 }, rating: 4.9, reviews: 87,
    image: 'https://images.pexels.com/photos/33920578/pexels-photo-33920578.png?auto=compress&cs=tinysrgb&w=1000',
    description: 'A responsive 20-cell braille display built for comfortable reading, note-taking and accessible productivity.',
    specs: { 'Display': '20 braille cells', 'Storage': '32 GB', 'Connectivity': 'Wi-Fi, Bluetooth, USB-C', 'Battery life': 'Up to 16 hours' },
    primaryUse: 'Braille reading', weight: '1.5 lb',
  },
  {
    id: 'easyreach-kit', name: 'EasyReach Daily Living Kit', category: 'Daily Living', categoryId: 'daily-living', vendor: 'AbleHome',
    price: 1499, rentalRates: null, rating: 4.7, reviews: 64,
    image: 'https://images.pexels.com/photos/8127430/pexels-photo-8127430.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'Thoughtful adaptive essentials that make reaching, gripping and preparing everyday items a little easier.',
    specs: { 'Kit includes': '6 adaptive tools', 'Grip': 'Soft non-slip handles', 'Material': 'Food-safe silicone and steel', 'Care': 'Dishwasher safe' },
    primaryUse: 'Daily living', weight: '2.2 lb',
  },
  {
    id: 'speaktext-tablet', name: 'SpeakText Communication Tablet', category: 'Communication', categoryId: 'communication', vendor: 'ClearVoice Labs',
    price: 29999, rentalRates: { daily: 999, weekly: 3999, monthly: 11999 }, rating: 4.6, reviews: 51,
    image: 'https://images.pexels.com/photos/2261059/pexels-photo-2261059.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A simple, customizable communication tablet with clear choices, natural voice output and an easy-to-read display.',
    specs: { 'Screen': '10.1 in HD touchscreen', 'Voice output': 'Natural speech', 'Battery life': 'Up to 10 hours', 'Access methods': 'Touch and switch-ready' },
    primaryUse: 'Communication', weight: '1.2 lb',
  },
  {
    id: 'orbitone-magnifier', name: 'OrbitOne Hands-Free Magnifier', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'Orbit Read',
    price: 2499, rentalRates: { daily: 149, weekly: 499, monthly: 1499 }, rating: 4.8, reviews: 92,
    image: 'https://images.pexels.com/photos/31843105/pexels-photo-31843105.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A hands-free magnifier with adjustable illumination and a crisp, comfortable view for close-up reading.',
    specs: { 'Magnification': '2× to 12×', 'Lighting': 'Adjustable LED', 'Working distance': 'Up to 12 in', 'Primary use': 'Low-vision reading' },
    primaryUse: 'Low-vision reading', weight: '2.4 lb',
  },
  {
    id: 'learnbright-keyboard', name: 'LearnBright Large-Key Keyboard', category: 'Accessible Learning', categoryId: 'accessible-learning', vendor: 'Inclusive EdTech',
    price: 4511, rentalRates: null, rating: 4.5, reviews: 43,
    image: 'https://images.pexels.com/photos/2882516/pexels-photo-2882516.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A high-visibility keyboard with generously spaced, easy-press keys for more comfortable and confident learning.',
    specs: { 'Key size': '1 in high-contrast keys', 'Connection': 'USB plug and play', 'Compatibility': 'Windows and Mac', 'Layout': 'Standard QWERTY' },
    primaryUse: 'Accessible learning', weight: '1.4 lb',
  },
  {
    id: 'wewalk-stick', name: 'Smart walking stick “WeWalk”', category: 'Mobility Aids', categoryId: 'mobility-aids', vendor: 'WeWalk',
    price: 49999, rentalRates: { daily: 799, weekly: 2999, monthly: 8999 }, rating: 4.6, reviews: 138,
    image: 'https://images.pexels.com/photos/7188530/pexels-photo-7188530.jpeg?auto=compress&cs=tinysrgb&w=1000',
    description: 'A balanced smart cane with helpful navigation cues and a comfortable ergonomic handle for exploring with confidence.',
    specs: { 'Handle': 'Ergonomic grip', 'Navigation': 'Obstacle alerts', 'Battery life': 'Up to 20 hours', 'Length': 'Adjustable' },
    primaryUse: 'Guided mobility', weight: '1.3 lb',
  },
  {
    id: 'orbitone-pocket', name: 'OrbitOne Pocket Magnifier', category: 'Vision & Reading', categoryId: 'vision-reading', vendor: 'Orbit Read',
    price: 19999, rentalRates: { daily: 399, weekly: 1499, monthly: 4499 }, rating: 4.6, reviews: 38,
    image: 'https://images.pexels.com/photos/7188801/pexels-photo-7188801.jpeg?auto=compress&cs=tinysrgb&w=1000',
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
  { id: 'AK-10482', type: 'Purchase', date: 'Nov 18, 2026', status: 'Preparing', total: 5499, items: ['Lightweight Folding Wheelchair'] },
  { id: 'AK-10483', type: 'Rental', date: 'Nov 18, 2026', status: 'Scheduled', total: 3999, items: ['ClearSound Rechargeable Hearing Aids'] },
];
