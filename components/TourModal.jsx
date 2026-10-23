'use client';

import { CloseIcon, CheckIcon } from '@/components/Icons';

export default function TourModal({ tour, formatPrice, onClose, onBookNow }) {
  if (!tour) return null;

  const inclusions = tour.features || tour.highlights || [
    'Private AC Luxury Transport with Chauffeur-Guide',
    'Handpicked Boutique Accommodations with Breakfast',
    'Reserved Landmark Access & National Park Passes',
    '24/7 Dedicated Concierge Support'
  ];

  return (
    <div className="liquid-modal-overlay" onClick={onClose}>
      <div className="liquid-modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="modal-close-btn glass-btn-icon" 
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon size={18} color="currentColor" />
        </button>

        {tour.image && (
          <div style={{ height: '220px', borderRadius: '16px', overflow: 'hidden', marginBottom: '18px' }}>
            <img 
              src={tour.image} 
              alt={tour.title} 
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
          <span className="glass-pill" style={{ padding: '4px 12px', fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
            {tour.duration}
          </span>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--brand-cyan-accent)' }}>
            {formatPrice(tour.basePrice)}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', fontWeight: 800, marginBottom: '12px' }}>
          {tour.title}
        </h2>

        <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
          {tour.excerpt || tour.subtitle || 'Experience this magnificent Sri Lankan journey with Travel with Sri Lanka by Hobby & Tours. Fully customizable to your travel pace and desires.'}
        </p>

        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>
          Expedition Inclusions:
        </h4>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {inclusions.map((item, i) => (
            <li key={i} style={{ fontSize: '0.88rem', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.5 }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3px', flexShrink: 0 }}>
                <CheckIcon size={14} color="#059669" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Solid Plain Color Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-solid-primary" 
            style={{ flex: 1 }}
            onClick={() => {
              onClose();
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-quick-book', { detail: { package: tour.title } }));
              }
            }}
          >
            <span>Book This Tour</span>
          </button>
          <a 
            href={`https://wa.me/94702000606?text=Hi%20Travel%20with%20Sri%20Lanka,%20I%20am%20interested%20in%20${encodeURIComponent(tour.title)}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-solid-outline"
            style={{ flex: 1, textAlign: 'center' }}
          >
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
