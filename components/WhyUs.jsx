'use client';

import { ShieldIcon, CarIcon, DiamondIcon, BellIcon } from '@/components/Icons';

export default function WhyUs() {
  const FEATURES = [
    {
      icon: <ShieldIcon size={26} color="var(--brand-gold)" />,
      title: '100% Private & Flexible',
      desc: 'No crowds, no schedules forced upon you. Pause for fresh king coconuts by the roadside, linger at tea vistas, or alter the daily tempo whenever you wish.'
    },
    {
      icon: <CarIcon size={26} color="var(--brand-gold)" />,
      title: 'Chauffeur-Guides of Distinction',
      desc: 'Our government-licensed chauffeurs are knowledgeable naturalists, courteous companions, and passionate ambassadors of Sri Lankan heritage.'
    },
    {
      icon: <DiamondIcon size={26} color="var(--brand-gold)" />,
      title: 'Hand-Vetted Boutique Stays',
      desc: 'From secluded clifftop ocean suites to century-old tea planter colonial bungalows, we personally inspect every hotel for comfort and hygiene.'
    },
    {
      icon: <BellIcon size={26} color="var(--brand-gold)" />,
      title: '24/7 Dedicated Concierge',
      desc: 'From the moment your flight touches down at Bandaranaike Airport until your farewell wave, your dedicated trip manager is available instantly on WhatsApp.'
    }
  ];

  return (
    <section className="section-container" id="why-us">
      <div className="container">
        <div className="text-center">
          <div className="section-tag glass-pill">The Travel with Sri Lanka Advantage</div>
          <h2 className="section-title">
            Designed for Discerning <span className="highlight-gold">Travelers</span>
          </h2>
          <p className="section-description">
            We don't operate rushed cookie-cutter bus tours. Every journey with Travel with Sri Lanka is a relaxed private expedition designed around your passions.
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feat, i) => (
            <div key={i} className="feature-card glass-card">
              <div className="feature-icon-box">
                {feat.icon}
              </div>
              <h3 className="feature-title">{feat.title}</h3>
              <p className="feature-desc">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
