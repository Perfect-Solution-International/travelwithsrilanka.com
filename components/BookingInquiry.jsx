'use client';

import { useState } from 'react';
import { WhatsAppIcon, MailIcon, PinIcon } from '@/components/Icons';

export default function BookingInquiry({ initialPackage, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    package: initialPackage || 'custom',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      if (onShowToast) onShowToast('Please fill in all required fields (*)');
      return;
    }

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
    }

    if (onShowToast) {
      onShowToast(`Thank you, ${formData.name}! Your tour inquiry has been received. Our concierge will contact you shortly.`);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      date: '',
      package: 'custom',
      notes: ''
    });
  };

  return (
    <section className="section-container" id="booking-section">
      <div className="container">
        <div className="booking-card glass-panel">
          {/* Info Side */}
          <div>
            <div className="section-tag glass-pill">Start Your Journey Today</div>
            <h2 className="planner-title">
              Ready for Your Dream <span className="highlight-green">Ceylon Escape?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
              Tell us when you plan to arrive, how many travelers are in your party, and your dream highlights. Our travel concierge will craft a customized itinerary within 12 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href="https://wa.me/94702000606" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="glass-pill"
                style={{ padding: '10px 18px', color: 'inherit' }}
              >
                <WhatsAppIcon size={16} color="var(--brand-green-accent)" />
                <span>WhatsApp Direct: +94 70 2000 606</span>
              </a>
              <a 
                href="mailto:info@hobbyntours.com" 
                className="glass-pill"
                style={{ padding: '10px 18px', color: 'inherit' }}
              >
                <MailIcon size={16} color="var(--brand-cyan-accent)" />
                <span>info@hobbyntours.com</span>
              </a>
              <div 
                className="glass-pill"
                style={{ padding: '10px 18px', color: 'inherit' }}
              >
                <PinIcon size={16} color="var(--brand-gold)" />
                <span>Colombo &amp; Kandy, Sri Lanka</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <form className="glass-card" style={{ padding: '30px' }} onSubmit={handleSubmit}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, marginBottom: '20px' }}>
              Send Tour Inquiry
            </h3>

            <div className="form-row-2">
              <div className="input-group">
                <label htmlFor="book-name">Full Name *</label>
                <input 
                  type="text" 
                  id="book-name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. David Miller" 
                  className="glass-input" 
                />
              </div>
              <div className="input-group">
                <label htmlFor="book-email">Email Address *</label>
                <input 
                  type="email" 
                  id="book-email" 
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
                <label htmlFor="book-phone">WhatsApp / Phone *</label>
                <input 
                  type="tel" 
                  id="book-phone" 
                  name="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 7911 123456" 
                  className="glass-input" 
                />
              </div>
              <div className="input-group">
                <label htmlFor="book-country">Country of Residence</label>
                <input 
                  type="text" 
                  id="book-country" 
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
                <label htmlFor="book-date">Expected Arrival Date</label>
                <input 
                  type="date" 
                  id="book-date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleChange}
                  className="glass-input" 
                />
              </div>
              <div className="input-group">
                <label htmlFor="book-package-select">Selected Package / Interest</label>
                <select 
                  id="book-package-select" 
                  name="package" 
                  value={formData.package}
                  onChange={handleChange}
                  className="glass-input"
                >
                  <option value="custom">Customized Private Tour</option>
                  <option value="The Grand Ceylon Odyssey (10D/9N)">The Grand Ceylon Odyssey (10D/9N)</option>
                  <option value="Wild Ceylon & Safari Expedition (6D/5N)">Wild Ceylon & Safari Expedition (6D/5N)</option>
                  <option value="Tropical Romance & Honeymoon (7D/6N)">Tropical Romance & Honeymoon (7D/6N)</option>
                  <option value="Ella & Nine Arch Bridge">Ella & Nine Arch Bridge</option>
                  <option value="Sigiriya Rock & Cultural Triangle">Sigiriya Rock & Cultural Triangle</option>
                  <option value="Mirissa, Galle & South Coast">Mirissa, Galle & South Coast</option>
                  <option value="Yala National Park Safari">Yala National Park Safari</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="book-notes">Special Requests / Preferences</label>
              <textarea 
                id="book-notes" 
                name="notes" 
                rows="3" 
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about special hotel wishes, dietary preferences, or places you'd love to visit..." 
                className="glass-input"
              ></textarea>
            </div>

            {/* Solid Plain Color Submit Button */}
            <button type="submit" className="btn-solid-primary full-width" id="btn-submit-inquiry">
              <span>Send Travel Inquiry</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
