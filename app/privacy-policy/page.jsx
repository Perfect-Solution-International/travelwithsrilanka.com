'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldIcon, CheckIcon, MailIcon, WhatsAppIcon } from '@/components/Icons';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />

      {/* Page Hero Header */}
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="page-breadcrumbs">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Privacy Policy</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">Client Trust &amp; Confidentiality</span>
          <h1 className="page-hero-title">
            Privacy Policy &amp; <span className="highlight-green">Data Protection</span>
          </h1>
          <p className="page-hero-desc">
            At Travel with Sri Lanka by Hobby &amp; Tours, protecting your personal data, itinerary preferences, and travel privacy is an essential part of our commitment to luxury hospitality.
          </p>
        </div>
      </section>

      {/* Legal Content Body */}
      <section className="section-container" style={{ paddingTop: '0' }}>
        <div className="container legal-content-wrap">
          <div className="legal-highlight-box glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(5, 150, 105, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldIcon size={20} color="#059669" />
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <strong style={{ fontSize: '1.02rem', display: 'block' }}>Our Core Privacy Guarantee</strong>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                  We never sell, rent, or monetize your personal travel information. Your data is used exclusively to design, book, and execute your private Sri Lankan expedition.
                </p>
              </div>
              <span className="glass-pill" style={{ fontSize: '0.76rem', color: 'var(--brand-gold)' }}>
                Updated: October 2026
              </span>
            </div>
          </div>

          <div className="legal-card glass-panel">
            {/* Section 1 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>1.</span> Information We Collect
              </h2>
              <p className="legal-text">
                When you browse our website, request a custom itinerary quote, or book an expedition with Travel with Sri Lanka by Hobby &amp; Tours, we collect specific categories of information necessary to deliver seamless travel services:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Contact &amp; Identity Details:</strong> Full name, country of residence, contact telephone / WhatsApp number, and email address.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Travel &amp; Logistics Logistics:</strong> Estimated arrival and departure flight details, party size, duration of stay, accommodation tier preferences, and dietary requirements.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Official Regulatory Details:</strong> Passport numbers, nationality, and birth dates required exclusively by the Department of Wildlife Conservation (DWC) for national park safari permits, reserved 1st class Sri Lanka Railway tickets, and mandatory hotel registration compliance.</span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>2.</span> How We Use Your Information
              </h2>
              <p className="legal-text">
                Every piece of information collected is processed lawfully and strictly for travel operational requirements:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>To architect customized tour itineraries, calculate live cost breakdowns, and reserve luxury boutique hotels and private pool villas.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>To assign and brief your dedicated private chauffeur-guide with your flight schedule for on-time airport reception.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>To procure reserved tickets for high-demand experiences such as the Kandy-Ella scenic train and private 4x4 Yala/Wilpattu safari jeeps.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>To provide 24/7 dedicated concierge assistance via WhatsApp during your tour in Sri Lanka.</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>3.</span> Sharing With Trusted Hospitality Partners
              </h2>
              <p className="legal-text">
                To fulfill your bespoke journey, we share strictly relevant operational details only with vetted service providers:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Handpicked Hotels &amp; Resorts:</strong> Guest names and dietary restrictions for room check-in and personalized service.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>National Park &amp; Wildlife Authorities:</strong> Passenger manifests required by Sri Lankan conservation laws.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span><strong>Emergency Medical Providers:</strong> In the rare event of illness or accident, relevant medical or insurance information is communicated directly to licensed health facilities.</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>4.</span> Data Security &amp; Storage
              </h2>
              <p className="legal-text">
                We implement industry-standard organizational and technological safeguards. All client communications and form submissions are transmitted via Secure Socket Layer (SSL/TLS) encryption. Access to passport documents and sensitive details is restricted solely to authorized travel architects handling your direct reservation.
              </p>
              <p className="legal-text">
                Upon the safe conclusion of your journey, non-essential temporary documents (such as passport copies used for railway reservations) are securely purged in accordance with our retention policy.
              </p>
            </div>

            {/* Section 5 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>5.</span> Cookies &amp; Website Analytics
              </h2>
              <p className="legal-text">
                Our website utilizes minimal functional cookies to retain your chosen user preferences (such as dark mode theme and preferred currency selection: USD, EUR, GBP, LKR). We may utilize anonymous analytical metrics to monitor page load times and enhance interface navigation. We do not use third-party tracking pixels to track you across unrelated web properties.
              </p>
            </div>

            {/* Section 6 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>6.</span> Your Legal Rights
              </h2>
              <p className="legal-text">
                Regardless of your country of citizenship, we honor universal privacy rights:
              </p>
              <ul className="legal-list">
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>The right to request a full copy of the personal information we hold about you.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>The right to correct or update any outdated or inaccurate personal records.</span>
                </li>
                <li>
                  <CheckIcon size={14} color="#059669" />
                  <span>The right to request deletion of your information from our active client databases.</span>
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="legal-section-block">
              <h2 className="legal-section-title">
                <span>7.</span> Privacy Inquiries &amp; Contact
              </h2>
              <p className="legal-text">
                If you have questions, concerns, or requests concerning this Privacy Policy, our dedicated privacy and governance team can be reached at:
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '16px' }}>
                <a 
                  href="mailto:info@hobbyntours.com?subject=Privacy%20Inquiry" 
                  className="glass-pill"
                  style={{ padding: '10px 18px', color: 'inherit', textDecoration: 'none' }}
                >
                  <MailIcon size={16} color="var(--brand-cyan-accent)" />
                  <span>info@hobbyntours.com</span>
                </a>
                <a 
                  href="https://wa.me/94702000606" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="glass-pill"
                  style={{ padding: '10px 18px', color: 'inherit', textDecoration: 'none' }}
                >
                  <WhatsAppIcon size={16} color="var(--brand-green-accent)" />
                  <span>WhatsApp: +94 70 2000 606</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Return Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px' }}>
                Ready to Plan with Complete Confidence?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Explore our curated tour packages or design your own bespoke journey with our interactive planner.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/packages" className="btn-solid-primary">
                <span>Browse Tour Packages</span>
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
