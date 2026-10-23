'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ShieldIcon, 
  CarIcon, 
  DiamondIcon, 
  BellIcon, 
  StarIcon, 
  BuildingIcon, 
  CheckIcon,
  WhatsAppIcon
} from '@/components/Icons';

export default function WhyUsPage() {
  const PILLARS = [
    {
      icon: <ShieldIcon size={26} color="var(--brand-gold)" />,
      title: '100% Private & Flexible',
      desc: 'No crowds, no strangers, and no rigid schedules forced upon you. Pause for fresh king coconuts by the roadside, linger at misty tea vistas, or adapt your daily itinerary whenever you wish.'
    },
    {
      icon: <CarIcon size={26} color="var(--brand-gold)" />,
      title: 'Chauffeur-Guides of Distinction',
      desc: 'Our government-certified chauffeurs are knowledgeable naturalists, courteous companions, and passionate ambassadors of Sri Lankan heritage with impeccable driving safety records.'
    },
    {
      icon: <DiamondIcon size={26} color="var(--brand-gold)" />,
      title: 'Hand-Vetted Boutique Stays',
      desc: 'From secluded clifftop ocean suites in Mirissa to century-old colonial tea planter bungalows in Hatton, we personally inspect every hotel for comfort, hygiene, and authentic character.'
    },
    {
      icon: <BellIcon size={26} color="var(--brand-gold)" />,
      title: '24/7 Dedicated WhatsApp Concierge',
      desc: 'From the moment your flight touches down at Bandaranaike International Airport until your farewell wave, your dedicated trip manager is available instantly on WhatsApp for any request.'
    },
    {
      icon: <StarIcon size={26} color="var(--brand-gold)" />,
      title: 'Transparent Pricing, No Surprises',
      desc: 'All vehicle fuel, highway tolls, parking tickets, driver meals, and chauffeur lodging are 100% covered in our quotations. No awkward hidden extra requests mid-journey.'
    },
    {
      icon: <BuildingIcon size={26} color="var(--brand-gold)" />,
      title: 'Ethical & Community-First',
      desc: 'We support local wildlife conservation initiatives, ethical elephant sanctuaries, and rural community artisans to ensure your travels directly sustain Sri Lanka\'s natural beauty.'
    }
  ];

  const FLEET = [
    {
      category: 'Luxury Sedan',
      capacity: '1 - 2 Guests · 2 Large Bags',
      models: 'Toyota Prius / Premio / Axio Hybrid',
      features: ['Dual Climate AC', 'Smooth Quiet Ride', 'USB Phone Charging', 'Chilled Mineral Water']
    },
    {
      category: 'Premium Cross-Over SUV',
      capacity: '1 - 4 Guests · 3 Large Bags',
      models: 'Toyota Prado / Harrier / Honda CR-V',
      features: ['Elevated Scenic Seating', 'All-Wheel Drive Stability', 'Spacious Legroom', 'Luggage Compartment']
    },
    {
      category: 'High-Roof Executive Van',
      capacity: '4 - 8 Guests · 8 Large Bags',
      models: 'Toyota KDH High-Roof Commuter VIP',
      features: ['Reclining Bucket Seats', 'Dual High-Output AC', 'Overhead Parcel Racks', 'Spacious Walk-Through Aisle']
    },
    {
      category: 'VIP Class Chauffeur',
      capacity: '1 - 3 Guests · 3 Large Bags',
      models: 'Mercedes-Benz E/S Class & BMW 5 Series',
      features: ['Executive Leather Luxury', 'Acoustic Sound Insulation', 'Supreme Riding Comfort', 'VIP Dignitary Protocol']
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
            <span>Why Us</span>
          </div>
          <span className="section-tag glass-pill page-hero-badge">The Hobby &amp; Tours Standard</span>
          <h1 className="page-hero-title">
            Crafting Ceylon Journeys with <span className="highlight-gold">Unrivaled Excellence</span>
          </h1>
          <p className="page-hero-desc">
            We don\'t operate rushed cookie-cutter bus tours. Every expedition with Travel with Sri Lanka by Hobby &amp; Tours is a relaxed private journey designed around your passions, safety, and comfort.
          </p>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section className="section-container" style={{ paddingTop: '10px' }}>
        <div className="container">
          <div className="features-grid">
            {PILLARS.map((feat, i) => (
              <div key={i} className="feature-card glass-card">
                <div className="feature-icon-box">
                  {feat.icon}
                </div>
                <h2 className="feature-title" style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{feat.title}</h2>
                <p className="feature-desc" style={{ lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Fleet Showcase */}
          <div className="glass-panel" style={{ marginTop: '70px', padding: '36px' }}>
            <div className="text-center" style={{ marginBottom: '32px' }}>
              <span className="section-tag glass-pill">Executive Transport</span>
              <h2 className="section-title" style={{ fontSize: '1.9rem', marginBottom: '8px' }}>
                Our Private Chauffeured Fleet
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
                All our vehicles are fully insured for foreign passengers, regularly inspected by certified automotive engineers, and sanitized daily.
              </p>
            </div>

            <div className="info-feature-grid">
              {FLEET.map((item, idx) => (
                <div key={idx} className="glass-card info-feature-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--brand-cyan-accent)' }}>{item.category}</strong>
                  </div>
                  <small style={{ color: 'var(--brand-gold)', fontWeight: 600 }}>{item.capacity}</small>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500, margin: '4px 0' }}>
                    {item.models}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {item.features.map((f, i) => (
                      <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckIcon size={12} color="#059669" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Official Accreditation & Peace of Mind */}
          <div className="glass-panel" style={{ marginTop: '50px', padding: '36px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'center' }}>
            <div>
              <span className="section-tag glass-pill">Government Accreditation</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, margin: '10px 0' }}>
                Certified &amp; Registered Tour Operator
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Hobby &amp; Tours is fully registered with the Sri Lanka Tourism Development Authority (SLTDA). We operate with full compliance to national travel regulations, strict safety standards, and round-the-clock emergency assistance.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <ShieldIcon size={24} color="#059669" />
                <div>
                  <strong>SLTDA Registered Operator</strong>
                  <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Officially licensed inbound travel agency</small>
                </div>
              </div>
              <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <CarIcon size={24} color="var(--brand-gold)" />
                <div>
                  <strong>Passenger Liability Insurance</strong>
                  <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Full comprehensive commercial coverage</small>
                </div>
              </div>
              <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <WhatsAppIcon size={24} color="var(--brand-green-accent)" />
                <div>
                  <strong>24/7 Crisis &amp; Flight Monitoring</strong>
                  <small style={{ display: 'block', color: 'var(--text-secondary)' }}>Live flight tracking for smooth airport pickups</small>
                </div>
              </div>
            </div>
          </div>

          {/* Subpage CTA Banner */}
          <div className="subpage-cta-banner glass-panel">
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                Ready to Experience the Difference?
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Tell us about your upcoming travel plans and let our experts design your personalized tour.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-solid-primary">
                <span>Start Your Inquiry</span>
              </Link>
              <Link href="/packages" className="btn-solid-outline">
                <span>Browse Tour Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
