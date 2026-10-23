'use client';

import { useState } from 'react';
import { StarIcon, ClockIcon } from '@/components/Icons';

const DESTINATIONS = [
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
    highlights: ['Tea Factory Tours', '1st Class Blue Train', 'Ravana Waterfalls']
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
    highlights: ['Lion Rock Citadel', 'Minneriya Safari', 'Dambulla Cave Temple']
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
    highlights: ['Blue Whale Catamaran', 'Galle Dutch Fort', 'Secret Beach & Sunset']
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
    highlights: ['Leopard Tracking', 'Private 4x4 Safari', 'Glamping Stargazing']
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
    highlights: ['Tea Estate High Tea', 'Horton Plains Hike', 'Lake Gregory Boating']
  },
  {
    id: 'kandy',
    category: 'heritage',
    title: 'Kandy & Royal Heritage',
    duration: '2 - 3 Days',
    basePrice: 360,
    rating: '4.8 (175)',
    badge: 'Sacred Kingdom',
    image: '/images/kandy-heritage.jpg',
    excerpt: 'The last royal kingdom of Ceylon. Visit the Sacred Temple of the Tooth Relic, stroll Peradeniya Royal Botanical Gardens, and watch traditional dance.',
    highlights: ['Temple of the Tooth', 'Botanical Gardens', 'Kandyan Dance Show']
  }
];

export default function Destinations({ formatPrice, onSelectTour }) {
  const [filter, setFilter] = useState('all');

  const filteredDestinations = filter === 'all' 
    ? DESTINATIONS 
    : DESTINATIONS.filter(item => item.category === filter);

  return (
    <section className="section-container" id="destinations">
      <div className="container">
        <div className="text-center">
          <div className="section-tag glass-pill">Handpicked Ceylon Wonders</div>
          <h2 className="section-title">
            Iconic Sri Lankan <span className="highlight-green">Destinations</span>
          </h2>
          <p className="section-description">
            Each destination in Sri Lanka possesses its own micro-climate, ancient stories, and enchanting vistas. Experience them through tailored private expeditions.
          </p>

          {/* Filter Pills */}
          <div className="filter-pills-row">
            <button 
              type="button" 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Highlights
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'highlands' ? 'active' : ''}`}
              onClick={() => setFilter('highlands')}
            >
              Highlands & Tea
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'heritage' ? 'active' : ''}`}
              onClick={() => setFilter('heritage')}
            >
              Ancient Citadels
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'coastal' ? 'active' : ''}`}
              onClick={() => setFilter('coastal')}
            >
              Beaches & Ocean
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

        {/* Liquid Glass 3D Cards */}
        <div className="destination-grid">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="destination-card glass-card">
              <div className="card-media">
                <img src={dest.image} alt={dest.title} className="card-img" loading="lazy" decoding="async" />
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
                    onClick={() => onSelectTour(dest)}
                  >
                    Explore Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
