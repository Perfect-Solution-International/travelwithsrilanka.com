'use client';

import { SparkleIcon, CheckIcon } from '@/components/Icons';

export default function Packages({ formatPrice, onSelectTour }) {
  const PACKAGES = [
    {
      id: 'grand-odyssey',
      title: 'The Grand Ceylon Odyssey',
      duration: '10 Days / 9 Nights',
      basePrice: 1350,
      popular: true,
      subtitle: 'The definitive round-island private expedition covering culture, misty tea hills, safaris, and beaches.',
      features: [
        'Private Chauffeur-Guide throughout trip in luxury AC SUV',
        '9 Nights in Handpicked Boutique 4-Star & 5-Star Glass Villas',
        'Daily Artisanal Breakfasts & Selected Gourmet Dinners',
        '1st Class Scenic Mountain Train Reserved Seats',
        'Yala Private 4x4 Safari Jeep with Certified Spotter',
        'All landmark entry tickets (Sigiriya, Tooth Temple, Dambulla)'
      ]
    },
    {
      id: 'wild-safari',
      title: 'Wild Ceylon & Safari Expedition',
      duration: '6 Days / 5 Nights',
      basePrice: 890,
      popular: false,
      subtitle: 'Immerse yourself in wildlife sanctuaries, tracking leopards, elephants, and marine giants.',
      features: [
        '3 Distinct Safaris: Yala, Minneriya, and Udawalawe',
        'Private 4x4 Jeeps with expert wildlife spotters',
        'Luxury Safari Tents & Eco-Lodge stays',
        'Mirissa Ocean Blue Whale luxury catamaran cruise',
        'All national park entrance fees and permits included',
        '24/7 dedicated wildlife concierge support'
      ]
    },
    {
      id: 'honeymoon',
      title: 'Tropical Romance & Honeymoon',
      duration: '7 Days / 6 Nights',
      basePrice: 1120,
      popular: false,
      subtitle: 'Secluded private pool villas, champagne sunsets, romantic tea estate retreats, and beach dinners.',
      features: [
        'Private Beachfront & Misty Mountain Pool Villas',
        'Candlelit Beach Dinner with sparkling champagne',
        'Couples Ayurvedic Spa Treatment & Flower Bath',
        'Luxury AC Private Chauffeur throughout',
        'Complimentary Honeymoon Cake & Welcome Floral Setup',
        'Sunset Madu River Private Boat Cruise'
      ]
    }
  ];

  return (
    <section className="section-container" id="packages">
      <div className="container">
        <div className="text-center">
          <div className="section-tag glass-pill">Signature Masterpieces</div>
          <h2 className="section-title">
            Popular All-Inclusive <span className="highlight-green">Tour Packages</span>
          </h2>
          <p className="section-description">
            Seamless journeys crafted from arrival to departure. Includes private air-conditioned vehicles, expert English-speaking chauffeur-guides, and handpicked stays.
          </p>
        </div>

        <div className="packages-grid">
          {PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
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
                <h3 className="pkg-title">{pkg.title}</h3>
                <p className="pkg-subtitle">{pkg.subtitle}</p>

                <div className="pkg-price-banner">
                  <div className="pkg-price-value">{formatPrice(pkg.basePrice)}</div>
                  <div className="pkg-price-caption">per person / all-inclusive private tour</div>
                </div>
              </div>

              <ul className="pkg-features">
                {pkg.features.map((feat, i) => (
                  <li key={i}>
                    <span className="chk">
                      <CheckIcon size={14} color="var(--brand-cyan-accent)" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <button 
                  type="button" 
                  className={pkg.popular ? 'btn-solid-primary full-width' : 'btn-solid-outline full-width'}
                  onClick={() => onSelectTour(pkg)}
                >
                  <span>Book {pkg.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
