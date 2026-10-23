'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { StarIcon, CheckIcon, TripAdvisorIcon } from '@/components/Icons';

const ALL_REVIEWS = [
  {
    initials: 'CD',
    name: 'Charlotte & Edward Davies',
    country: 'London, United Kingdom',
    trip: '10-Day Grand Ceylon Odyssey',
    category: 'honeymoon',
    rating: 5,
    date: 'February 2026',
    text: 'Travel with Sri Lanka crafted the most unbelievable 10-day honeymoon for us. Our driver Kamal was an absolute gentleman and showed us secret viewpoints in Ella that normal tourists never see. The tea plantation villa was pure heaven!'
  },
  {
    initials: 'MB',
    name: 'Markus & Lena Becker',
    country: 'Munich, Germany',
    trip: '6-Day Wild Ceylon Safari Expedition',
    category: 'wildlife',
    rating: 5,
    date: 'January 2026',
    text: 'As wildlife photographers, we wanted dedicated leopard tracking in Yala and the elephant gathering in Minneriya. Travel with Sri Lanka arranged exceptional jeeps and trackers. We spotted 3 leopards in a single morning! Truly 5-star service.'
  },
  {
    initials: 'SJ',
    name: 'Sarah Jenkins & Family',
    country: 'Sydney, Australia',
    trip: '12-Day Ceylon Family Discovery',
    category: 'family',
    rating: 5,
    date: 'December 2025',
    text: 'Traveling with our two young kids can be stressful, but Hobby & Tours took care of every single detail. The private air-conditioned van was spotless, child car seats were provided, and our guide was so patient and friendly with the kids. Unforgettable!'
  },
  {
    initials: 'JM',
    name: 'Jean-Paul & Claire Moreau',
    country: 'Paris, France',
    trip: '7-Day Tropical Romance & Pool Villas',
    category: 'honeymoon',
    rating: 5,
    date: 'November 2025',
    text: 'Everything was seamless from our midnight arrival at Colombo airport to our departure. The candlelit dinner by the Mirissa beach and the private train tickets through the misty mountains were highlights of our year. Merci beaucoup!'
  },
  {
    initials: 'LO',
    name: 'Liam & Chloe O\'Connor',
    country: 'Dublin, Ireland',
    trip: '8-Day Heritage & Scenic Coast',
    category: 'culture',
    rating: 5,
    date: 'October 2025',
    text: 'Climbing Sigiriya with our guide Sanjeewa made the ancient history truly come alive. He paced the walk perfectly for us so we avoided the midday heat. The vehicle was whisper-quiet and super comfortable. Highly recommend this team!'
  },
  {
    initials: 'HL',
    name: 'Henrik & Astrid Lindqvist',
    country: 'Stockholm, Sweden',
    trip: '10-Day Island Explorer',
    category: 'culture',
    rating: 5,
    date: 'September 2025',
    text: 'Cleanliness, punctual pickups, and transparent billing without any hidden driver costs. We visited tea estates, Buddhist temples, and Yala national park in complete comfort. A top-tier luxury boutique agency.'
  }
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    country: '',
    trip: '',
    rating: '5',
    text: ''
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const filteredReviews = filter === 'all'
    ? ALL_REVIEWS
    : ALL_REVIEWS.filter(r => r.category === filter);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) {
      showToast('Please enter your name and feedback');
      return;
    }
    showToast('Thank you for your review! It has been submitted for moderation.');
    setReviewForm({ name: '', country: '', trip: '', rating: '5', text: '' });
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
            <span>Traveler Reviews</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Verified Guest Stories</span>
          <h1 className="page-hero-title">
            Loved by Travelers <span className="highlight-green">Across the Globe</span>
          </h1>
          <p className="page-hero-desc">
            Discover firsthand stories from couples, photographers, families, and solo explorers who journeyed through Sri Lanka with our private chauffeurs and concierge team.
          </p>

          {/* Review Filter Pills */}
          <div className="dest-filters-wrap">
            <button 
              type="button" 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Reviews ({ALL_REVIEWS.length})
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'honeymoon' ? 'active' : ''}`}
              onClick={() => setFilter('honeymoon')}
            >
              Honeymoon &amp; Couples
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'wildlife' ? 'active' : ''}`}
              onClick={() => setFilter('wildlife')}
            >
              Wildlife Safaris
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'family' ? 'active' : ''}`}
              onClick={() => setFilter('family')}
            >
              Family Holidays
            </button>
            <button 
              type="button" 
              className={`filter-btn ${filter === 'culture' ? 'active' : ''}`}
              onClick={() => setFilter('culture')}
            >
              Culture &amp; Heritage
            </button>
          </div>
        </div>
      </section>

      {/* Ratings Dashboard Bar */}
      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '24px 32px', marginBottom: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--brand-gold)', marginBottom: '4px' }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={18} color="var(--brand-gold)" />
                ))}
              </div>
              <strong style={{ fontSize: '1.4rem', display: 'block' }}>5.0 / 5.0 Rating</strong>
              <small style={{ color: 'var(--text-secondary)' }}>Based on 350+ verified tours</small>
            </div>
            <div>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--brand-cyan-accent)' }}>100% Private</strong>
              <span style={{ fontSize: '0.88rem' }}>Dedicated Chauffeur Fleet</span>
              <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Zero strangers on your trip</small>
            </div>
            <div>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: 'var(--brand-gold)' }}>98% Referral Rate</strong>
              <span style={{ fontSize: '0.88rem' }}>Word-of-Mouth Recommendations</span>
              <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Global repeat traveler community</small>
            </div>
            <div>
              <strong style={{ fontSize: '1.4rem', display: 'block', color: '#059669' }}>24/7 Ground Care</strong>
              <span style={{ fontSize: '0.88rem' }}>Instant WhatsApp Concierge</span>
              <small style={{ display: 'block', color: 'var(--text-secondary)' }}>From arrival to departure gate</small>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="testimonials-grid">
            {filteredReviews.map((rev, i) => (
              <div key={i} className="testimonial-card glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div className="testi-stars" style={{ display: 'flex', gap: '3px', color: 'var(--brand-gold)' }}>
                    {[...Array(rev.rating)].map((_, s) => (
                      <StarIcon key={s} size={15} color="var(--brand-gold)" />
                    ))}
                  </div>
                  <span className="glass-pill" style={{ fontSize: '0.72rem', color: '#059669', padding: '3px 8px' }}>
                    Verified Guest
                  </span>
                </div>

                <p className="testi-text">&ldquo;{rev.text}&rdquo;</p>

                <div className="testi-author">
                  <div 
                    className="author-avatar" 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 700, 
                      fontSize: '0.85rem', 
                      color: 'var(--brand-gold)', 
                      background: 'rgba(212, 175, 55, 0.12)', 
                      border: '1px solid rgba(212, 175, 55, 0.3)', 
                      borderRadius: '50%', 
                      width: '42px', 
                      height: '42px',
                      flexShrink: 0
                    }}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.94rem' }}>{rev.name}</strong>
                    <small style={{ color: 'var(--brand-cyan-accent)', fontSize: '0.78rem', display: 'block' }}>{rev.country}</small>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.72rem' }}>{rev.trip} · {rev.date}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Glass Box */}
          <div className="glass-panel" style={{ marginTop: '70px', padding: '36px' }}>
            <div className="text-center" style={{ marginBottom: '28px' }}>
              <span className="section-tag glass-pill">Feedback</span>
              <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
                Traveled with Us Recently?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto' }}>
                We love hearing about your trip memories and driver experiences. Leave your review to help fellow travelers plan their dream holiday.
              </p>
            </div>

            <form onSubmit={handleSubmitReview} style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-row-2">
                <div className="input-group">
                  <label htmlFor="rev-name">Your Full Name *</label>
                  <input 
                    type="text" 
                    id="rev-name" 
                    required 
                    placeholder="e.g. Thomas Wright"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="glass-input"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rev-country">Country of Residence</label>
                  <input 
                    type="text" 
                    id="rev-country" 
                    placeholder="e.g. United Kingdom"
                    value={reviewForm.country}
                    onChange={(e) => setReviewForm({ ...reviewForm, country: e.target.value })}
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="input-group">
                  <label htmlFor="rev-trip">Tour Name / Route</label>
                  <input 
                    type="text" 
                    id="rev-trip" 
                    placeholder="e.g. 10 Days Grand Ceylon"
                    value={reviewForm.trip}
                    onChange={(e) => setReviewForm({ ...reviewForm, trip: e.target.value })}
                    className="glass-input"
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rev-rating">Your Star Rating</label>
                  <select 
                    id="rev-rating" 
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                    className="glass-input"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                    <option value="3">⭐⭐⭐ 3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="rev-text">Your Trip Experience *</label>
                <textarea 
                  id="rev-text" 
                  rows="4" 
                  required
                  placeholder="Tell us about your chauffeur, favorite stops, hotels, or unforgettable moments..."
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  className="glass-input"
                ></textarea>
              </div>

              <button type="submit" className="btn-solid-primary" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>
                <span>Submit Traveler Review</span>
              </button>
            </form>
          </div>

          {/* Subpage CTA Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                Ready to Create Your Own Ceylon Memories?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Join hundreds of satisfied travelers. Start planning your custom itinerary today.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-solid-primary">
                <span>Inquire Now</span>
              </Link>
              <Link href="/packages" className="btn-solid-outline">
                <span>View Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
