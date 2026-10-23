'use client';

import Link from 'next/link';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TripAdvisorIcon, 
  YouTubeIcon, 
  PhoneIcon, 
  WhatsAppIcon, 
  MailIcon 
} from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="footer-section" id="footer">
      <div className="container footer-content">
        {/* Brand Column */}
        <div>
          <div className="footer-logo-wrap">
            <Link href="/" aria-label="Travel with Sri Lanka">
              <img 
                src="/logo-transparent.png?v=9" 
                alt="Travel with Sri Lanka Logo" 
                className="footer-logo-img"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/logo.png';
                }}
              />
            </Link>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, display: 'block' }}>
                <span className="brand-light-blue">TRAVEL WITH</span> <span className="highlight-gold">SRI LANKA</span>
              </span>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--brand-gold)' }}>
                BY HOBBY &amp; TOURS · LUXURY EXPEDITIONS
              </span>
            </div>
          </div>
          <p className="footer-bio">
            Crafting unforgettable bespoke journeys across the paradise island of Sri Lanka. Discover ancient citadels, misty tea-draped valleys, wild savannas, and tranquil turquoise beaches with unrivaled luxury comfort.
          </p>
          <div className="social-links-row">
            <a 
              href="https://www.instagram.com/hobbyntourss?psln=MTB5MjYzNXVvcTczZg==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-btn-icon" 
              aria-label="Instagram"
            >
              <InstagramIcon size={16} color="currentColor" />
            </a>
            <a 
              href="https://www.facebook.com/share/19zuZZm6ME/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="glass-btn-icon" 
              aria-label="Facebook"
            >
              <FacebookIcon size={16} color="currentColor" />
            </a>
            <a href="#" className="glass-btn-icon" aria-label="TripAdvisor">
              <TripAdvisorIcon size={16} color="currentColor" />
            </a>
            <a href="#" className="glass-btn-icon" aria-label="YouTube">
              <YouTubeIcon size={16} color="currentColor" />
            </a>
          </div>
        </div>

        {/* Quick Destinations */}
        <div>
          <h4 className="f-title">Quick Destinations</h4>
          <ul className="f-list">
            <li><Link href="/destinations">Ella Nine Arch &amp; Tea Hills</Link></li>
            <li><Link href="/destinations">Sigiriya Lion Rock Fortress</Link></li>
            <li><Link href="/destinations">Mirissa &amp; Southern Coast</Link></li>
            <li><Link href="/destinations">Yala Leopard Safari</Link></li>
            <li><Link href="/destinations">Nuwara Eliya Tea Country</Link></li>
            <li><Link href="/destinations">Galle Dutch Fort</Link></li>
          </ul>
        </div>

        {/* Tour Packages */}
        <div>
          <h4 className="f-title">Tour Packages</h4>
          <ul className="f-list">
            <li><Link href="/packages">Grand Ceylon Odyssey (10 Days)</Link></li>
            <li><Link href="/packages">Wildlife &amp; Leopard Safari (6 Days)</Link></li>
            <li><Link href="/packages">Honeymoon &amp; Luxury Villas (7 Days)</Link></li>
            <li><Link href="/trip-planner">Customized Itinerary Planner</Link></li>
            <li><Link href="/why-us">Why Travel With Us</Link></li>
            <li><Link href="/reviews">Traveler Reviews</Link></li>
          </ul>
        </div>

        {/* Trust & Legal Protection */}
        <div>
          <h4 className="f-title">Trust &amp; Legal</h4>
          <ul className="f-list">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms &amp; Conditions</Link></li>
            <li><Link href="/traveler-protection">Traveler Protection</Link></li>
            <li><Link href="/why-us">Guest Safety Guarantee</Link></li>
            <li><Link href="/contact">Concierge Support</Link></li>
          </ul>
        </div>

        {/* Contact & Help */}
        <div>
          <h4 className="f-title">Contact &amp; Concierge</h4>
          <ul className="f-contact-list">
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '26px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', flexShrink: 0 }}>
                <PhoneIcon size={15} color="var(--brand-gold)" />
              </span>
              <span><strong>Hotline:</strong> <a href="tel:+94702000606" style={{ color: 'inherit', textDecoration: 'none' }}>+94 70 2000 606</a></span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '26px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', flexShrink: 0 }}>
                <WhatsAppIcon size={15} color="var(--brand-green-accent)" />
              </span>
              <span><strong>WhatsApp:</strong> <a href="https://wa.me/94702000606" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>+94 70 2000 606</a></span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '26px' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '22px', flexShrink: 0 }}>
                <MailIcon size={15} color="var(--brand-cyan-accent)" />
              </span>
              <span><strong>Email:</strong> info@travelwithsrilanka.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} <strong>Travel with Sri Lanka by Hobby &amp; Tours</strong>. All Rights Reserved.</p>
          <div className="footer-developer-credit">
            <span className="dev-by-text">Developed by</span>
            <a 
              href="https://www.perfectsolutioninternational.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="dev-by-link"
              title="Visit Perfect Solution International"
              aria-label="Developed by Perfect Solution International"
            >
              <img 
                src="/perfect-solution-logo.png" 
                alt="Perfect Solution International" 
                className="dev-by-logo" 
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
