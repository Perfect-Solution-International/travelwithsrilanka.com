'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TourModal from '@/components/TourModal';
import { SparkleIcon, CheckIcon, ShieldIcon, CarIcon, DiamondIcon, BellIcon } from '@/components/Icons';

const PACKAGES_DATA = [
  {
    id: 'grand-odyssey',
    category: 'long',
    title: 'The Grand Ceylon Odyssey',
    duration: '10 Days / 9 Nights',
    basePrice: 1350,
    popular: true,
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=80',
    subtitle: 'The definitive round-island private expedition covering culture, misty tea hills, wildlife safaris, and secluded beaches.',
    features: [
      'Private Chauffeur-Guide throughout trip in luxury AC SUV',
      '9 Nights in Handpicked Boutique 4-Star & 5-Star Glass Villas',
      'Daily Artisanal Breakfasts & Selected Gourmet Dinners',
      '1st Class Scenic Mountain Train Reserved Seats (Kandy to Ella)',
      'Yala Private 4x4 Safari Jeep with Certified Spotter',
      'All landmark entry tickets (Sigiriya, Tooth Temple, Dambulla Cave)',
      'Scenic Ella Rock viewpoint & Nine Arch Bridge private walk',
      'Galle Dutch Fort UNESCO historic guided heritage tour'
    ]
  },
  {
    id: 'wild-safari',
    category: 'wildlife',
    title: 'Wild Ceylon & Safari Expedition',
    duration: '6 Days / 5 Nights',
    basePrice: 890,
    popular: false,
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80',
    subtitle: 'Immerse yourself in wildlife sanctuaries, tracking leopards, wild elephant herds, and majestic marine giants.',
    features: [
      '3 Distinct Safaris: Yala, Minneriya, and Udawalawe',
      'Private 4x4 Jeeps with expert wildlife spotters and trackers',
      'Luxury Safari Tents & Eco-Lodge stays surrounded by nature',
      'Mirissa Ocean Blue Whale luxury catamaran morning cruise',
      'All national park entrance fees, permits, and tracker tips included',
      'Private AC vehicle & professional chauffeur between all reserves'
    ]
  },
  {
    id: 'honeymoon',
    category: 'honeymoon',
    title: 'Tropical Romance & Honeymoon Sanctuary',
    duration: '7 Days / 6 Nights',
    basePrice: 1120,
    popular: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    subtitle: 'Secluded private pool villas, champagne sunsets, romantic tea estate retreats, and candlelit coastal dinners.',
    features: [
      'Private Beachfront & Misty Mountain Pool Villas',
      'Private Candlelit Beach Dinner with sparkling champagne',
      'Couples Ayurvedic 90-Minute Spa Treatment & Herbal Bath',
      'Luxury AC Private Chauffeur throughout entire journey',
      'Complimentary Honeymoon Cake & Welcome Floral Setup',
      'Sunset Madu River Private Boat Cruise through mangrove islets'
    ]
  },
  {
    id: 'cultural-heritage',
    category: 'short',
    title: 'Cultural Triangle & Ancient Citadels',
    duration: '5 Days / 4 Nights',
    basePrice: 680,
    popular: false,
    image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=900&q=80',
    subtitle: 'Step back two millennia into royal Buddhist kingdoms, rock-cut cave temples, and sacred mountain shrines.',
    features: [
      'Sigiriya Lion Rock 5th-century sky citadel guided climb',
      'Dambulla Golden Cave Temple & 150+ gilded Buddha statues',
      'Kandy Royal Palace & Sacred Tooth Relic evening puja ceremony',
      'Peradeniya Royal Botanical Gardens royal palm avenues',
      'Luxury boutique heritage stays in Habarana & Kandy',
      'Minneriya National Park elephant gathering jeep safari'
    ]
  },
  {
    id: 'highlands-tea',
    category: 'short',
    title: 'Highlands, Tea Trails & Scenic Rails',
    duration: '5 Days / 4 Nights',
    basePrice: 720,
    popular: false,
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=900&q=80',
    subtitle: 'Breathe crisp alpine air across rolling emerald tea carpet hills, colonial hill stations, and iconic train viaducts.',
    features: [
      'Private colonial planter bungalow & mountain view suites',
      '1st Class reserved tickets on the legendary Ella blue train',
      'Exclusive single-origin tea estate tasting & factory tour',
      'Horton Plains national park hike to World\'s End precipice',
      'Little Adam\'s Peak sunset hike & Nine Arch Bridge photography',
      'High tea at historic Nuwara Eliya colonial club'
    ]
  },
  {
    id: 'southern-coastal',
    category: 'short',
    title: 'Southern Coastline, Whales & Galle Fort',
    duration: '4 Days / 3 Nights',
    basePrice: 540,
    popular: false,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80',
    subtitle: 'Golden palm-lined bays, Dutch colonial ramparts, sea turtle sanctuaries, and ethical ocean whale watching.',
    features: [
      'Mirissa luxury catamaran blue whale expedition',
      'Galle Dutch Fort UNESCO walking tour with local historian',
      'Boutique clifftop ocean resort with infinity pool',
      'Kosgoda Sea Turtle Conservation hatchery visit',
      'Sunset cocktails at Coconut Tree Hill overlooking Indian Ocean',
      'Private airport transfers via Southern Expressway'
    ]
  }
];

