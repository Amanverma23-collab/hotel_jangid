import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'jangid_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Check if user already consented
    try {
      const consent = localStorage.getItem(COOKIE_KEY);
      if (!consent) {
        // Slight delay so it doesn't flash on load
        const timer = setTimeout(() => setVisible(true), 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available, show anyway
      const timer = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setClosing(true);
    try {
      localStorage.setItem(COOKIE_KEY, 'accepted');
    } catch { /* noop */ }
    setTimeout(() => setVisible(false), 400);
  };

  const handleDecline = () => {
    setClosing(true);
    try {
      localStorage.setItem(COOKIE_KEY, 'declined');
    } catch { /* noop */ }
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4 pointer-events-none"
      style={{
        animation: closing
          ? 'cookieSlideDown 400ms cubic-bezier(0.4, 0, 1, 1) forwards'
          : 'cookieSlideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes cookieSlideDown {
          from { transform: translateY(0);    opacity: 1; }
          to   { transform: translateY(100%); opacity: 0; }
        }
      `}</style>

      <div
        className="pointer-events-auto mx-auto max-w-2xl rounded-2xl border border-amber-200/60 shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(253, 246, 234, 0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Cookie icon */}
          <div
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
            style={{ background: '#566B4B', color: '#fff' }}
          >
            🍪
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] sm:text-sm text-slate-800 leading-relaxed">
              Hum aapke experience ko behtar banane ke liye cookies use karte hain. Is website ko use karke aap humari{' '}
              <button
                type="button"
                className="underline text-amber-800 font-medium hover:text-amber-900 transition-colors cursor-pointer"
                onClick={() => {
                  // Scroll to footer and trigger privacy modal if possible
                  const el = document.getElementById('ftr');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Privacy Policy
              </button>{' '}
              se sahmat hote hain.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
              style={{ background: '#566B4B' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#4a5e40')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#566B4B')}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
