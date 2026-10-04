import React, { useState, useEffect } from 'react';
import { X, Check, Save, Loader2, Sparkles, Tag, ShieldCheck } from 'lucide-react';
import { getCategoryPrices, updateCategoryPrice } from '../supabase';

export default function PriceManagerModal({ isOpen, onClose, onPriceUpdated }) {
  const [acPrice, setAcPrice] = useState(1200);
  const [coolerPrice, setCoolerPrice] = useState(1000);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setSuccessMessage('');
      getCategoryPrices().then(prices => {
        if (prices) {
          if (prices.ac) setAcPrice(prices.ac);
          if (prices.cooler) setCoolerPrice(prices.cooler);
        }
        setIsLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSavePrices = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');

    try {
      // 1. Update AC room price
      await updateCategoryPrice({ category: 'ac', newPrice: Number(acPrice) });
      // 2. Update Cooler room price
      await updateCategoryPrice({ category: 'cooler', newPrice: Number(coolerPrice) });

      setSuccessMessage('Prices updated live in Hotel PMS software and across the website!');
      if (onPriceUpdated) {
        onPriceUpdated({ ac: Number(acPrice), cooler: Number(coolerPrice) });
      }
      setTimeout(() => {
        setSuccessMessage('');
      }, 3500);
    } catch (err) {
      console.error('Failed to update prices:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.60)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'modalFadeIn 0.2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '440px',
          width: '100%',
          background: '#FDF6EA',
          borderRadius: '24px',
          border: '1.5px solid #D9CDBA',
          boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
          padding: '24px',
          fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#F0E9DC',
            border: '1px solid #D9CDBA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#7A7060',
          }}
        >
          <X size={15} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: '#E8F5E9',
              color: '#2E7D32',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <Tag size={12} />
            Live PMS Price Manager
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 800, color: '#1A1A1A' }}>
            Update Room Rates
          </h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#7A7060' }}>
            Changes will update directly in Supabase and reflect instantly on website and PMS software.
          </p>
        </div>

        {/* Success Banner */}
        {successMessage && (
          <div
            style={{
              background: '#E8F5E9',
              border: '1px solid #81C784',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '12px',
              color: '#1B5E20',
              fontWeight: 600,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Check size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {isLoading ? (
          <div style={{ padding: '30px 0', textAlign: 'center', color: '#7A7060', fontSize: '13px' }}>
            <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 8px' }} />
            Loading live prices from database...
          </div>
        ) : (
          <form onSubmit={handleSavePrices} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Deluxe AC Room Rate */}
            <div style={{ background: '#F7F2E9', border: '1.5px solid #D9CDBA', borderRadius: '16px', padding: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>
                Deluxe AC Room Price (₹ / night)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '15px', fontWeight: 700, color: '#7A7060' }}>
                  ₹
                </span>
                <input
                  type="number"
                  min="500"
                  max="20000"
                  step="50"
                  value={acPrice}
                  onChange={(e) => setAcPrice(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 28px',
                    borderRadius: '10px',
                    border: '1px solid #C5B69F',
                    background: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#1A1A1A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              </div>
            </div>

            {/* Cooler Room Rate */}
            <div style={{ background: '#F7F2E9', border: '1.5px solid #D9CDBA', borderRadius: '16px', padding: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>
                Cooler Room Price (₹ / night)
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '10px', fontSize: '15px', fontWeight: 700, color: '#7A7060' }}>
                  ₹
                </span>
                <input
                  type="number"
                  min="500"
                  max="20000"
                  step="50"
                  value={coolerPrice}
                  onChange={(e) => setCoolerPrice(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 28px',
                    borderRadius: '10px',
                    border: '1px solid #C5B69F',
                    background: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#1A1A1A',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                  required
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isSaving}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '13px 18px',
                borderRadius: '14px',
                background: '#1A1A1A',
                color: '#FDF6EA',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
                marginTop: '4px',
              }}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving to Hotel Database...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update Live Prices Now
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
