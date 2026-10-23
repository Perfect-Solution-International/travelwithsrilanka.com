'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldIcon, CheckIcon, CarIcon, BellIcon, DiamondIcon, PhoneIcon } from '@/components/Icons';

export default function TravelerProtectionPage() {
  const PILLARS = [
    {
      icon: <ShieldIcon size={24} color="#059669" />,
      title: 'SLTDA Certified Operator',
      desc: 'Officially accredited by the Sri Lanka Tourism Development Authority, ensuring full compliance with national safety and service standards.'
    },
    {
      icon: <CarIcon size={24} color="var(--brand-gold)" />,
      title: 'Comprehensive Passenger Coverage',
      desc: 'Every vehicle in our private fleet carries extensive commercial passenger liability insurance for complete peace of mind.'
    },
    {
      icon: <BellIcon size={24} color="var(--brand-cyan-accent)" />,
      title: '24/7 WhatsApp Concierge Desk',
      desc: 'Direct, instant access to your dedicated travel architect and senior operations managers throughout every hour of your stay.'
    },
    {
      icon: <DiamondIcon size={24} color="#059669" />,
      title: 'Guaranteed Vehicle Replacement',
      desc: 'In the rare event of mechanical issues, our islandwide logistics network dispatches an equivalent luxury replacement vehicle immediately.'
    }
  ];

  return (
    <main>
      <Navbar />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Traveler Protection</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Guest Welfare &amp; Peace of Mind</span>
          <h1 className="page-hero-title">
            Traveler Protection &amp; <span className="highlight-green">Safety Charter</span>
          </h1>
          <p className="page-hero-desc">
            Your safety, security, and tranquility are paramount. From pre-arrival flight monitoring to vetted boutique villas and licensed chauffeur-guides, discover our comprehensive guest protection framework.
          </p>
        </div>
      </section>

      {/* Legal Content Body */}
      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="container legal-content-wrap">
          {/* Key Protection Pillars Grid */}
          <div className="info-feature-grid" style={{ marginBottom: '40px', marginTop: '0' }}>
            {PILLARS.map((p, idx) => (
              <div key={idx} className="glass-card info-feature-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <strong style={{ fontSize: '1.02rem' }}>{p.title}</strong>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '4px 0 0 0' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="legal-card glass-panel">
            {/* Section 1 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>1.</span> Official Accreditation &amp; Government Standards
              </h2>
              <p className="legal-text">
                Travel with Sri Lanka by Hobby &amp; Tours (operated by Perfect Solution International (Pvt) Ltd) operates under full compliance with Sri Lankan tourism legislation. We adhere to the stringent operational, financial, and ethical guidelines mandated by the Sri Lanka Tourism Development Authority (SLTDA).
              </p>
              <p className="legal-text">
                Unlike informal online gig drivers, our operations are legally bonded, insured, and verified, providing foreign travelers with the highest degree of consumer protection available in Sri Lanka.
              </p>
            </div>

            {/* Section 2 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>2.</span> Chauffeur Excellence &amp; Defensive Driving Standards
              </h2>
              <p className="legal-text">
                Your private chauffeur-guide is your companion, navigator, and protector on the road. We enforce strict hiring and training protocols:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Government Tourist Driver License:</strong> Every chauffeur holds valid certification from the Sri Lanka Tourist Board, requiring background checks and medical clearance.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Regulated Driving Limits:</strong> Drivers are restricted to a maximum of 9 to 10 hours on the road per day. We provide separate private lodging for chauffeurs at all destinations so they are well-rested every morning.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>First Aid &amp; Emergency Preparedness:</strong> Drivers are trained in emergency protocols, route diversion in case of severe mountain weather, and rapid contact with regional medical centers.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>3.</span> Private Fleet Maintenance &amp; Equipment
              </h2>
              <p className="legal-text">
                Every sedan, cross-over SUV, executive high-roof van, and VIP Mercedes-Benz in our private transport fleet is subject to rigid inspection standards:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Multi-Point Pre-Trip Inspection:</strong> Brakes, tires, suspension, dual climate air-conditioning, and fluid levels are certified prior to dispatch.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Child Safety Restraints:</strong> Approved infant and toddler safety seats are provided upon request free of charge.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Daily Sanitization:</strong> Vehicles are cleaned and sanitized at the end of each day to guarantee impeccable freshness.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Rapid Replacement Network:</strong> In the event of a flat tire or mechanical issue, our islandwide support network dispatches an equivalent luxury replacement vehicle immediately.</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>4.</span> Live Flight Tracking &amp; Airport Reception
              </h2>
              <p className="legal-text">
                From the moment your plane takes off, our 24/7 flight operations desk monitors your flight status in real time. If your flight is delayed or rescheduled by airlines, our chauffeur is automatically updated to be present at the Colombo Bandaranaike International Airport (CMB) arrival lounge with your personalized name placard.
              </p>
            </div>

            {/* Section 5 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>5.</span> Health, Hygiene &amp; Medical Network
              </h2>
              <p className="legal-text">
                We coordinate closely with Sri Lanka&apos;s leading private international hospitals (including Asiri Central, Nawaloka, and Durdans) located across Colombo, Kandy, Galle, and major tourist hubs.
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Sealed Mineral Water:</strong> Chilled, sealed bottled mineral water from certified spring sources is provided daily in your vehicle.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Dietary &amp; Allergy Precautions:</strong> Our concierge team communicates any food allergies (gluten-free, nut allergies, vegan, lactose intolerance) directly to hotel head chefs in advance.</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>6.</span> Ethical Wildlife &amp; Environmental Protection
              </h2>
              <p className="legal-text">
                Sri Lanka is home to extraordinary biodiversity. We champion ethical, non-intrusive wildlife expeditions:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>Our safari jeeps maintain strict distance limits and never crowd or corner leopards, elephants, or sloth bears.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>Marine whale-watching catamarans operate in strict compliance with international marine mammal viewing guidelines, ensuring zero harassment of blue whales and dolphins.</span>
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>7.</span> 100% Price Lock &amp; Zero Hidden Fees
              </h2>
              <p className="legal-text">
                When you book with Travel with Sri Lanka by Hobby &amp; Tours, your agreed quotation is locked. You will never experience sudden fuel surcharges, highway toll requests, or driver lodging fees during your tour.
              </p>
            </div>
          </div>

          {/* Subpage CTA Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
                Travel With Peace of Mind Guaranteed
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Speak directly with an itinerary architect today or design your dream trip in real time.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-solid-primary">
                <span>Inquire Now</span>
              </Link>
              <Link href="/packages" className="btn-solid-outline">
                <span>View Tour Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
