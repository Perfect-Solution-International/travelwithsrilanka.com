'use client';

import { useState, useEffect } from 'react';
import { 
  CloseIcon, 
  CheckIcon, 
  WhatsAppIcon, 
  ShieldIcon, 
  ClockIcon, 
  CarIcon,
  ArrowRightIcon
} from '@/components/Icons';

export default function QuickBookModal({ isOpen, onClose, initialPackage = 'Custom Tailor-Made Private Tour' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    date: '',
    travelers: '2',
    package: initialPackage,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Update package when initialPackage changes or modal opens
  useEffect(() => {
    if (initialPackage) {
      setFormData(prev => ({ ...prev, package: initialPackage }));
    }
  }, [initialPackage, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state after closed
      setTimeout(() => {
        setSubmitted(false);
        setErrorMsg('');
      }, 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please fill in your name, email, and phone/WhatsApp number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setInquiryId(data.inquiry?.id || `INQ-${Math.floor(1000 + Math.random() * 9000)}`);
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again or message via WhatsApp.');
      }
    } catch (err) {
      console.error('Error submitting quick booking inquiry:', err);
      setErrorMsg('Network error. Please try again or contact us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      country: '',
      date: '',
      travelers: '2',
      package: 'Custom Tailor-Made Private Tour',
      notes: ''
    });
    onClose();
  };

  const packagesList = [
    'The Grand Ceylon Odyssey (10 Days / 9 Nights)',
    'Wild Ceylon & Safari Expedition (6 Days / 5 Nights)',
    'Tropical Romance & Honeymoon (7 Days / 6 Nights)',
    'Cultural Triangle & Ancient Citadels (5 Days / 4 Nights)',
    'Highlands, Tea Trails & Scenic Rails (5 Days / 4 Nights)',
    'Southern Golden Coastline & Galle (4 Days / 3 Nights)',
    'Custom Tailor-Made Private Tour'
  ];

  return (
    <div 
      className="quick-book-modal-overlay" 
      onClick={handleResetAndClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="quick-book-modal-window" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          type="button" 
          className="quick-book-close-btn"
          onClick={handleResetAndClose}
          aria-label="Close booking modal"
          title="Close"
        >
          <CloseIcon size={18} color="currentColor" />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div style={{ marginBottom: '22px' }}>
              <div className="quick-book-badge">
                <ShieldIcon size={13} color="#34d399" />
                <span>Instant Tour Reservation</span>
              </div>
              <h2 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(1.35rem, 3.2vw, 1.7rem)', 
                fontWeight: 800, 
                color: 'var(--text-primary)', 
                lineHeight: 1.25, 
                marginBottom: '8px' 
              }}>
                Book Your Dream <span style={{ color: '#34d399' }}>Ceylon Tour</span>
              </h2>
              <p style={{ 
                fontSize: '0.88rem', 
                color: 'var(--text-secondary)', 
                lineHeight: 1.5, 
                margin: 0 
              }}>
                Reserve your customized private journey. We will review your dates and confirm with an all-inclusive quote within 12 hours.
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fca5a5',
                fontSize: '0.85rem',
                marginBottom: '16px'
              }}>
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="quick-book-grid">
                {/* Full Name */}
                <div className="quick-book-field">
                  <label htmlFor="qb-name">Full Name *</label>
                  <input
                    type="text"
                    id="qb-name"
                    name="name"
                    placeholder="e.g. David Miller"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="quick-book-field">
                  <label htmlFor="qb-email">Email Address *</label>
                  <input
                    type="email"
                    id="qb-email"
                    name="email"
                    placeholder="e.g. david@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="quick-book-field">
                  <label htmlFor="qb-phone">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    id="qb-phone"
                    name="phone"
                    placeholder="e.g. +44 7911 123456"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Country */}
                <div className="quick-book-field">
                  <label htmlFor="qb-country">Country of Residence</label>
                  <input
                    type="text"
                    id="qb-country"
                    name="country"
                    placeholder="e.g. United Kingdom"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                {/* Tour Package Selection */}
                <div className="quick-book-field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="qb-package">Selected Tour Package</label>
                  <select
                    id="qb-package"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                  >
                    {packagesList.map((pkg) => (
                      <option key={pkg} value={pkg}>{pkg}</option>
                    ))}
                  </select>
                </div>

                {/* Travel Date */}
                <div className="quick-book-field">
                  <label htmlFor="qb-date">Expected Arrival Date</label>
                  <input
                    type="date"
                    id="qb-date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                {/* Number of Travelers */}
                <div className="quick-book-field">
                  <label htmlFor="qb-travelers">Travelers Count</label>
                  <select
                    id="qb-travelers"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                  >
                    <option value="1">Solo Traveler (1)</option>
                    <option value="2">Couple / 2 Persons</option>
                    <option value="3">Small Family / 3 Persons</option>
                    <option value="4">Family / 4 Persons</option>
                    <option value="5">Group (5-6 Persons)</option>
                    <option value="8">Large Group (7+ Persons)</option>
                  </select>
                </div>

                {/* Special Notes / Requests */}
                <div className="quick-book-field" style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="qb-notes">Special Requests / Preferences (Optional)</label>
                  <textarea
                    id="qb-notes"
                    name="notes"
                    rows="2"
                    placeholder="Hotel tier preferences (4-Star / 5-Star Boutique), dietary requirements, pacing, or specific landmarks..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Guarantees Ribbon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 0 16px 0',
                fontSize: '0.76rem',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '18px',
                flexWrap: 'wrap'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <CarIcon size={14} color="#34d399" />
                  <span>Private AC Luxury SUV</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldIcon size={14} color="#38bdf8" />
                  <span>100% SLTDA Certified</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <ClockIcon size={14} color="#fbbf24" />
                  <span>24/7 Dedicated Concierge</span>
                </span>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="quick-book-submit-btn" 
                disabled={loading}
              >
                <span>{loading ? 'Submitting Reservation...' : 'Confirm & Send Booking Request'}</span>
                {!loading && <ArrowRightIcon size={16} color="currentColor" />}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '10px 8px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(5, 150, 105, 0.2)',
              border: '2px solid rgba(5, 150, 105, 0.6)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              boxShadow: '0 0 30px rgba(5, 150, 105, 0.35)'
            }}>
              <CheckIcon size={32} color="#34d399" />
            </div>

            <div className="quick-book-badge" style={{ marginBottom: '8px' }}>
              <span>Booking Request Received</span>
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.6rem', 
              fontWeight: 800, 
              color: '#FFFFFF', 
              marginBottom: '10px' 
            }}>
              Thank You, {formData.name}!
            </h3>

            <p style={{ 
              color: 'var(--text-secondary)', 
              fontSize: '0.92rem', 
              lineHeight: 1.6, 
              maxWidth: '460px', 
              margin: '0 auto 20px auto' 
            }}>
              Your reservation request for <strong style={{ color: '#FFFFFF' }}>{formData.package}</strong> has been logged under Reference ID <strong style={{ color: '#34d399' }}>{inquiryId}</strong>. Our senior travel concierge will connect with you via WhatsApp & Email within 12 hours.
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '14px 18px',
              textAlign: 'left',
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Traveler:</span>
                <strong style={{ color: '#FFFFFF' }}>{formData.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Contact Phone:</span>
                <strong style={{ color: '#FFFFFF' }}>{formData.phone}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Travelers Count:</span>
                <strong style={{ color: '#FFFFFF' }}>{formData.travelers} Person(s)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Status:</span>
                <strong style={{ color: '#34d399' }}>Confirmed to Concierge Desk</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href={`https://wa.me/94702000606?text=${encodeURIComponent(`Hi Hobby & Tours, I just submitted a booking request for ${formData.package} (Ref: ${inquiryId}). My name is ${formData.name}.`)}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-solid-primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '12px 22px', 
                  textDecoration: 'none' 
                }}
              >
                <WhatsAppIcon size={16} color="#ffffff" />
                <span>Chat on WhatsApp</span>
              </a>

              <button 
                type="button" 
                className="btn-solid-outline" 
                style={{ padding: '12px 22px' }}
                onClick={handleResetAndClose}
              >
                <span>Done &amp; Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
