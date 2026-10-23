'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import { 
  WhatsAppIcon, 
  MailIcon, 
  PinIcon, 
  PhoneIcon, 
  ShieldIcon, 
  CheckIcon 
} from '@/components/Icons';

function ContactFormInner({ onShowToast }) {
  const searchParams = useSearchParams();
  const initialPackageFromUrl = searchParams.get('package') || 'custom';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    travelers: '2',
    package: initialPackageFromUrl,
    notes: ''
  });

  useEffect(() => {
    if (initialPackageFromUrl && initialPackageFromUrl !== 'custom') {
      setFormData(prev => ({ ...prev, package: initialPackageFromUrl }));
    }
  }, [initialPackageFromUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      if (onShowToast) onShowToast('Please fill in required fields (*)');
      return;
    }

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Error submitting contact inquiry:', err);
    }

    if (onShowToast) {
      onShowToast(`Thank you, ${formData.name}! Your tour inquiry for "${formData.package}" has been received. Our concierge will contact you within 12 hours.`);
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      date: '',
      travelers: '2',
      package: 'custom',
      notes: ''
    });
  };

  return (
    <form className="glass-card" style={{ padding: '36px' }} onSubmit={handleSubmit}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, marginBottom: '22px' }}>
        Send Tour Inquiry &amp; Custom Quote Request
      </h3>

      <div className="form-row-2">
        <div className="input-group">
          <label htmlFor="c-name">Full Name *</label>
          <input 
            type="text" 
            id="c-name" 
            name="name" 
            required 
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. David Miller" 
            className="glass-input" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="c-email">Email Address *</label>
          <input 
            type="email" 
            id="c-email" 
            name="email" 
            required 
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com" 
            className="glass-input" 
          />
        </div>
      </div>

      <div className="form-row-2">
        <div className="input-group">
          <label htmlFor="c-phone">WhatsApp / Phone *</label>
          <input 
            type="tel" 
            id="c-phone" 
            name="phone" 
            required 
            value={formData.phone}
            onChange={handleChange}
            placeholder="+44 7911 123456" 
            className="glass-input" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="c-country">Country of Residence</label>
          <input 
            type="text" 
            id="c-country" 
            name="country" 
            value={formData.country}
            onChange={handleChange}
            placeholder="e.g. United Kingdom" 
            className="glass-input" 
          />
        </div>
      </div>

      <div className="form-row-2">
        <div className="input-group">
          <label htmlFor="c-date">Expected Arrival Date</label>
          <input 
            type="date" 
            id="c-date" 
            name="date" 
            value={formData.date}
            onChange={handleChange}
            className="glass-input" 
          />
        </div>
        <div className="input-group">
          <label htmlFor="c-travelers">Number of Travelers</label>
          <select 
            id="c-travelers" 
            name="travelers" 
            value={formData.travelers}
            onChange={handleChange}
            className="glass-input"
          >
            <option value="1">1 Solo Traveler</option>
            <option value="2">2 Guests (Couple / Friends)</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests (Family / Group)</option>
            <option value="5">5 Guests</option>
            <option value="6+">6+ Guests (Large Party)</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="c-package">Selected Package or Destination Interest</label>
        <select 
          id="c-package" 
          name="package" 
          value={formData.package}
          onChange={handleChange}
          className="glass-input"
        >
          <option value="custom">Customized Bespoke Itinerary</option>
          <option value="The Grand Ceylon Odyssey (10D/9N)">The Grand Ceylon Odyssey (10D/9N)</option>
          <option value="Wild Ceylon & Safari Expedition (6D/5N)">Wild Ceylon &amp; Safari Expedition (6D/5N)</option>
          <option value="Tropical Romance & Honeymoon (7D/6N)">Tropical Romance &amp; Honeymoon (7D/6N)</option>
          <option value="Cultural Triangle & Ancient Citadels (5D/4N)">Cultural Triangle &amp; Ancient Citadels (5D/4N)</option>
          <option value="Highlands, Tea Trails & Scenic Rails (5D/4N)">Highlands, Tea Trails &amp; Scenic Rails (5D/4N)</option>
          <option value="Southern Coastline, Whales & Galle Fort (4D/3N)">Southern Coastline, Whales &amp; Galle Fort (4D/3N)</option>
          <option value="Ella & Nine Arch Bridge">Ella &amp; Nine Arch Bridge</option>
          <option value="Sigiriya Rock & Cultural Triangle">Sigiriya Rock &amp; Cultural Triangle</option>
          <option value="Mirissa, Galle & South Coast">Mirissa, Galle &amp; South Coast</option>
          <option value="Yala National Park Safari">Yala National Park Safari</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="book-notes">Special Requests, Hotel Preferences &amp; Wishes</label>
        <textarea 
          id="book-notes" 
          name="notes" 
          rows="4" 
          value={formData.notes}
          onChange={handleChange}
          placeholder="Tell us if you prefer private pool villas, vegetarian gourmet dining, scenic mountain train journeys, or traveling at a relaxed pace..." 
          className="glass-input" 
        ></textarea>
      </div>

      <button type="submit" className="btn-solid-primary full-width" id="btn-submit-contact-inquiry">
        <span>Send Travel Inquiry</span>
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
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
            <span>Contact &amp; Inquiry</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">24/7 Concierge Desk</span>
          <h1 className="page-hero-title">
            Let\'s Plan Your <span className="highlight-green">Sri Lankan Escape</span>
          </h1>
          <p className="page-hero-desc">
            Reach out to our friendly travel architects. Whether you need advice on seasonal weather, custom routes, boutique villa bookings, or airport VIP arrivals, we reply within 12 hours.
          </p>
        </div>
      </section>

      {/* Contact Channels Grid */}
      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="booking-card glass-panel" style={{ marginBottom: '60px' }}>
            {/* Direct Info Channels */}
            <div>
              <span className="section-tag glass-pill">Direct Channels</span>
              <h2 className="planner-title">
                Speak With an <span className="highlight-gold">Itinerary Architect</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                Prefer an instant conversation? Message us directly on WhatsApp or call our central concierge line. We can build an itinerary with you in minutes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <a 
                  href="https://wa.me/94702000606?text=Hi%20Travel%20with%20Sri%20Lanka,%20I%20would%20like%20to%20plan%20a%20tour" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: 'inherit' }}
                >
                  <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <WhatsAppIcon size={20} color="var(--brand-green-accent)" />
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem' }}>WhatsApp Direct Concierge</strong>
                    <small style={{ color: 'var(--brand-green-accent)', fontWeight: 600 }}>+94 70 2000 606 (Online 24/7)</small>
                  </div>
                </a>

                <a 
                  href="tel:+94702000606"
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: 'inherit' }}
                >
                  <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneIcon size={20} color="var(--brand-gold)" />
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem' }}>Central Hotline</strong>
                    <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>+94 70 2000 606 (Mon - Sun, 8am - 10pm)</small>
                  </div>
                </a>

                <a 
                  href="mailto:info@hobbyntours.com" 
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: 'inherit' }}
                >
                  <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MailIcon size={20} color="var(--brand-cyan-accent)" />
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem' }}>Inquiry Email</strong>
                    <small style={{ color: 'var(--brand-cyan-accent)', fontWeight: 600 }}>info@hobbyntours.com</small>
                  </div>
                </a>

                <div 
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PinIcon size={20} color="var(--text-primary)" />
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem' }}>Offices in Sri Lanka</strong>
                    <small style={{ color: 'var(--text-secondary)' }}>Colombo 03 &amp; Kandy, Sri Lanka</small>
                  </div>
                </div>

                <div 
                  className="glass-card"
                  style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}
                >
                  <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldIcon size={20} color="#059669" />
                  </span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.98rem' }}>Active Traveler Guarantee</strong>
                    <small style={{ color: 'var(--text-secondary)' }}>24/7 Priority Emergency Support on Tour</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side wrapped in Suspense for useSearchParams */}
            <div>
              <Suspense fallback={<div className="glass-card" style={{ padding: '36px' }}>Loading inquiry form...</div>}>
                <ContactFormInner onShowToast={showToast} />
              </Suspense>
            </div>
          </div>

          {/* FAQ Component */}
          <Faq />
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
