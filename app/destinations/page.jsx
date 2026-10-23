'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourModal from '@/components/TourModal';
import { StarIcon, ClockIcon, CheckIcon } from '@/components/Icons';

const ALL_DESTINATIONS = [
  {
    id: 'ella',
    category: 'highlands',
    title: 'Ella & Nine Arch Bridge',
    duration: '3 - 4 Days',
    basePrice: 480,
    rating: '5.0 (148)',
    badge: 'Highlands · Tea Country',
    image: '/images/ella-nine-arch.jpg',
    excerpt: 'Walk among misty tea estates, hike Little Adam\'s Peak, and witness the iconic vintage train traversing ancient stone arches.',
    highlights: ['Tea Factory Tours', '1st Class Blue Train', 'Ravana Waterfalls', 'Nine Arch Bridge Panorama']
  },
  {
    id: 'sigiriya',
    category: 'heritage',
    title: 'Sigiriya Rock & Cultural Triangle',
    duration: '3 - 5 Days',
    basePrice: 420,
    rating: '5.0 (220)',
    badge: 'UNESCO Citadel',
    image: '/images/sigiriya-rock.jpg',
    excerpt: 'Ascend King Kashyapa\'s dramatic 5th-century palace in the sky, marvel at ancient frescoes, and explore royal water gardens.',
    highlights: ['Lion Rock Citadel', 'Minneriya Safari', 'Dambulla Cave Temple', 'Polonnaruwa Ancient Ruins']
  },
  {
    id: 'mirissa',
    category: 'coastal',
    title: 'Mirissa, Galle & South Coast',
    duration: '3 - 4 Days',
    basePrice: 390,
    rating: '4.8 (195)',
    badge: 'Turquoise Coast',
    image: '/images/mirissa-beach.jpg',
    excerpt: 'Soak in golden sunshine at Coconut Tree Hill, embark on ethical blue whale expeditions, and stroll the cobblestones of 17th-century Galle Fort.',
    highlights: ['Blue Whale Catamaran', 'Galle Dutch Fort', 'Secret Beach & Sunset', 'Sea Turtle Sanctuary']
  },
  {
    id: 'yala',
    category: 'wildlife',
    title: 'Yala National Park Safari',
    duration: '2 - 3 Days',
    basePrice: 520,
    rating: '4.9 (182)',
    badge: 'Wildlife Sanctuary',
    image: '/images/yala-safari.jpg',
    excerpt: 'The world\'s highest leopard density. Track elusive big cats, sloth bears, wild elephants, and exotic birds in customized 4x4 safari jeeps.',
    highlights: ['Leopard Tracking', 'Private 4x4 Safari', 'Glamping Stargazing', 'Tissamaharama Lakes']
  },
  {
    id: 'nuwara-eliya',
    category: 'highlands',
    title: 'Nuwara Eliya & Tea Trails',
    duration: '2 - 3 Days',
    basePrice: 440,
    rating: '4.9 (160)',
    badge: 'Little England · Valleys',
    image: '/images/nuwara-eliya.jpg',
    excerpt: 'Emerald hills wrapped in cool alpine mist. Sip world-renowned single-origin Ceylon tea in historic colonial bungalows and see Gregory Lake.',
    highlights: ['Tea Estate High Tea', 'Horton Plains Hike', 'Lake Gregory Boating', 'Colonial Heritage Club']
  },
  {
    id: 'kandy',
    category: 'heritage',
    title: 'Kandy & Royal Heritage',
    duration: '2 - 3 Days',
    basePrice: 360,
    rating: '4.8 (175)',
    badge: 'Sacred Hill Capital',
    image: '/images/kandy-heritage.jpg',
    excerpt: 'Surrounded by forested hills and sacred tranquility. Visit the Golden Temple of the Sacred Tooth Relic and Royal Peradeniya Botanical Gardens.',
    highlights: ['Temple of the Tooth Relic', 'Peradeniya Gardens', 'Kandyan Cultural Dance', 'Kandy Lake Promenade']
  },
  {
    id: 'bentota',
    category: 'coastal',
    title: 'Bentota & Madu River Estuary',
    duration: '2 - 3 Days',
    basePrice: 350,
    rating: '4.8 (145)',
    badge: 'Golden Riviera',
    image: '/images/bentota-beach.jpg',
    excerpt: 'Lush mangrove river safaris through cinnamon islands, luxury beachfront spa resorts, and thrilling watersports on tranquil lagoons.',
    highlights: ['Madu River Boat Safari', 'Cinnamon Peeling Demo', 'Brief Garden Estate', 'Water Sports Lagoon']
  },
  {
    id: 'tea-trails',
    category: 'highlands',
    title: 'Ceylon Tea Trails & Hatton Sanctuary',
    duration: '3 - 4 Days',
    basePrice: 560,
    rating: '5.0 (98)',
    badge: 'VIP Colonial Bungalows',
    image: '/images/tea-trails-villa.jpg',
    excerpt: 'Relish timeless colonial luxury in historic planter bungalows overlooking Castlereagh Lake. Enjoy private high teas and mountain infinity pools.',
    highlights: ['Historic Planter Bungalows', 'Lake Castlereagh Kayaking', 'Private High Tea Experience', 'Infinity Mountain Views']
  }
];

