import React, { useState, useEffect } from 'react';
import { getLiveRoomRates } from '../services/bookingService';
import { supabase } from '../supabase';
import { BedDouble, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

export function RoomsList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live room prices from PMS
    getLiveRoomRates().then((data) => {
      setRooms(data || []);
      setLoading(false);
    });

    // Supabase realtime listener
    const channel = supabase
      .channel('room-types-live-price')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'room_types' }, (payload) => {
        setRooms(prev => prev.map(r => r.id === payload.new.id ? { ...r, base_price: payload.new.base_price } : r));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A7060', fontSize: '14px' }}>
        <div className="inline-block animate-pulse">Loading live room rates from hotel software...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', margin: '24px 0' }}>
      {rooms.map((room) => {
        const isAc = !room.name.toLowerCase().includes('cooler') && !room.name.toLowerCase().includes('non-ac');
        const roomKey = isAc ? 'ac' : 'cooler';

        return (
          <div
            key={room.id}
            style={{
              background: '#FDF6EA',
              border: '1.5px solid #D9CDBA',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            className="hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#2E7D32',
                    background: '#E8F5E9',
                    padding: '3px 10px',
                    borderRadius: '999px',
                  }}
                >
                  <Sparkles size={11} />
                  Live Rate
                </span>

                <span style={{ fontSize: '12px', color: '#7A7060', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={13} /> Max {room.max_occupancy || 2}
                </span>
              </div>

              <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 800, color: '#1A1A1A' }}>
                {room.name}
              </h3>

              {/* Price Tag directly from PMS Software */}
              <div style={{ margin: '14px 0 16px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', fontFamily: 'serif' }}>
                  ₹{room.base_price?.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '13px', color: '#7A7060', fontWeight: 500 }}>/ night</span>
              </div>

              {room.amenities && Array.isArray(room.amenities) && room.amenities.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {room.amenities.slice(0, 3).map((amenity, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '11px',
                        background: '#F0E9DC',
                        color: '#5A5040',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #E2D7C5',
                      }}
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectRoom && onSelectRoom(roomKey)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '14px',
                background: '#1A1A1A',
                color: '#FDF6EA',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#302A24'}
              onMouseLeave={e => e.currentTarget.style.background = '#1A1A1A'}
            >
              <span>Book Room</span>
              <ArrowRight size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
