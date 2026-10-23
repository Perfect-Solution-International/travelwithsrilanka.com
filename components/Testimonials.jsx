'use client';

import { StarIcon } from '@/components/Icons';

export default function Testimonials() {
  const REVIEWS = [
    {
      initials: 'CD',
      text: '"Travel with Sri Lanka crafted the most unbelievable 10-day honeymoon for us. Our driver Kamal was an absolute gentleman and showed us secret viewpoints in Ella that normal tourists never see. The tea plantation villa was pure heaven!"',
      name: 'Charlotte & Edward Davies',
      trip: 'London, UK · Grand Ceylon Tour'
    },
    {
      initials: 'MB',
      text: '"As wildlife photographers, we wanted dedicated leopard tracking in Yala and the elephant gathering in Minneriya. Travel with Sri Lanka arranged exceptional jeeps and trackers. We spotted 3 leopards in a single morning! Truly 5-star service."',
      name: 'Markus & Lena Becker',
      trip: 'Munich, Germany · Wildlife Safari'
    },
    {
      initials: 'SJ',
      text: '"Traveling with our two kids can be stressful, but Travel with Sri Lanka took care of every single detail. The private air-conditioned van was spotless, child car seats were provided, and our guide was so patient and friendly. Unforgettable!"',
      name: 'Sarah Jenkins & Family',
      trip: 'Sydney, Australia · Family Discovery'
    }
  ];

  return (
    <section className="section-container" id="reviews">
      <div className="container">
        <div className="text-center">
          <div className="section-tag glass-pill">Loved by Global Travelers</div>
          <h2 className="section-title">
            Memories That <span className="highlight-green">Last A Lifetime</span>
          </h2>
          <p className="section-description">
            Read real stories from travelers across the United Kingdom, Europe, Australia, and the Americas who explored Ceylon with us.
          </p>
        </div>

        <div className="testimonials-grid">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="testimonial-card glass-card">
              <div className="testi-stars" style={{ display: 'flex', gap: '3px', color: 'var(--brand-gold)', marginBottom: '14px' }}>
                {[...Array(5)].map((_, s) => (
                  <StarIcon key={s} size={15} color="var(--brand-gold)" />
                ))}
              </div>
              <p className="testi-text">{rev.text}</p>
              <div className="testi-author">
                <div 
                  className="author-avatar" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 700, 
                    fontSize: '0.85rem', 
                    color: 'var(--brand-gold)', 
                    background: 'rgba(212, 175, 55, 0.12)', 
                    border: '1px solid rgba(212, 175, 55, 0.3)', 
                    borderRadius: '50%', 
                    width: '42px', 
                    height: '42px',
                    flexShrink: 0
                  }}
                >
                  {rev.initials}
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.94rem' }}>{rev.name}</strong>
                  <small style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{rev.trip}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