export default function DestinationsPage() {
  const [filter, setFilter] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredDestinations = filter === 'all'
    ? ALL_DESTINATIONS
    : ALL_DESTINATIONS.filter(item => item.category === filter);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const formatPrice = (usd) => `$${usd.toLocaleString()}`;

  return (
    <main>
      <Navbar />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Destinations</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Curated Sri Lanka Destinations</span>
          <h1 className="page-hero-title">
            Explore Ceylon&apos;s Most <span className="highlight-gold">Enchanting Realms</span>
          </h1>
          <p className="page-hero-desc">
            From mist-shrouded mountain peaks and emerald tea plantations to UNESCO world heritage citadels and untamed wildlife reserves. Every destination is explored with your private chauffeur-guide in unhurried elegance.
          </p>

          {/* Standard Filter Pills */}
          <div className="filter-pills-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Highlights ({ALL_DESTINATIONS.length})
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'highlands' ? 'active' : ''}`}
              onClick={() => setFilter('highlands')}
            >
              Highlands &amp; Tea
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'heritage' ? 'active' : ''}`}
              onClick={() => setFilter('heritage')}
            >
              Cultural Triangle
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'coastal' ? 'active' : ''}`}
              onClick={() => setFilter('coastal')}
            >
              Beaches &amp; Ocean
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
              onClick={() => setFilter('wildlife')}
            >
              Wildlife Safari
            </button>
          </div>
        </div>
      </section>

      {/* Liquid Glass 3D Cards using EXACT standard styles */}
      <section className="section-container" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="destination-grid">
            {filteredDestinations.map((dest) => (
              <div 
                key={dest.id} 
                id={dest.id}
                style={{ scrollMarginTop: '100px' }}
                className="destination-card glass-card"
              >
                <div className="card-media">
                  <img 
                    src={dest.image} 
                    alt={dest.title} 
                    className="card-img" 
                    loading="lazy" 
                    decoding="async"
                  />
                  <span className="card-badge glass-pill">{dest.badge}</span>
                  <span className="card-rating glass-pill">
                    <StarIcon size={13} color="var(--brand-gold)" /> {dest.rating}
                  </span>
                </div>

                <div className="card-body">
                  <div className="card-header-meta">
                    <h3 className="card-title">{dest.title}</h3>
                    <span className="card-duration">
                      <ClockIcon size={14} color="var(--brand-cyan-accent)" />
                      <span>{dest.duration}</span>
                    </span>
                  </div>

                  <p className="card-excerpt">{dest.excerpt}</p>

                  <div className="card-highlights">
                    {dest.highlights.map((h, i) => (
                      <span key={i} className="highlight-tag">
                        <span className="highlight-bullet">•</span> {h}
                      </span>
                    ))}
                  </div>

                  <div className="card-footer">
                    <div className="price-wrap">
                      <span className="price-label">Starting from</span>
                      <span className="price-val">{formatPrice(dest.basePrice)}</span>
                    </div>
                    <button 
                      type="button" 
                      className="btn-solid-outline"
                      onClick={() => setSelectedTour(dest)}
                    >
                      Explore Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Travel Season Guide */}
          <div className="glass-panel" style={{ marginTop: '70px', padding: '36px' }}>
            <div className="text-center" style={{ marginBottom: '28px' }}>
              <span className="section-tag glass-pill">Seasonal Weather Guide</span>
              <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
                When is the Best Time to Visit Sri Lanka?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                Sri Lanka enjoys a tropical climate with two distinct monsoon seasons, meaning sunny weather and golden beaches can always be found on at least one coast throughout the entire year!
              </p>
            </div>

            <div className="info-feature-grid">
              <div className="glass-card info-feature-card">
                <strong style={{ color: 'var(--brand-cyan-accent)', fontSize: '1.05rem' }}>South &amp; West Coasts</strong>
                <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>November to April</small>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Perfect calm blue waters for Galle, Mirissa, Bentota, and blue whale watching. Sun-drenched golden sands and warm seas.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <strong style={{ color: 'var(--brand-cyan-accent)', fontSize: '1.05rem' }}>Cultural Triangle</strong>
                <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>Year-Round Good Weather</small>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Sigiriya, Dambulla, and Polonnaruwa lie in the dry northern plains, making them accessible and majestic almost every month.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <strong style={{ color: 'var(--brand-cyan-accent)', fontSize: '1.05rem' }}>Central Highlands &amp; Ella</strong>
                <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>December to May</small>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Misty mornings and sunny afternoons ideal for tea estate walking, Adam&apos;s Peak pilgrimage hikes, and scenic train rides.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <strong style={{ color: 'var(--brand-cyan-accent)', fontSize: '1.05rem' }}>East Coast &amp; Pigeon Island</strong>
                <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>May to September</small>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Trincomalee, Passikudah, and Arugam Bay enjoy glass-calm seas, crystal visibility for coral snorkeling, and world-class surfing.
                </p>
              </div>
            </div>
          </div>

          {/* Subpage CTA Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                Want to Combine Multiple Destinations?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Our travel architects can weave any of these destinations into a seamless custom private tour with chauffeured transport.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/trip-planner" className="btn-solid-primary">
                <span>Open Trip Planner</span>
              </Link>
              <a 
                href="https://wa.me/94702000606?text=Hi%20Travel%20with%20Sri%20Lanka,%20I%20want%20to%20plan%20a%20multi-destination%20tour"
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-solid-outline"
              >
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Tour Detail Modal */}
      <TourModal 
        tour={selectedTour}
        formatPrice={formatPrice}
        onClose={() => setSelectedTour(null)}
        onBookNow={(tourTitle) => {
          setSelectedTour(null);
          showToast(`Selected: ${tourTitle}. Redirecting to inquiry...`);
          window.location.href = `/contact?package=${encodeURIComponent(tourTitle)}`;
        }}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="liquid-toast glass-pill" role="alert">
          <span style={{ background: '#059669', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckIcon size={12} color="#ffffff" />
          </span>
          <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast}</span>
        </div>
      )}
    </main>
  );
}
