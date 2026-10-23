'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/components/Icons';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const FAQS = [
    {
      q: 'When is the best time of year to visit Sri Lanka?',
      a: 'Sri Lanka is a year-round destination! Because the island experiences two alternating monsoon seasons, when the South & West coast (Mirissa, Galle) are calm from November to April, the East coast (Trincomalee, Arugam Bay) shines from May to October. The central hill country is glorious year-round.'
    },
    {
      q: 'Are all tour packages completely customizable?',
      a: 'Yes, absolutely! Every single itinerary listed on Travel with Sri Lanka can be tailored to your exact dates, preferences, pace, and accommodation desires. You can add extra days on the beach or customize cultural stops with zero hassle.'
    },
    {
      q: 'What is included in the tour price?',
      a: 'Our all-inclusive packages typically cover private dedicated air-conditioned vehicle with fuel and highway tolls, English-speaking certified chauffeur-guide, luxury accommodation with breakfast, national park entry fees, scenic train tickets, and 24/7 concierge assistance.'
    },
    {
      q: 'How do we make reservations and payments?',
      a: 'You can start by submitting an inquiry via our website form or WhatsApp. We will send you a personalized day-by-day itinerary. Once you are 100% happy, you can secure your reservation with a secure deposit. The balance is settled upon arrival in Sri Lanka.'
    }
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section-container" id="faq">
      <div className="container">
        <div className="text-center">
          <div className="section-tag glass-pill">Help & Information</div>
          <h2 className="section-title">
            Frequently Asked <span className="highlight-green">Questions</span>
          </h2>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((item, i) => (
            <div key={i} className="faq-item glass-card">
              <button 
                type="button" 
                className="faq-question"
                onClick={() => toggle(i)}
              >
                <span>{item.q}</span>
                <span 
                  className="faq-toggle-icon" 
                  style={{ 
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.25s ease', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  <ChevronDownIcon size={18} color="var(--brand-gold)" />
                </span>
              </button>
              {openIndex === i && (
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
