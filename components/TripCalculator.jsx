'use client';

import { useState } from 'react';
import { 
  BoltIcon, 
  CompassIcon, 
  WhatsAppIcon 
} from '@/components/Icons';

export default function TripCalculator({ formatPrice, onRequestQuote }) {
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [hotelTier, setHotelTier] = useState('boutique');
  const [vehicle, setVehicle] = useState('suv');
  const [addons, setAddons] = useState({
    safari: true,
    train: true,
    whale: false,
    spa: false,
  });

  // Calculate costs
  let dailyHotel = 70;
  if (hotelTier === 'luxury') dailyHotel = 140;
  if (hotelTier === 'villa') dailyHotel = 230;

  let dailyVehicle = 60;
  if (vehicle === 'suv') dailyVehicle = 85;
  if (vehicle === 'van') dailyVehicle = 110;
  if (vehicle === 'vip') dailyVehicle = 180;

  let addonTotalPerPerson = 0;
  if (addons.safari) addonTotalPerPerson += 85;
  if (addons.train) addonTotalPerPerson += 35;
  if (addons.whale) addonTotalPerPerson += 65;
  if (addons.spa) addonTotalPerPerson += 70;

  const totalTransport = dailyVehicle * days;
  const totalHotel = dailyHotel * days * travelers;
  const totalActivities = addonTotalPerPerson * travelers;
  const grandTotalUSD = Math.round(totalTransport + totalHotel + totalActivities);
  const perPersonUSD = Math.round(grandTotalUSD / travelers);

  const handleToggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRequestClick = () => {
    if (onRequestQuote) {
      onRequestQuote({
        days,
        travelers,
        hotelTier,
        vehicle,
        addons,
        grandTotalUSD,
        perPersonUSD
      });
    }
  };

  return (
    <section className="section-container" id="calculator">
      <div className="container">
        <div className="planner-layout glass-panel">
          {/* Info Side */}
          <div>
            <div className="section-tag glass-pill">Live Interactive Tool</div>
            <h2 className="planner-title">
              Build Your Dream <span className="highlight-green">Tour Estimate</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Want something uniquely yours? Customize duration, hotel tier, vehicle type, and experiences to see an instantaneous estimated quote in real-time.
            </p>

            <div className="planner-perks">
              <div className="perk-item">
                <span className="perk-icon">
                  <BoltIcon size={20} color="var(--brand-gold)" />
                </span>
                <div>
                  <strong>Instant Quotation</strong>
                  <small style={{ color: 'var(--text-secondary)' }}>Transparent calculations with zero surprise fees</small>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">
                  <CompassIcon size={20} color="var(--brand-gold)" />
                </span>
                <div>
                  <strong>Flexibility Guaranteed</strong>
                  <small style={{ color: 'var(--text-secondary)' }}>Every itinerary can be tweaked by our travel specialists</small>
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-icon">
                  <WhatsAppIcon size={20} color="var(--brand-green-accent)" />
                </span>
                <div>
                  <strong>Direct WhatsApp Support</strong>
                  <small style={{ color: 'var(--text-secondary)' }}>Chat with your personal itinerary architect</small>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="planner-form glass-card">
            {/* Step 1: Duration */}
            <div className="form-group">
              <div className="slider-header">
                <label htmlFor="calc-days">Trip Duration:</label>
                <span className="slider-val-badge glass-pill">{days} Days / {days - 1} Nights</span>
              </div>
              <input 
                type="range" 
                id="calc-days" 
                min="3" 
                max="21" 
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="glass-slider"
              />
              <div className="slider-scale">
                <span>3 Days</span>
                <span>7 Days</span>
                <span>14 Days</span>
                <span>21 Days</span>
              </div>
            </div>

            {/* Step 2: Travelers */}
            <div className="form-group">
              <div className="slider-header">
                <label htmlFor="calc-travelers">Number of Travelers:</label>
                <span className="slider-val-badge glass-pill">{travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}</span>
              </div>
              <input 
                type="range" 
                id="calc-travelers" 
                min="1" 
                max="10" 
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="glass-slider"
              />
              <div className="slider-scale">
                <span>1 Solo</span>
                <span>2 Couple</span>
                <span>4 Family</span>
                <span>10 Group</span>
              </div>
            </div>

            {/* Step 3: Hotel Tier */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                Accommodation Category:
              </label>
              <div className="tier-selector-grid">
                <div 
                  className={`tier-card ${hotelTier === 'boutique' ? 'active' : ''}`}
                  onClick={() => setHotelTier('boutique')}
                >
                  <div className="tier-content">
                    <span className="tier-badge">3 - 4 Star</span>
                    <strong className="tier-title">Boutique Stays</strong>
                    <small className="tier-sub">Charming &amp; Eco</small>
                  </div>
                </div>

                <div 
                  className={`tier-card ${hotelTier === 'luxury' ? 'active' : ''}`}
                  onClick={() => setHotelTier('luxury')}
                >
                  <div className="tier-content">
                    <span className="tier-badge">5-Star</span>
                    <strong className="tier-title">Luxury Resorts</strong>
                    <small className="tier-sub">Heritage Resorts</small>
                  </div>
                </div>

                <div 
                  className={`tier-card ${hotelTier === 'villa' ? 'active' : ''}`}
                  onClick={() => setHotelTier('villa')}
                >
                  <div className="tier-content">
                    <span className="tier-badge tier-badge-gold">VIP Tier</span>
                    <strong className="tier-title">Private Villas</strong>
                    <small className="tier-sub">Pool Sanctuary</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Vehicle Fleet */}
            <div className="form-group">
              <label htmlFor="calc-vehicle" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                Private Transport Fleet:
              </label>
              <select 
                id="calc-vehicle" 
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="glass-input"
              >
                <option value="sedan">Luxury Private Sedan (1 - 2 Guests)</option>
                <option value="suv">Premium AC SUV / Cross-over (1 - 4 Guests)</option>
                <option value="van">High-Roof Luxury Van (4 - 8 Guests)</option>
                <option value="vip">Mercedes-Benz / BMW VIP Class</option>
              </select>
            </div>

            {/* Step 5: Add-ons */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '8px' }}>
                Included Curated Experiences:
              </label>
              <div className="addons-grid">
                <label className="glass-checkbox">
                  <input 
                    type="checkbox" 
                    checked={addons.safari}
                    onChange={() => handleToggleAddon('safari')}
                  />
                  <span>Yala 4x4 Safari (+ $85/p)</span>
                </label>
                <label className="glass-checkbox">
                  <input 
                    type="checkbox" 
                    checked={addons.train}
                    onChange={() => handleToggleAddon('train')}
                  />
                  <span>Scenic Train (+ $35/p)</span>
                </label>
                <label className="glass-checkbox">
                  <input 
                    type="checkbox" 
                    checked={addons.whale}
                    onChange={() => handleToggleAddon('whale')}
                  />
                  <span>Blue Whale (+ $65/p)</span>
                </label>
                <label className="glass-checkbox">
                  <input 
                    type="checkbox" 
                    checked={addons.spa}
                    onChange={() => handleToggleAddon('spa')}
                  />
                  <span>Ayurvedic Spa (+ $70/p)</span>
                </label>
              </div>
            </div>

            {/* Results Box */}
            <div className="calc-result-box glass-panel">
              <div className="calc-cost-breakdown">
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Estimated Total:
                  </span>
                  <div className="res-grand-total">{formatPrice(grandTotalUSD)}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Per Traveler:
                  </span>
                  <div className="res-pp">{formatPrice(perPersonUSD)} / person</div>
                </div>
              </div>

              {/* Plain Solid Button */}
              <button 
                type="button" 
                className="btn-solid-primary full-width"
                onClick={handleRequestClick}
              >
                <span>Request This Custom Itinerary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
