'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  SearchIcon, 
  CloseIcon,
  CompassIcon,
  SparkleIcon,
  PinIcon,
  SafariIcon,
  ShieldIcon,
  ChevronRightIcon
} from '@/components/Icons';
import QuickBookModal from '@/components/QuickBookModal';

const searchDataset = [
  // 1. Tour Packages
  {
    category: 'packages',
    type: 'Tour Package',
    title: 'The Grand Ceylon Odyssey (10 Days / 9 Nights)',
    desc: 'Signature circular voyage across cultural heights, misty tea highlands, Yala safari & southern beaches.',
    href: '/packages#grand-odyssey',
    badge: '$1,350 · 10 Days',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80',
    keywords: ['package', 'packages', 'tour', 'tours', 'grand ceylon odyssey', '10 days', 'round island', 'luxury', 'sigiriya', 'kandy', 'ella', 'yala', 'galle']
  },
  {
    category: 'packages',
    type: 'Tour Package',
    title: 'Wild Ceylon & Safari Expedition (6 Days / 5 Nights)',
    desc: 'Yala & Minneriya private 4x4 safaris, wild elephant tracking & Mirissa ocean blue whale catamaran cruise.',
    href: '/packages#wild-safari',
    badge: '$890 · 6 Days',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
    keywords: ['package', 'packages', 'tour', 'tours', 'wild ceylon', 'safari', 'wildlife', 'leopard', 'elephant', 'whale', 'yala', 'minneriya', 'udawalawe']
  },
  {
    category: 'packages',
    type: 'Tour Package',
    title: 'Tropical Romance & Honeymoon Sanctuary (7 Days / 6 Nights)',
    desc: 'Secluded private pool villas, champagne beach dinners, couple ayurvedic spa & romantic tea estate suites.',
    href: '/packages#honeymoon',
    badge: '$1,120 · 7 Days',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    keywords: ['package', 'packages', 'tour', 'tours', 'honeymoon', 'romance', 'couples', 'luxury villa', 'candlelit dinner', 'spa', 'beach resort', 'wedding']
  },
  {
    category: 'packages',
    type: 'Tour Package',
    title: 'Cultural Triangle & Ancient Citadels (5 Days / 4 Nights)',
    desc: 'Sigiriya Lion Rock citadel climb, Dambulla Cave Temple, Kandy Tooth Relic puja & Minneriya elephant gathering.',
    href: '/packages#cultural-heritage',
    badge: '$680 · 5 Days',
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=600&q=80',
    keywords: ['package', 'packages', 'tour', 'tours', 'cultural triangle', 'ancient citadels', 'sigiriya', 'dambulla', 'kandy', 'history', 'unesco', 'heritage']
  },
  {
    category: 'packages',
    type: 'Tour Package',
    title: 'Highlands, Tea Trails & Scenic Rails (5 Days / 4 Nights)',
    desc: 'Scenic world-famous blue train ride, colonial tea planter bungalow stay, Little Adam’s Peak & Nuwara Eliya.',
    href: '/packages#highlands-tea',
    badge: '$720 · 5 Days',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80',
    keywords: ['package', 'packages', 'tour', 'tours', 'highlands', 'tea trails', 'scenic rails', 'blue train', 'ella', 'nuwara eliya', 'mountains', 'hiking']
  },

  // 2. Destinations
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Ella & Nine Arch Bridge',
    desc: 'Iconic mountain viaduct, lush tea slopes, Little Adam’s Peak & misty hiking trails.',
    href: '/destinations#ella',
    badge: 'Highlands · Peak',
    image: '/images/ella-nine-arch.jpg',
    keywords: ['destination', 'destinations', 'ella', 'nine arch bridge', 'little adams peak', 'demodara', 'ravana falls', 'mountains', 'hiking', 'viewpoint', 'tea country']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Sigiriya Rock Fortress',
    desc: 'Ancient 5th-century UNESCO citadel in the sky, royal water gardens & lion paw staircase.',
    href: '/destinations#sigiriya',
    badge: 'UNESCO Citadel',
    image: '/images/sigiriya-rock.jpg',
    keywords: ['destination', 'destinations', 'sigiriya', 'lion rock', 'citadel', 'frescoes', 'kashyapa', 'cultural triangle', 'history', 'ruins']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Mirissa & South Coast',
    desc: 'Ethical blue whale watching, palm tree hills, secret beaches & surfing breaks.',
    href: '/destinations#mirissa',
    badge: 'Turquoise Coast',
    image: '/images/mirissa-beach.jpg',
    keywords: ['destination', 'destinations', 'mirissa', 'whale watching', 'coconut tree hill', 'beaches', 'surfing', 'south coast', 'ocean', 'turtles']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Yala National Park',
    desc: 'World’s highest leopard density safari, wild Asian elephants, sloth bears & coastal lagoons.',
    href: '/destinations#yala',
    badge: 'Wildlife Sanctuary',
    image: '/images/yala-safari.jpg',
    keywords: ['destination', 'destinations', 'yala', 'safari', 'leopard', 'elephant', 'sloth bear', 'national park', 'wildlife', 'jeep safari']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Nuwara Eliya & Tea Trails',
    desc: 'Little England misty highlands, colonial estates, Lake Gregory & Horton Plains World\'s End.',
    href: '/destinations#nuwara-eliya',
    badge: 'Little England',
    image: '/images/nuwara-eliya.jpg',
    keywords: ['destination', 'destinations', 'nuwara eliya', 'little england', 'tea trails', 'lake gregory', 'horton plains', 'waterfalls', 'colonial']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Kandy & Temple of the Tooth',
    desc: 'Sacred relic sanctuary, royal botanical gardens, traditional Kandyan dance & lake promenade.',
    href: '/destinations#kandy',
    badge: 'Sacred Hill Capital',
    image: '/images/kandy-heritage.jpg',
    keywords: ['destination', 'destinations', 'kandy', 'temple of the tooth', 'dalada maligawa', 'peradeniya', 'botanical gardens', 'culture', 'lake']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Bentota Golden Beach',
    desc: 'Golden lagoon sands, water sports hub & Madu river mangrove boat safari.',
    href: '/destinations#bentota',
    badge: 'Golden Riviera',
    image: '/images/bentota-beach.jpg',
    keywords: ['destination', 'destinations', 'bentota', 'beach', 'water sports', 'madu river', 'mangrove', 'cinnamon island', 'resort']
  },
  {
    category: 'destinations',
    type: 'Destination',
    title: 'Ceylon Tea Trails & Hatton Sanctuary',
    desc: 'Timeless luxury in restored colonial planter bungalows overlooking Castlereagh Lake.',
    href: '/destinations#tea-trails',
    badge: 'VIP Bungalows',
    image: '/images/tea-trails-villa.jpg',
    keywords: ['destination', 'destinations', 'hatton', 'tea trails', 'castlereagh lake', 'luxury bungalows', 'planter villa', 'infinity pool']
  },

  // 3. Experiences & Activities
  {
    category: 'experiences',
    type: 'Experience',
    title: 'Scenic Blue Train Journey (Kandy to Ella)',
    desc: '1st-class panoramic observation rail journey through misty pine bridges and cascading waterfalls.',
    href: '/destinations#ella',
    badge: 'Top Experience',
    image: '/images/ella-nine-arch.jpg',
    keywords: ['experience', 'experiences', 'activity', 'activities', 'blue train', 'scenic train', 'kandy to ella', 'railway', 'train ride', 'observation car']
  },
  {
    category: 'experiences',
    type: 'Experience',
    title: 'Private 4x4 Leopard & Elephant Game Safari',
    desc: 'Customized safari jeeps with veteran wildlife trackers across Yala & Udawalawe reserves.',
    href: '/destinations#yala',
    badge: 'Wildlife Adventure',
    image: '/images/yala-safari.jpg',
    keywords: ['experience', 'experiences', 'activity', 'activities', 'safari', 'game drive', '4x4', 'leopard tracking', 'elephant gathering', 'wildlife tour']
  },
  {
    category: 'experiences',
    type: 'Experience',
    title: 'Mirissa Ocean Blue Whale Watching Cruise',
    desc: 'Morning catamaran cruise offshore to encounter the world’s largest mammals and playful dolphins.',
    href: '/destinations#mirissa',
    badge: 'Marine Safari',
    image: '/images/mirissa-beach.jpg',
    keywords: ['experience', 'experiences', 'activity', 'activities', 'whale watching', 'blue whale', 'dolphins', 'catamaran', 'boat tour', 'ocean', 'mirissa']
  },
  {
    category: 'experiences',
    type: 'Experience',
    title: 'Artisanal Ceylon Tea Plucking & Factory Tasting',
    desc: 'Hands-on tea plucking with estate artisans followed by private single-origin cupping sessions.',
    href: '/destinations#nuwara-eliya',
    badge: 'Cultural Tasting',
    image: '/images/nuwara-eliya.jpg',
    keywords: ['experience', 'experiences', 'activity', 'activities', 'tea tasting', 'tea plucking', 'factory tour', 'ceylon tea', 'orange pekoe', 'estate experience']
  },
  {
    category: 'experiences',
    type: 'Experience',
    title: 'Madu River Mangrove Speedboat Safari',
    desc: 'Glide through 64 mangrove islands, natural fish therapy spa & authentic cinnamon peeling huts.',
    href: '/destinations#bentota',
    badge: 'Eco River Tour',
    image: '/images/bentota-beach.jpg',
    keywords: ['experience', 'experiences', 'activity', 'activities', 'madu river', 'mangrove safari', 'cinnamon island', 'boat tour', 'bentota', 'fish spa']
  },

  // 4. Trip Planner & Booking Tools
  {
    category: 'planner',
    type: 'Trip Planner',
    title: 'Interactive Trip Planner & Instant Cost Calculator',
    desc: 'Customize days, travelers, route pace & hotel tier to receive a transparent real-time quote.',
    href: '/trip-planner',
    badge: 'Cost Calculator',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
    keywords: ['trip planner', 'planner', 'calculator', 'cost calculator', 'custom itinerary', 'quote', 'tailor made', 'price', 'estimate', 'budget']
  },
  {
    category: 'planner',
    type: 'Trip Planner',
    title: 'Instant Tour Booking & Concierge Desk',
    desc: 'Lock in your dates, vehicle & private English-speaking chauffeur with quick WhatsApp confirmation.',
    href: '#book-now',
    action: 'book',
    bookingPackage: 'Custom Tailor-Made Private Tour',
    badge: 'Fast Booking',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    keywords: ['book', 'booking', 'quick book', 'reserve', 'chauffeur', 'car hire', 'driver', 'whatsapp', 'instant inquiry']
  },

  // 5. Services & Reviews
  {
    category: 'services',
    type: 'Service & Info',
    title: 'Why Travel With Us & Chauffeur Guarantees',
    desc: 'Certified SLTDA tourist chauffeurs, luxury AC vehicle fleet, 0 hidden commissions & guaranteed reliability.',
    href: '/why-us',
    badge: 'SLTDA Certified',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
    keywords: ['why us', 'chauffeurs', 'drivers', 'fleet', 'luxury van', 'guarantees', 'sltda', 'quality', 'safety', 'service']
  },
  {
    category: 'services',
    type: 'Service & Info',
    title: 'Traveler Reviews & Verified Testimonials',
    desc: 'Read authentic verified experiences, ratings and photos from international guests across the globe.',
    href: '/reviews',
    badge: '5.0 Rating',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    keywords: ['reviews', 'testimonials', 'ratings', 'feedback', 'guest reviews', '5 star', 'tripadvisor', 'service']
  },
  {
    category: 'services',
    type: 'Service & Info',
    title: 'Traveler Protection & Safety Standards',
    desc: 'Comprehensive passenger insurance, flexible cancellation policies & 24/7 emergency response.',
    href: '/traveler-protection',
    badge: 'Safety First',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
    keywords: ['protection', 'safety', 'insurance', 'emergency', 'refund', 'cancellation', 'traveler protection', 'service']
  },
  {
    category: 'services',
    type: 'Service & Info',
    title: 'Contact Concierge & 24/7 WhatsApp Hotline',
    desc: 'Instant replies for custom itinerary questions, last-minute chauffeur bookings & flight transfers.',
    href: '/contact',
    badge: 'Direct WhatsApp',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=600&q=80',
    keywords: ['contact', 'whatsapp', 'phone', 'call', 'email', 'support', 'hotline', 'inquiry', 'message', 'service']
  }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState('Custom Tailor-Made Private Tour');
  const pathname = usePathname();

  useEffect(() => {
    // Permanent Dark Mode as requested
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Listen for global open-quick-book events from any page/button
  useEffect(() => {
    const handleOpenBooking = (e) => {
      if (e.detail?.package) {
        setBookingPackage(e.detail.package);
      }
      setBookingModalOpen(true);
    };
    window.addEventListener('open-quick-book', handleOpenBooking);
    return () => window.removeEventListener('open-quick-book', handleOpenBooking);
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K to toggle search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when search modal is open
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/packages', label: 'Packages' },
    { href: '/trip-planner', label: 'Trip Planner' },
    { href: '/why-us', label: 'Why Us' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ];

  const isCurrentActive = (itemHref) => {
    if (itemHref === '/') return pathname === '/';
    return pathname === itemHref || pathname?.startsWith(`${itemHref}/`);
  };

  const SEARCH_CATEGORIES = [
    { id: 'all', label: 'All', icon: SparkleIcon },
    { id: 'packages', label: 'Tour Packages', icon: CompassIcon },
    { id: 'destinations', label: 'Destinations', icon: PinIcon },
    { id: 'experiences', label: 'Experiences', icon: SafariIcon },
    { id: 'planner', label: 'Trip Planner', icon: CompassIcon },
    { id: 'services', label: 'Services & Info', icon: ShieldIcon }
  ];

  const QUICK_SUGGESTIONS = [
    { label: 'Sigiriya', query: 'Sigiriya' },
    { label: 'Ella Blue Train', query: 'Ella Train' },
    { label: 'Yala Safari', query: 'Safari' },
    { label: 'Honeymoon', query: 'Honeymoon' },
    { label: 'Whale Watching', query: 'Whale' },
    { label: '10-Day Odyssey', query: 'Odyssey' },
    { label: 'Cost Calculator', query: 'Calculator' },
  ];

  const filteredResults = searchDataset.filter((item) => {
    // 1. Filter by category if not 'all'
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // 2. If no text query, include all in this category
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();

    // Check synonym / category keywords
    const isPackageQuery = q === 'package' || q === 'packages' || q === 'tour' || q === 'tours';
    const isDestQuery = q === 'destination' || q === 'destinations' || q === 'dest' || q === 'places';
    const isExpQuery = q === 'experience' || q === 'experiences' || q === 'activity' || q === 'activities';
    const isPlanQuery = q === 'plan' || q === 'planner' || q === 'trip' || q === 'calculate' || q === 'calculator' || q === 'cost';
    const isServiceQuery = q === 'service' || q === 'services' || q === 'why us' || q === 'reviews' || q === 'safety';

    if (isPackageQuery && item.category === 'packages') return true;
    if (isDestQuery && item.category === 'destinations') return true;
    if (isExpQuery && item.category === 'experiences') return true;
    if (isPlanQuery && item.category === 'planner') return true;
    if (isServiceQuery && item.category === 'services') return true;

    const qWords = q.split(/\s+/).filter(Boolean);

    // Direct matches
    const titleMatch = item.title.toLowerCase().includes(q);
    const descMatch = item.desc.toLowerCase().includes(q);
    const typeMatch = item.type.toLowerCase().includes(q);
    const badgeMatch = item.badge?.toLowerCase().includes(q);
    const keywordMatch = item.keywords?.some((k) => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));

    // Multi-term match (e.g. "ella train", "yala safari")
    const wordsMatch =
      qWords.length > 1 &&
      qWords.every((word) =>
        item.title.toLowerCase().includes(word) ||
        item.desc.toLowerCase().includes(word) ||
        item.type.toLowerCase().includes(word) ||
        item.badge?.toLowerCase().includes(word) ||
        item.keywords?.some((k) => k.toLowerCase().includes(word))
      );

    return titleMatch || descMatch || typeMatch || badgeMatch || keywordMatch || wordsMatch;
  });

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Destination':
        return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' };
      case 'Tour Package':
        return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)' };
      case 'Experience':
        return { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' };
      case 'Trip Planner':
        return { color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)', border: 'rgba(192, 132, 252, 0.3)' };
      default:
        return { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  return (
    <>
      <header className="navbar-wrapper">
        <div className="header-top-container">
          {/* 1. TOP-LEFT LOGO (Placed at LEFT-TOP as requested) */}
          <Link href="/" className="top-left-logo-link" id="nav-brand-logo" aria-label="Travel with Sri Lanka">
            <img 
              src="/logo-transparent.png?v=9" 
              alt="Travel with Sri Lanka by Hobby & Tours" 
              className="top-left-logo-img"
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </Link>

          {/* 2. ENLARGED FLOATING PAGES LINK BAR WITH INTEGRATED SEARCH & BOOK TOUR BUTTON */}
          <nav className="nav-capsule-island" aria-label="Primary Navigation">
            <ul className="nav-capsule-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`nav-capsule-link ${isCurrentActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Single Desktop Search Button */}
            <button 
              type="button" 
              className="nav-search-btn" 
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Search destinations and tours"
              title="Search"
            >
              <SearchIcon size={17} color="currentColor" />
            </button>

            {/* Book Tour Button integrated INSIDE the pages link bar - Opens instant booking popup */}
            <button 
              type="button" 
              className="btn-solid-primary nav-inline-book-btn" 
              id="btn-nav-book"
              onClick={() => {
                setBookingPackage('Custom Tailor-Made Private Tour');
                setBookingModalOpen(true);
              }}
            >
              <span>Book Tour</span>
            </button>
          </nav>

          {/* 3. MOBILE MENU TOGGLE & SEARCH (Visible ONLY on small screens <= 1240px via CSS) */}
          <div className="mobile-toggle-wrapper">
            <button 
              type="button" 
              className="mobile-search-btn" 
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Search"
            >
              <SearchIcon size={18} color="currentColor" />
            </button>
            <button 
              type="button" 
              className="mobile-toggle-btn glass-btn-icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Backdrop */}
        {mobileMenuOpen && (
          <div 
            className="mobile-drawer-backdrop" 
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer */}
        <div className={`mobile-drawer glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
          {/* Mobile Quick Search Bar inside Drawer */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setSearchOpen(true);
            }}
            className="glass-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '10px 14px',
              marginBottom: '16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <SearchIcon size={16} color="var(--brand-gold)" />
            <span>Search destinations, packages...</span>
          </button>

          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`mobile-link ${isCurrentActive(item.href) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '12px' }}>
            <button 
              type="button" 
              className="btn-solid-primary full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                setBookingPackage('Custom Tailor-Made Private Tour');
                setBookingModalOpen(true);
              }}
            >
              <span>Book Tour</span>
            </button>
          </div>
        </div>
      </header>

      {/* Interactive Search Command Palette Modal (Rendered outside header to guarantee direct pointer-events) */}
      {searchOpen && (
        <div 
          className="search-modal-overlay" 
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="search-modal-window" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-header">
              <SearchIcon size={20} color="var(--text-secondary)" />
              <input
                type="text"
                className="search-input-box"
                placeholder="Search destinations, tour packages, experiences, planner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {/* Reliable Close Button */}
              <button 
                type="button"
                className="search-modal-close-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchOpen(false);
                }}
                aria-label="Close search"
                title="Close"
              >
                <CloseIcon size={18} color="currentColor" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="search-category-tabs">
              {SEARCH_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const count = cat.id === 'all' 
                  ? searchDataset.length 
                  : searchDataset.filter(i => i.category === cat.id).length;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`search-cat-tab ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                    }}
                  >
                    <IconComponent size={14} color="currentColor" />
                    <span>{cat.label}</span>
                    <span className="search-cat-badge">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="search-quick-bar">
              <span className="search-quick-label">
                Quick Search:
              </span>
              {QUICK_SUGGESTIONS.map((sug) => {
                const isActive = searchQuery.toLowerCase() === sug.query.toLowerCase();
                return (
                  <button
                    key={sug.label}
                    type="button"
                    className={`search-quick-chip ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery(sug.query);
                    }}
                  >
                    {sug.label}
                  </button>
                );
              })}
            </div>

            <div className="search-results-list">
              {filteredResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-secondary)' }}>
                  <p style={{ margin: '0 0 6px 0', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    No results found for "{searchQuery}"
                  </p>
                  <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem' }}>
                    Try searching for "Odyssey", "Safari", "Ella", "Honeymoon", or "Calculator"
                  </p>
                  <button
                    type="button"
                    className="btn-outline-gold"
                    style={{ padding: '6px 16px', fontSize: '0.8rem', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    View All Categories ({searchDataset.length})
                  </button>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const styleConfig = getTypeStyle(item.type);
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="search-result-item"
                      onClick={(e) => {
                        if (item.action === 'book') {
                          e.preventDefault();
                          setSearchOpen(false);
                          setSearchQuery('');
                          setBookingPackage(item.bookingPackage || 'Custom Tailor-Made Private Tour');
                          setBookingModalOpen(true);
                          return;
                        }
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="search-result-thumb" 
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="search-result-icon-box">
                          {item.type === 'Tour Package' ? (
                            <CompassIcon size={20} color="var(--brand-gold)" />
                          ) : (
                            <SparkleIcon size={20} color="var(--brand-gold)" />
                          )}
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <span style={{ 
                            fontSize: '0.68rem', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.06em', 
                            color: styleConfig.color,
                            background: styleConfig.bg,
                            border: `1px solid ${styleConfig.border}`,
                            padding: '2px 7px',
                            borderRadius: '4px'
                          }}>
                            {item.type}
                          </span>
                          {item.badge && (
                            <span style={{ 
                              fontSize: '0.68rem', 
                              background: 'rgba(255, 255, 255, 0.08)', 
                              padding: '1px 6px', 
                              borderRadius: '4px', 
                              color: 'var(--text-secondary)' 
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.desc}
                        </div>
                      </div>
                      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-tertiary)' }}>
                        <ChevronRightIcon size={16} color="currentColor" />
                      </span>
                    </Link>
                  );
                })
              )}
            </div>

            <div className="search-modal-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>
                  Showing <strong>{filteredResults.length}</strong> {filteredResults.length === 1 ? 'match' : 'matches'}
                  {selectedCategory !== 'all' && (
                    <span style={{ opacity: 0.8, marginLeft: '4px' }}>
                      in {SEARCH_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                    </span>
                  )}
                </span>
                {(selectedCategory !== 'all' || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-cyan-accent)',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    Reset filters
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchOpen(false);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  pointerEvents: 'auto'
                }}
              >
                <CloseIcon size={14} color="currentColor" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tour Booking Popup Modal */}
      <QuickBookModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackage={bookingPackage}
      />
    </>
  );
}
