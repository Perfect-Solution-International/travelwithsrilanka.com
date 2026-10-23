'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import Packages from '@/components/Packages';
import TripCalculator from '@/components/TripCalculator';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import BookingInquiry from '@/components/BookingInquiry';
import Footer from '@/components/Footer';
import TourModal from '@/components/TourModal';
import { CheckIcon } from '@/components/Icons';

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, format: (val) => `$${Math.round(val).toLocaleString()}` },
  EUR: { symbol: '€', rate: 0.92, format: (val) => `€${Math.round(val * 0.92).toLocaleString()}` },
  GBP: { symbol: '£', rate: 0.78, format: (val) => `£${Math.round(val * 0.78).toLocaleString()}` },
  LKR: { symbol: 'Rs ', rate: 305.0, format: (val) => `Rs ${Math.round(val * 305).toLocaleString()}` },
};

export default function HomePage() {
  const [currency, setCurrency] = useState('USD');
  const [selectedTour, setSelectedTour] = useState(null);
  const [prefilledPackage, setPrefilledPackage] = useState('custom');
  const [toast, setToast] = useState(null);

  const formatPrice = (baseUSD) => {
    if (!baseUSD) return 'Custom Quote';
    const conf = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    return conf.format(baseUSD);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    showToast(`Currency changed to ${newCurr}`);
  };

  const handleSelectTour = (tour) => {
    setSelectedTour(tour);
  };

  const handleBookFromModal = (tourTitle) => {
    setSelectedTour(null);
    setPrefilledPackage(tourTitle);
    const bookingSec = document.getElementById('booking-section');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Selected: ${tourTitle}`);
  };

  const handleCustomQuoteRequest = (quoteData) => {
    setPrefilledPackage('custom');
    const notesEl = document.getElementById('book-notes');
    if (notesEl) {
      notesEl.value = `Custom Plan: ${quoteData.days} Days for ${quoteData.travelers} traveler(s). Accommodation: ${quoteData.hotelTier}. Total: ${formatPrice(quoteData.grandTotalUSD)}.`;
    }
    const bookingSec = document.getElementById('booking-section');
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Custom quote details transferred to inquiry form!');
  };

  return (
    <main>
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Top Destinations */}
      <Destinations 
        formatPrice={formatPrice} 
        onSelectTour={handleSelectTour} 
      />

      {/* Tour Packages */}
      <Packages 
        formatPrice={formatPrice} 
        onSelectTour={handleSelectTour} 
      />

      {/* Interactive Trip Cost Calculator */}
      <TripCalculator 
        formatPrice={formatPrice} 
        onRequestQuote={handleCustomQuoteRequest} 
      />

      {/* Why Travel with Sri Lanka */}
      <WhyUs />

      {/* Traveler Reviews */}
      <Testimonials />

      {/* FAQ Accordion */}
      <Faq />

      {/* Direct Booking & Inquiry Form */}
      <BookingInquiry 
        initialPackage={prefilledPackage} 
        onShowToast={showToast} 
      />

      {/* Footer */}
      <Footer />

      {/* Liquid Modal for Tour Details */}
      <TourModal 
        tour={selectedTour} 
        formatPrice={formatPrice} 
        onClose={() => setSelectedTour(null)} 
        onBookNow={handleBookFromModal} 
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
