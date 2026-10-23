'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCalculator from '@/components/TripCalculator';
import BookingInquiry from '@/components/BookingInquiry';
import { CheckIcon } from '@/components/Icons';

export default function TripPlannerPage() {
  const [toast, setToast] = useState(null);
  const [inquiryPackage, setInquiryPackage] = useState('custom');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const formatPrice = (usd) => `$${usd.toLocaleString()}`;

  const handleCustomQuoteRequest = (quoteData) => {
    setInquiryPackage(`Custom Plan (${quoteData.days} Days / ${quoteData.travelers} Guests)`);
    const notesEl = document.getElementById('book-notes');
    if (notesEl) {
      notesEl.value = `Custom Calculation: ${quoteData.days} Days for ${quoteData.travelers} traveler(s). Accommodation Tier: ${quoteData.hotelTier.toUpperCase()}. Vehicle Fleet: ${quoteData.vehicle.toUpperCase()}. Estimated Total: ${formatPrice(quoteData.grandTotalUSD)} (${formatPrice(quoteData.perPersonUSD)}/person).`;
    }
    const bookingSec = document.getElementById('booking-section');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Custom quote details transferred to the inquiry form below!');
  };

  return (
    <main>
      <Navbar />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Trip Planner</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Live Interactive Tool</span>
          <h1 className="page-hero-title">
            Custom Itinerary &amp; <span className="highlight-gold">Cost Calculator</span>
          </h1>
          <p className="page-hero-desc">
            Want a journey designed exclusively around your timeline and travel taste? Customize days, travelers, hotel tiers, private transport, and curated excursions below to get an instantaneous, transparent price estimate.
          </p>
        </div>
      </section>

      {/* Interactive Trip Calculator */}
      <TripCalculator 
        formatPrice={formatPrice}
        onRequestQuote={handleCustomQuoteRequest}
      />

      {/* How It Works Steps */}
      <section className="section-container" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '36px' }}>
            <div className="text-center" style={{ marginBottom: '28px' }}>
              <span className="section-tag glass-pill">Bespoke Process</span>
              <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
                How Custom Tour Planning Works
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                From your initial idea to your departure lounge, our process is effortless and completely tailored.
              </p>
            </div>

            <div className="info-feature-grid">
              <div className="glass-card info-feature-card">
                <span className="glass-pill" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-gold)' }}>1</span>
                <strong style={{ fontSize: '1.05rem' }}>Customize Your Preferences</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Select duration, group size, boutique or 5-star hotel tier, and transport fleet to see real-time price changes.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <span className="glass-pill" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-gold)' }}>2</span>
                <strong style={{ fontSize: '1.05rem' }}>Send Custom Blueprint</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Click &apos;Request This Custom Itinerary&apos; to pass your parameters to our inquiry form or send via WhatsApp with one tap.
                </p>
              </div>

              <div className="glass-card info-feature-card">
                <span className="glass-pill" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-gold)' }}>3</span>
                <strong style={{ fontSize: '1.05rem' }}>Concierge Fine-Tuning</strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Our local travel architect reviews your request, verifies luxury villa availability, and sends a day-by-day itinerary in 12 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <BookingInquiry 
        initialPackage={inquiryPackage}
        onShowToast={showToast}
      />

      <Footer />

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
