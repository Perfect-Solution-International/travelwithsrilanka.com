'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldIcon, CheckIcon, DiamondIcon, CarIcon, BellIcon } from '@/components/Icons';

export default function TermsConditionsPage() {
  return (
    <main>
      <Navbar />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Terms &amp; Conditions</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Transparent Agreement</span>
          <h1 className="page-hero-title">
            Terms &amp; <span className="highlight-gold">Conditions</span>
          </h1>
          <p className="page-hero-desc">
            Fair, clear, and transparent terms governing all private tours and custom expeditions arranged by Travel with Sri Lanka by Hobby &amp; Tours (Perfect Solution International (Pvt) Ltd).
          </p>
        </div>
      </section>

      {/* Legal Content Body */}
      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="container legal-content-wrap">
          {/* Key Guarantees Dashboard */}
          <div className="legal-badge-grid">
            <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShieldIcon size={24} color="#059669" />
              <div>
                <strong style={{ fontSize: '0.96rem', display: 'block' }}>SLTDA Registered</strong>
                <small style={{ color: 'var(--text-secondary)' }}>Compliant with Sri Lanka Tourism authority</small>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <DiamondIcon size={24} color="var(--brand-gold)" />
              <div>
                <strong style={{ fontSize: '0.96rem', display: 'block' }}>Transparent Pricing</strong>
                <small style={{ color: 'var(--text-secondary)' }}>Zero hidden driver lodging or toll costs</small>
              </div>
            </div>
            <div className="glass-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <CarIcon size={24} color="var(--brand-cyan-accent)" />
              <div>
                <strong style={{ fontSize: '0.96rem', display: 'block' }}>100% Private Expeditions</strong>
                <small style={{ color: 'var(--text-secondary)' }}>Dedicated vehicle exclusively for your party</small>
              </div>
            </div>
          </div>

          <div className="legal-card glass-panel">
            {/* Section 1 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>1.</span> Itinerary Planning &amp; Booking Confirmation
              </h2>
              <p className="legal-text">
                Every custom itinerary blueprint is designed collaboratively with our travel architects without obligation. A booking is formally confirmed once the client approves the final day-by-day program and submits the agreed reservation deposit.
              </p>
              <p className="legal-text">
                Upon deposit receipt, our concierge team immediately reserves your boutique accommodations, assigns your dedicated private chauffeur-guide, and locks in reserved 1st class train and safari permits.
              </p>
            </div>

            {/* Section 2 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>2.</span> Pricing, Currency &amp; Payment Schedules
              </h2>
              <p className="legal-text">
                All tour quotes are calculated and formally invoiced in United States Dollars (USD). Payments may also be settled in EUR, GBP, or LKR according to the prevailing interbank exchange rate on the payment date.
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Reservation Deposit:</strong> A standard 20% to 30% deposit is required at confirmation to secure non-refundable boutique villa bookings and peak train passes.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Balance Payment:</strong> The remaining balance may be settled via bank wire transfer 14 days prior to arrival or via secured electronic card payment on tour arrival day.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>All-Inclusive Vehicle Guarantee:</strong> All fuel, expressway tolls, municipal parking, driver meals, and chauffeur accommodations are 100% included in every quote.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>3.</span> Cancellation, Postponement &amp; Refund Policy
              </h2>
              <p className="legal-text">
                We understand that unexpected circumstances arise. Our cancellation policy is designed to be fair, honoring our pre-commitments to independent boutique hoteliers:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>30+ Days Prior to Arrival:</strong> Full refund of deposit, minus any already-issued non-refundable government train tickets or safari entry permits.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>15 to 29 Days Prior to Arrival:</strong> 50% of the deposit is refunded. The remaining 50% is retained to cover hotel non-refundable penalty charges.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Less than 14 Days Prior to Arrival:</strong> Deposit is non-refundable as boutique resorts enforce 100% cancellation lock-in during this window.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Flexible Postponement:</strong> You may reschedule your journey free of administrative penalties for up to 12 months with 21 days&apos; advance notice (subject only to hotel seasonal rate differences, if any).</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>4.</span> Private Chauffeur-Guide &amp; Vehicle Protocols
              </h2>
              <p className="legal-text">
                Our chauffeur-guides are licensed tourism professionals who take pride in providing exceptional hospitality and passenger safety:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Dedicated Private Access:</strong> The vehicle remains exclusively at your service for all programmed sightseeing, dining, and scenic stops.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Safety &amp; Rest Regulations:</strong> In compliance with national road safety regulations, daily driving is limited to a maximum of 9 hours to ensure drivers remain alert and well-rested.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Cleanliness &amp; Comfort:</strong> Vehicles are sanitized daily, air-conditioned throughout, and equipped with cold mineral water.</span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>5.</span> Unforeseen Circumstances &amp; Itinerary Adjustments
              </h2>
              <p className="legal-text">
                In the event of unforeseen natural conditions (such as sudden mountain weather closures, railway technical repairs, or national park conservation restrictions), our 24/7 concierge team will proactively adjust routes. We guarantee to provide equal or superior luxury alternatives at zero additional surcharge.
              </p>
            </div>

            {/* Section 6 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>6.</span> Traveler Responsibilities &amp; Cultural Etiquette
              </h2>
              <p className="legal-text">
                Travelers are responsible for holding a passport valid for at least six months from departure date and securing a valid Sri Lanka Electronic Travel Authorization (ETA).
              </p>
              <p className="legal-text">
                When visiting sacred UNESCO temples (such as the Temple of the Sacred Tooth Relic or Dambulla Caves), guests are required to respect cultural customs by dressing respectfully (covering shoulders and knees, and removing footwear upon entry).
              </p>
            </div>

            {/* Section 7 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>7.</span> Limitation of Liability &amp; Governing Law
              </h2>
              <p className="legal-text">
                Travel with Sri Lanka maintains comprehensive commercial passenger liability insurance. However, travelers are strongly advised to obtain comprehensive personal travel insurance covering medical expenses, trip interruption, and baggage.
              </p>
              <p className="legal-text">
                These terms and conditions are governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the commercial courts of Colombo, Sri Lanka.
              </p>
            </div>
          </div>

          {/* Quick Return Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
                Questions About Our Policies?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Our concierge team is available around the clock to clarify any booking details or custom requests.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-solid-primary">
                <span>Contact Concierge</span>
              </Link>
              <Link href="/traveler-protection" className="btn-solid-outline">
                <span>Traveler Protection</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
