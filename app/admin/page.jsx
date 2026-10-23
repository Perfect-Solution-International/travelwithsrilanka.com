'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldIcon, 
  CheckIcon, 
  WhatsAppIcon, 
  MailIcon, 
  StarIcon, 
  DiamondIcon,
  SearchIcon,
  CloseIcon,
  CompassIcon,
  AlertCircleIcon
} from '@/components/Icons';

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('inquiries'); // overview | inquiries | reviews | settings

  // Login form state
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [reviews, setReviews] = useState([]);

  // Change password form state
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    newName: ''
  });

  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        loadInquiries();
        loadReviews();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmittingLogin(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        showToast('Welcome, ' + (data.user.name || data.user.username) + '!');
        loadInquiries();
        loadReviews();
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error: ' + err.message);
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    showToast('Logged out successfully');
  };

  const loadInquiries = async () => {
    try {
      const res = await fetch('/api/admin/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
        }
        showToast(`Inquiry ${id} updated to ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      showToast('Error updating status: ' + err.message);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!confirm(`Are you sure you want to permanently delete inquiry ${id}?`)) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        showToast(`Inquiry ${id} deleted.`);
      }
    } catch (err) {
      showToast('Error deleting: ' + err.message);
    }
  };

  const handleUpdateReviewStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        showToast(`Review ${id} status: ${newStatus.toUpperCase()}`);
      }
    } catch (err) {
      showToast('Error updating review: ' + err.message);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.filter(r => r.id !== id));
        showToast('Review deleted.');
      }
    } catch (err) {
      showToast('Error deleting review: ' + err.message);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!settingsForm.currentPassword) {
      showToast('Current password required to make changes');
      return;
    }
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        showToast('Credentials updated successfully!');
        setSettingsForm({ currentPassword: '', newUsername: '', newPassword: '', newName: '' });
        setCurrentUser(data.user);
      } else {
        showToast(data.error || 'Failed to update credentials');
      }
    } catch (err) {
      showToast('Error updating settings: ' + err.message);
    }
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesStatus = inquiryStatusFilter === 'all' || item.status === inquiryStatusFilter;
    const matchesQuery = !searchQuery || 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.package?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // Calculate Metrics
  const totalInquiriesCount = inquiries.length;
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'pending').length;
  const confirmedInquiriesCount = inquiries.filter(i => i.status === 'confirmed').length;
  const totalPipelineRevenue = inquiries.reduce((sum, item) => sum + (item.estimatedValue || 1700), 0);

  // 1. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card glass-panel">
          <div className="text-center" style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <img 
                src="/logo-transparent.png" 
                alt="Travel with Sri Lanka" 
                style={{ height: '56px', objectFit: 'contain' }}
                onError={(e) => { e.target.src = '/logo.png'; }}
              />
            </div>
            <span className="glass-pill" style={{ fontSize: '0.74rem', color: 'var(--brand-gold)', fontWeight: 700, padding: '4px 12px' }}>
              EXECUTIVE MANAGEMENT PORTAL
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, marginTop: '12px', marginBottom: '6px' }}>
              Admin Control Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Sign in with your authorized operator credentials to access reservations, inquiries, and site controls.
            </p>
          </div>

          {loginError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '18px', color: '#f87171', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircleIcon size={16} color="#f87171" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="input-group">
              <label htmlFor="admin-username">Operator Username</label>
              <input 
                type="text" 
                id="admin-username" 
                required 
                autoComplete="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="e.g. admin" 
                className="glass-input" 
              />
            </div>

            <div className="input-group">
              <label htmlFor="admin-password">Secure Password</label>
              <input 
                type="password" 
                id="admin-password" 
                required 
                autoComplete="current-password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••••••" 
                className="glass-input" 
              />
            </div>

            <button 
              type="submit" 
              className="btn-solid-primary full-width" 
              style={{ marginTop: '8px', padding: '12px' }}
              disabled={isSubmittingLogin}
            >
              <span>{isSubmittingLogin ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
            </button>
          </form>

          {/* Default Credentials Helper */}
          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Default Access: Username: <strong style={{ color: 'var(--brand-cyan-accent)' }}>admin</strong> &nbsp;|&nbsp; Password: <strong style={{ color: 'var(--brand-cyan-accent)' }}>admin123</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="admin-portal-wrapper">
      <div className="container" style={{ maxWidth: '1240px' }}>
        {/* Top Header Bar */}
        <header className="admin-top-bar glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src="/logo-transparent.png" 
              alt="Logo" 
              style={{ height: '42px', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/logo.png'; }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '1.15rem' }}>Travel with Sri Lanka</strong>
                <span className="glass-pill" style={{ fontSize: '0.7rem', color: '#059669', padding: '2px 8px', fontWeight: 700 }}>
                  LIVE DESK
                </span>
              </div>
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                Logged in as <strong>{currentUser?.name || currentUser?.username}</strong> ({currentUser?.role})
              </small>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link 
              href="/" 
              target="_blank" 
              className="glass-pill"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', color: 'inherit', textDecoration: 'none', fontSize: '0.82rem' }}
            >
              <CompassIcon size={14} color="var(--brand-gold)" />
              <span>View Live Website</span>
            </Link>
            <button 
              type="button" 
              onClick={handleLogout}
              className="btn-solid-outline"
              style={{ padding: '7px 16px', fontSize: '0.82rem', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
            >
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Admin Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <CompassIcon size={14} color="currentColor" />
            <span>Overview</span>
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <MailIcon size={14} color="currentColor" />
            <span>Inquiries &amp; Bookings ({inquiries.length})</span>
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <StarIcon size={14} color="currentColor" />
            <span>Reviews ({reviews.length})</span>
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ShieldIcon size={14} color="currentColor" />
            <span>Security &amp; Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div>
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card glass-panel">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Total Inquiries Received
                </span>
                <div className="admin-kpi-val" style={{ color: 'var(--brand-cyan-accent)' }}>
                  {totalInquiriesCount}
                </div>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.76rem' }}>Captured from web forms</small>
              </div>

              <div className="admin-kpi-card glass-panel">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pending Action
                </span>
                <div className="admin-kpi-val" style={{ color: '#fbbf24' }}>
                  {pendingInquiriesCount}
                </div>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.76rem' }}>Requires concierge response</small>
              </div>

              <div className="admin-kpi-card glass-panel">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Confirmed Bookings
                </span>
                <div className="admin-kpi-val" style={{ color: '#059669' }}>
                  {confirmedInquiriesCount}
                </div>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.76rem' }}>Deposited &amp; locked</small>
              </div>

              <div className="admin-kpi-card glass-panel">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pipeline Revenue
                </span>
                <div className="admin-kpi-val" style={{ color: 'var(--brand-gold)' }}>
                  ${totalPipelineRevenue.toLocaleString()}
                </div>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.76rem' }}>Estimated total value</small>
              </div>
            </div>

            {/* Recent Inquiries Quick Preview */}
            <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                  Recent Client Inquiries
                </h3>
                <button 
                  type="button" 
                  className="glass-pill" 
                  onClick={() => setActiveTab('inquiries')}
                  style={{ fontSize: '0.8rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--glass-border)', color: 'inherit' }}
                >
                  View All &rarr;
                </button>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Guest Name</th>
                      <th>Country</th>
                      <th>Package / Route</th>
                      <th>Arrival Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0, 5).map(inq => (
                      <tr key={inq.id}>
                        <td><strong style={{ color: 'var(--brand-cyan-accent)' }}>{inq.id}</strong></td>
                        <td>{inq.name}</td>
                        <td>{inq.country || 'N/A'}</td>
                        <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inq.package}
                        </td>
                        <td>{inq.date}</td>
                        <td>
                          <span className={`status-badge status-${inq.status}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            type="button" 
                            className="admin-action-btn glass-pill"
                            onClick={() => { setSelectedInquiry(inq); setActiveTab('inquiries'); }}
                          >
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & BOOKINGS MANAGER */}
        {activeTab === 'inquiries' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="glass-panel" style={{ padding: '18px 24px', marginBottom: '20px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Status Filter Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['all', 'pending', 'contacted', 'confirmed', 'completed', 'cancelled'].map(st => (
                  <button 
                    key={st}
                    type="button" 
                    className={`filter-btn ${inquiryStatusFilter === st ? 'active' : ''}`}
                    onClick={() => setInquiryStatusFilter(st)}
                    style={{ padding: '5px 12px', fontSize: '0.78rem' }}
                  >
                    {st === 'all' ? `All (${inquiries.length})` : st.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <input 
                  type="text" 
                  placeholder="Search guest, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input"
                  style={{ paddingLeft: '34px', fontSize: '0.85rem', width: '100%' }}
                />
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>
                  <SearchIcon size={14} color="currentColor" />
                </span>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Guest &amp; Contact</th>
                      <th>Country</th>
                      <th>Tour Package / Route</th>
                      <th>Travel Date</th>
                      <th>Status</th>
                      <th>Quick Channels</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-secondary)' }}>
                          No inquiries match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
                        const waText = encodeURIComponent(
                          `Hi ${inq.name}, thank you for inquiring about "${inq.package}" with Travel with Sri Lanka by Hobby & Tours! I am your personal itinerary architect. How can we assist with your plans?`
                        );
                        return (
                          <tr key={inq.id}>
                            <td>
                              <strong style={{ color: 'var(--brand-cyan-accent)', fontSize: '0.88rem' }}>{inq.id}</strong>
                              <small style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </small>
                            </td>
                            <td>
                              <strong>{inq.name}</strong>
                              <small style={{ display: 'block', color: 'var(--text-secondary)' }}>{inq.email}</small>
                              <small style={{ display: 'block', color: 'var(--brand-gold)' }}>{inq.phone}</small>
                            </td>
                            <td>{inq.country || 'N/A'}</td>
                            <td>
                              <strong style={{ fontSize: '0.88rem' }}>{inq.package}</strong>
                              <small style={{ display: 'block', color: 'var(--text-secondary)' }}>{inq.travelers} Guests</small>
                            </td>
                            <td>{inq.date}</td>
                            <td>
                              <select 
                                value={inq.status}
                                onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                className="glass-input"
                                style={{ padding: '4px 8px', fontSize: '0.78rem', borderRadius: '6px' }}
                              >
                                <option value="pending">PENDING</option>
                                <option value="contacted">CONTACTED</option>
                                <option value="confirmed">CONFIRMED</option>
                                <option value="completed">COMPLETED</option>
                                <option value="cancelled">CANCELLED</option>
                              </select>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <a 
                                  href={`https://wa.me/${cleanPhone}?text=${waText}`}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="admin-action-btn"
                                  style={{ background: 'rgba(5, 150, 105, 0.2)', color: '#34d399', padding: '6px 10px' }}
                                  title="WhatsApp Chat"
                                >
                                  <WhatsAppIcon size={14} color="#34d399" />
                                  <span>Chat</span>
                                </a>
                                <a 
                                  href={`mailto:${inq.email}?subject=Your%20Tour%20Inquiry%20-%20Travel%20with%20Sri%20Lanka`}
                                  className="admin-action-btn"
                                  style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '6px 10px' }}
                                  title="Email Guest"
                                >
                                  <MailIcon size={14} color="#38bdf8" />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button 
                                  type="button" 
                                  className="admin-action-btn glass-pill"
                                  onClick={() => setSelectedInquiry(inq)}
                                  title="View Notes & Details"
                                >
                                  <span>View</span>
                                </button>
                                <button 
                                  type="button" 
                                  className="admin-action-btn"
                                  style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  title="Delete Inquiry"
                                >
                                  <CloseIcon size={12} color="currentColor" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px' }}>
                Guest Reviews &amp; Testimonials Moderation
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map(rev => (
                  <div key={rev.id} className="glass-card" style={{ padding: '20px 24px', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <strong>{rev.name}</strong> ({rev.country}) &nbsp;•&nbsp;
                        <small style={{ color: 'var(--brand-gold)' }}>{rev.trip}</small>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '2px', color: 'var(--brand-gold)' }}>
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <StarIcon key={i} size={14} color="var(--brand-gold)" />
                          ))}
                        </div>
                        <span className={`status-badge status-${rev.status}`}>
                          {rev.status}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0 0 14px 0', lineHeight: 1.6 }}>
                      &ldquo;{rev.text}&rdquo;
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <small style={{ color: 'var(--text-secondary)' }}>
                        Submitted on: {new Date(rev.createdAt).toLocaleDateString()}
                      </small>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {rev.status !== 'approved' && (
                          <button 
                            type="button" 
                            className="admin-action-btn"
                            style={{ background: '#059669', color: '#fff' }}
                            onClick={() => handleUpdateReviewStatus(rev.id, 'approved')}
                          >
                            <span>Approve &amp; Publish</span>
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button 
                            type="button" 
                            className="admin-action-btn"
                            style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}
                            onClick={() => handleUpdateReviewStatus(rev.id, 'rejected')}
                          >
                            <span>Reject</span>
                          </button>
                        )}
                        <button 
                          type="button" 
                          className="admin-action-btn"
                          style={{ background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)' }}
                          onClick={() => handleDeleteReview(rev.id)}
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & SETTINGS */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldIcon size={20} color="var(--brand-gold)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                    Portal Credentials &amp; Security
                  </h3>
                  <small style={{ color: 'var(--text-secondary)' }}>Update administrative login username and secure password</small>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <label htmlFor="set-curr-pass">Current Password * (Required)</label>
                  <input 
                    type="password" 
                    id="set-curr-pass" 
                    required 
                    placeholder="Enter current password to verify"
                    value={settingsForm.currentPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="set-new-user">New Operator Username</label>
                  <input 
                    type="text" 
                    id="set-new-user" 
                    placeholder="Leave blank to keep current (admin)"
                    value={settingsForm.newUsername}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="set-new-pass">New Secure Password</label>
                  <input 
                    type="password" 
                    id="set-new-pass" 
                    placeholder="Leave blank to keep current password"
                    value={settingsForm.newPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="set-new-name">Operator Display Name</label>
                  <input 
                    type="text" 
                    id="set-new-name" 
                    placeholder="e.g. General Manager"
                    value={settingsForm.newName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newName: e.target.value })}
                    className="glass-input"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-solid-primary" 
                  style={{ marginTop: '8px', padding: '12px 24px', alignSelf: 'flex-start' }}
                >
                  <span>Update Credentials</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Selected Inquiry Modal */}
        {selectedInquiry && (
          <div className="liquid-modal-overlay" onClick={() => setSelectedInquiry(null)}>
            <div className="liquid-modal-window glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
              <button 
                type="button" 
                className="modal-close-btn glass-btn-icon" 
                onClick={() => setSelectedInquiry(null)}
              >
                <CloseIcon size={18} color="currentColor" />
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="glass-pill" style={{ fontSize: '0.8rem', color: 'var(--brand-cyan-accent)', fontWeight: 700 }}>
                  {selectedInquiry.id}
                </span>
                <span className={`status-badge status-${selectedInquiry.status}`}>
                  {selectedInquiry.status}
                </span>
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, marginBottom: '6px' }}>
                {selectedInquiry.name}
              </h2>
              <p style={{ color: 'var(--brand-gold)', fontSize: '0.88rem', marginBottom: '18px' }}>
                {selectedInquiry.country} &nbsp;•&nbsp; {selectedInquiry.phone} &nbsp;•&nbsp; {selectedInquiry.email}
              </p>

              <div className="glass-card" style={{ padding: '16px 20px', borderRadius: '12px', marginBottom: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem', marginBottom: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.76rem' }}>Selected Package:</span>
                    <strong>{selectedInquiry.package}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.76rem' }}>Arrival Date:</span>
                    <strong>{selectedInquiry.date}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.76rem' }}>Travelers:</span>
                    <strong>{selectedInquiry.travelers} Guests</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.76rem' }}>Estimated Value:</span>
                    <strong style={{ color: 'var(--brand-green-accent)' }}>${selectedInquiry.estimatedValue?.toLocaleString()}</strong>
                  </div>
                </div>

                {selectedInquiry.notes && (
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.76rem', marginBottom: '4px' }}>
                      Special Requests / Notes from Guest:
                    </span>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
                      {selectedInquiry.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Actions in Modal */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a 
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedInquiry.name}, this is Travel with Sri Lanka regarding your inquiry for ${selectedInquiry.package}...`)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-solid-primary"
                  style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                >
                  <WhatsAppIcon size={16} color="#fff" />
                  <span>Reply on WhatsApp</span>
                </a>
                <a 
                  href={`mailto:${selectedInquiry.email}?subject=Your%20Tour%20Inquiry%20-%20Travel%20with%20Sri%20Lanka`}
                  className="btn-solid-outline"
                  style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
                >
                  <MailIcon size={16} color="currentColor" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Liquid Toast */}
        {toast && (
          <div className="liquid-toast glass-pill" role="alert">
            <span style={{ background: '#059669', color: '#fff', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckIcon size={12} color="#ffffff" />
            </span>
            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
}
