'use client';

import { useState } from 'react';
import { 
  StarIcon, 
  CarIcon, 
  ShieldIcon, 
  LeafIcon, 
  SearchIcon 
} from '@/components/Icons';

export default function Hero({ onSearchSubmit }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dest, setDest] = useState('all');
  const [duration, setDuration] = useState('all');
  const [style, setStyle] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit({ category: activeCategory, dest, duration, style });
    }
    const destSec = document.getElementById('destinations');
    if (destSec) {
      destSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background Panorama */}
      <div className="hero-backdrop-container">
        <img 
          src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=2000&q=85" 
          alt="Scenic Nine Arch Bridge Ella Sri Lanka" 
          className="hero-bg-img"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero-backdrop-gradient"></div>
      </div>

      <div className="container hero-content">
        {/* Floating Glass Pill */}
        <div className="hero-glass-pill glass-pill">
          <span className="badge-dot"></span>
          <span>Sri Lanka's Premier Private Tour Specialists</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline">
          Unveil The Soul of <span className="highlight-gold">Sri Lanka</span> With Tailored Luxury
        </h1>

        {/* Subtitle */}
        <p className="hero-subheadline">
          From emerald misty tea plateaus and ancient rock citadels to private wild leopard safaris and turquoise ocean sanctuaries. Travel gracefully with <strong>Travel with Sri Lanka</strong> <em>by Hobby &amp; Tours</em>.
        </p>

        {/* Glass Trust Metrics Bar */}
        <div className="hero-trust-bar glass-pill">
          <div className="trust-item">
            <span className="trust-icon">
              <StarIcon size={18} color="var(--brand-gold)" />
            </span>
            <div>
              <strong>4.9 / 5.0</strong>
              <small>500+ Traveler Reviews</small>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-icon">
              <CarIcon size={18} color="var(--brand-gold)" />
            </span>
            <div>
              <strong>Private Chauffeurs</strong>
              <small>Luxury AC Fleet</small>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-icon">
              <ShieldIcon size={18} color="var(--brand-gold)" />
            </span>
            <div>
              <strong>100% Bespoke</strong>
              <small>Tailor-Made Itineraries</small>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <span className="trust-icon">
              <LeafIcon size={18} color="var(--brand-gold)" />
            </span>
            <div>
              <strong>Eco-Certified</strong>
              <small>Sustainable Tourism</small>
            </div>
          </div>
        </div>

        {/* Liquid Glass Search & Booking Engine */}
        <div className="liquid-search-card glass-panel" id="hero-search-card">
          <div className="search-category-tabs">
            <button 
              type="button"
              className={`search-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Journeys
            </button>
            <button 
              type="button"
              className={`search-tab ${activeCategory === 'round-island' ? 'active' : ''}`}
              onClick={() => setActiveCategory('round-island')}
            >
              Round Island
            </button>
            <button 
              type="button"
              className={`search-tab ${activeCategory === 'wildlife' ? 'active' : ''}`}
              onClick={() => setActiveCategory('wildlife')}
            >
              Wildlife Safari
            </button>
            <button 
              type="button"
              className={`search-tab ${activeCategory === 'highlands' ? 'active' : ''}`}
              onClick={() => setActiveCategory('highlands')}
            >
              Misty Highlands
            </button>
            <button 
              type="button"
              className={`search-tab ${activeCategory === 'beach' ? 'active' : ''}`}
              onClick={() => setActiveCategory('beach')}
            >
              Coastal Retreats
            </button>
          </div>

          <form className="search-form-grid" onSubmit={handleSearch}>
            <div className="search-field">
              <label htmlFor="search-dest">Destination / Region</label>
              <select 
                id="search-dest" 
                className="glass-input"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
              >
                <option value="all">Anywhere in Sri Lanka</option>
                <option value="ella">Ella & Central Highlands</option>
                <option value="sigiriya">Sigiriya & Ancient Triangle</option>
                <option value="mirissa">Mirissa & South Coast</option>
                <option value="yala">Yala Wildlife Safari</option>
                <option value="kandy">Kandy Cultural Capital</option>
                <option value="nuwara-eliya">Nuwara Eliya Tea Trails</option>
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="search-duration">Trip Duration</label>
              <select 
                id="search-duration" 
                className="glass-input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="all">Any Duration</option>
                <option value="3-5">3 - 5 Days (Short Escapes)</option>
                <option value="6-9">6 - 9 Days (Signature Island)</option>
                <option value="10-14">10 - 14 Days (Grand Discovery)</option>
                <option value="15+">15+ Days (Comprehensive)</option>
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="search-style">Experience Style</label>
              <select 
                id="search-style" 
                className="glass-input"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option value="all">Luxury & Boutique</option>
                <option value="honeymoon">Romantic Honeymoon</option>
                <option value="family">Family Adventure</option>
                <option value="wildlife">Wildlife & Photography</option>
                <option value="wellness">Ayurveda & Wellness</option>
              </select>
            </div>

            <div className="search-action">
              <button type="submit" className="btn-solid-primary" id="btn-hero-search">
                <SearchIcon size={16} color="currentColor" />
                <span>Find Escapes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