export default function PackagesPage() {
  const [filter, setFilter] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredPackages = filter === 'all'
    ? PACKAGES_DATA
    : PACKAGES_DATA.filter(pkg => pkg.category === filter);

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
            <span>Tour Packages</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Curated Ceylon Expeditions</span>
          <h1 className="page-hero-title">
            Handcrafted Luxury <span className="highlight-green">Tour Packages</span>
          </h1>
          <p className="page-hero-desc">
            Carefully curated itineraries created by local travel specialists. Every journey includes a dedicated chauffeur-guide, handpicked boutique accommodations, and transparent pricing. 100% customizable to your travel pace.
          </p>

          {/* Standard Filter Pills */}
          <div className="filter-pills-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Packages ({PACKAGES_DATA.length})
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'long' ? 'active' : ''}`}
              onClick={() => setFilter('long')}
            >
              Grand Journeys (10+ Days)
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
              onClick={() => setFilter('wildlife')}
            >
              Wildlife &amp; Safari
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'honeymoon' ? 'active' : ''}`}
              onClick={() => setFilter('honeymoon')}
            >
              Romantic Honeymoon
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'short' ? 'active' : ''}`}
              onClick={() => setFilter('short')}
            >
              Escapes (4-5 Days)
            </button>
          </div>
        </div>
      </section>

      {/* Packages Grid using standard package-card styles */}
      <section className="section-container" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                id={pkg.id}
                style={{ scrollMarginTop: '100px' }}
                className={`package-card glass-card ${pkg.popular ? 'popular-package' : ''}`}
              >
                {pkg.popular && (
                  <div className="popular-ribbon">
                    <SparkleIcon size={14} color="#04120e" />
                    <span>Most Requested</span>
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <span className="pkg-duration glass-pill">{pkg.duration}</span>
                  <h2 className="pkg-title">{pkg.title}</h2>
                  <p className="pkg-subtitle">{pkg.subtitle}</p>

                  <div className="pkg-price-banner">
                    <div className="pkg-price-value">{formatPrice(pkg.basePrice)}</div>
                    <div className="pkg-price-caption">per traveler / all-inclusive private tour</div>
                  </div>
                </div>

                <ul className="pkg-features">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="chk">
                        <CheckIcon size={14} color="var(--brand-cyan-accent)" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    type="button" 
                    className={pkg.popular ? 'btn-solid-primary full-width' : 'btn-solid-outline full-width'}
                    onClick={() => setSelectedTour(pkg)}
                  >
                    <span>View Full Itinerary</span>
                  </button>

                  <Link 
                    href={`/contact?package=${encodeURIComponent(pkg.title)}`}
                    className="btn-solid-primary full-width text-center"
                    style={{ display: pkg.popular ? 'none' : 'block' }}
                  >
                    <span>Book This Tour</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pillars of Every Journey */}
          <div className="glass-panel" style={{ marginTop: '70px', padding: '36px' }}>
            <div className="text-center" style={{ marginBottom: '28px' }}>
              <span className="section-tag glass-pill">Inclusions Guarantee</span>
              <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
                Included in Every Single Journey
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                We believe in total transparency. When you book a package with Travel with Sri Lanka by Hobby &amp; Tours, you enjoy peace of mind with zero hidden charges.
              </p>
            </div>

            <div className="info-feature-grid">
              <div className="glass-card info-feature-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CarIcon size={22} color="var(--brand-gold)" />
                  <strong style={{ fontSize: '1.05rem' }}>Private Chauffeur Fleet</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Dedicated air-conditioned vehicle exclusively for your party with fuel, highway tolls, parking fees, and driver expenses covered.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <DiamondIcon size={22} color="var(--brand-gold)" />
                  <strong style={{ fontSize: '1.05rem' }}>Handpicked Hotels</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Boutique luxury resorts, private pool villas, and heritage colonial bungalows personally inspected for cleanliness, service, and atmosphere.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldIcon size={22} color="var(--brand-green-accent)" />
                  <strong style={{ fontSize: '1.05rem' }}>All Permits &amp; Passes</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Skip-the-line reserved access for UNESCO citadels, national park 4x4 safaris, and reserved 1st class scenic train carriages.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BellIcon size={22} color="var(--brand-gold)" />
                  <strong style={{ fontSize: '1.05rem' }}>24/7 WhatsApp Concierge</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Your assigned travel architect is available around the clock to tweak stops, answer questions, or recommend local restaurants in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Subpage CTA Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                Prefer to Build Your Own Custom Route?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Use our live interactive Trip Planner to choose your duration, hotel tier, vehicle type, and see real-time price calculations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/trip-planner" className="btn-solid-primary">
                <span>Launch Trip Planner</span>
              </Link>
              <Link href="/contact" className="btn-solid-outline">
                <span>Inquire Custom Tour</span>
              </Link>
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
