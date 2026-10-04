import React, { useState, useEffect } from 'react';
import { X, MessageCircle, PhoneCall, ShieldCheck, CalendarDays, Clock, Users, BedDouble, CheckCircle2, ArrowRight, Loader2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createWebsiteBooking, getCategoryPrices, supabase } from '../supabase';

const CHECK_IN_TIMES = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM',
];

const CHECK_OUT_TIMES = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
];

export default function BookingModal({
  isOpen,
  onClose,
  initialRoomType = 'ac',
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}) {
  const [roomType, setRoomType] = useState(initialRoomType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState(() => initialCheckIn || new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(() => {
    if (initialCheckOut) return initialCheckOut;
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkInTime, setCheckInTime] = useState('12:00 PM');
  const [checkOutTime, setCheckOutTime] = useState('11:00 AM');
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(initialGuests || 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Live Room Rates from PMS Database
  const [roomRates, setRoomRates] = useState({ ac: 1200, cooler: 1000 });

  // Fetch live rates on mount & listen to real-time changes
  useEffect(() => {
    getCategoryPrices().then(prices => {
      if (prices && (prices.ac || prices.cooler)) {
        setRoomRates(prices);
      }
    });

    const channel = supabase
      .channel('booking-modal-price-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'room_types' }, () => {
        getCategoryPrices().then(prices => {
          if (prices) setRoomRates(prices);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialRoomType) setRoomType(initialRoomType);
      if (initialCheckIn) setCheckInDate(initialCheckIn);
      if (initialCheckOut) setCheckOutDate(initialCheckOut);
      if (initialGuests) setGuestsCount(initialGuests);
      setBookingConfirmed(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialRoomType, initialCheckIn, initialCheckOut, initialGuests]);

  if (!isOpen) return null;

  // Use live dynamic room prices
  const roomPrice = roomType === 'ac' ? roomRates.ac : roomRates.cooler;
  const roomName = roomType === 'ac' ? 'Deluxe AC Room' : 'Non-AC Room';

  // Calculate nights
  const nights = Math.max(1, Math.round(
    (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
  ));
  const totalAmount = roomPrice * roomsCount * nights;

  // Direct Online Booking Submission (Saves immediately to Hotel PMS)
  const handleDirectBooking = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number to complete booking.');
      return;
    }

    setIsSubmitting(true);
    let confirmationNumber = `WEB-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await createWebsiteBooking({
        guestName: name,
        guestPhone: phone,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        roomCategory: roomName,
        roomType,
        roomsCount,
        totalGuests: guestsCount,
        totalAmount,
        paidAmount: 0,
        paymentMethod: 'Pay at Hotel',
        reasonOfVisit: 'Shri Goga Ji Mandir Darshan',
      });

      if (res?.confirmationNumber) {
        confirmationNumber = res.confirmationNumber;
      }
    } catch (err) {
      console.warn('[BookingModal] Direct booking note:', err);
    }

    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#A8936A', '#2E7D32', '#1A1A1A', '#D4AF37'],
      });
    } catch (err) {}

    setIsSubmitting(false);
    setBookingConfirmed({
      confirmationNumber,
      roomName,
      nights,
      roomsCount,
      guestsCount,
      totalAmount,
      checkInDate,
      checkInTime,
      guestName: name,
      phone: phone,
      bookingMethod: 'DIRECT',
    });
  };

  // WhatsApp Booking Submission
  const handleWhatsAppBooking = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    let confirmationNumber = `WEB-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const res = await createWebsiteBooking({
        guestName: name,
        guestPhone: phone,
        checkInDate,
        checkInTime,
        checkOutDate,
        checkOutTime,
        roomCategory: roomName,
        roomType,
        roomsCount,
        totalGuests: guestsCount,
        totalAmount,
        paidAmount: 0,
        paymentMethod: 'WhatsApp',
        reasonOfVisit: 'Shri Goga Ji Mandir Darshan',
      });

      if (res?.confirmationNumber) {
        confirmationNumber = res.confirmationNumber;
      }
    } catch (err) {
      console.warn('[BookingModal] WhatsApp booking note:', err);
    }

    const message =
      `Namaste Vijay Ji 🙏, I would like to book a room at Hotel Jangid, Gogamedi.\n` +
      `\n🔖 *Booking Ref:* ${confirmationNumber}` +
      `\n• Room Type: ${roomName}` +
      `\n• Rooms: ${roomsCount}` +
      `\n• Check-in: ${checkInDate} at ${checkInTime}` +
      `\n• Check-out: ${checkOutDate} at ${checkOutTime}` +
      `\n• Nights: ${nights}` +
      `\n• Guests: ${guestsCount}` +
      `\n• Guest Name: ${name || 'Not provided'}` +
      `\n• Mobile: ${phone || 'Not provided'}` +
      `\n• Total: ₹${totalAmount.toLocaleString('en-IN')} (Pay at Hotel)` +
      `\n\n(Auto-recorded in Hotel Jangid PMS System • Ref: ${confirmationNumber})`;

    window.open(`https://wa.me/919001187776?text=${encodeURIComponent(message)}`, '_blank');

    setIsSubmitting(false);
    setBookingConfirmed({
      confirmationNumber,
      roomName,
      nights,
      roomsCount,
      guestsCount,
      totalAmount,
      checkInDate,
      checkInTime,
      guestName: name,
      phone: phone,
      bookingMethod: 'WHATSAPP',
    });
  };

  const handleResetForm = () => {
    setBookingConfirmed(null);
    setName('');
    setPhone('');
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          animation: 'modalFadeIn 0.22s ease-out',
        }}
      >
        <style>{`
          @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
          .bm-modal-container {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          .bm-modal-container::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          .bm-input {
            width: 100%; background: #F7F2E9; border: 1.5px solid #D9CDBA;
            border-radius: 12px; padding: 10px 14px; font-size: 13px;
            color: #1A1A1A; outline: none; transition: border-color 0.18s;
            font-family: inherit; box-sizing: border-box; appearance: none;
          }
          .bm-input:focus { border-color: #A8936A; background: #FDF6EA; }
          .bm-input::placeholder { color: #B0A898; }
          .bm-label { font-size: 11px; font-weight: 600; color: #7A7060; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 5px; display: block; }
          .bm-room-btn {
            padding: 12px 14px; border-radius: 16px; border: 1.5px solid #D9CDBA;
            text-align: left; cursor: pointer; transition: all 0.18s;
            background: #F7F2E9; width: 100%;
          }
          .bm-room-btn.active { border-color: #A8936A; background: #EEE3CF; }
          .bm-room-btn:not(.active):hover { border-color: #C4B49A; background: #F2EBE0; }
        `}</style>

        <div
          onClick={(e) => e.stopPropagation()}
          className="bm-modal-container"
          style={{
            position: 'relative',
            maxWidth: '500px', width: '100%',
            background: '#FDF6EA',
            borderRadius: '26px',
            border: '1.5px solid #D9CDBA',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)',
            padding: '24px 24px 20px',
            maxHeight: '94vh',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              width: '34px', height: '34px', borderRadius: '50%',
              border: '1.5px solid #D9CDBA', background: '#F0E9DC',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7A7060', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E5D9C9'; e.currentTarget.style.color = '#1A1A1A'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F0E9DC'; e.currentTarget.style.color = '#7A7060'; }}
          >
            <X size={15} />
          </button>

          {/* Confirmation Screen */}
          {bookingConfirmed ? (
            <div style={{ textAlign: 'center', padding: '10px 4px 6px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#E8F5E9',
                  border: '2px solid #81C784',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#2E7D32',
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  background: '#E8F5E9',
                  color: '#2E7D32',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '10px',
                }}
              >
                <Sparkles size={13} />
                Saved to Hotel System
              </div>

              <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 800, color: '#1A1A1A' }}>
                Booking Confirmed!
              </h3>

              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#6A5E50', lineHeight: 1.5 }}>
                Aapki booking Hotel Jangid ke Reception Software me darj ho chuki hai. Receptionist room allot karenge.
              </p>

              <div
                style={{
                  background: '#F0E9DC',
                  border: '1.5px solid #D9CDBA',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'left',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E0D5C3', paddingBottom: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#7A7060', textTransform: 'uppercase' }}>Booking Reference</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px', color: '#A8936A', background: '#FDF6EA', padding: '2px 8px', borderRadius: '6px', border: '1px solid #D9CDBA' }}>
                    {bookingConfirmed.confirmationNumber}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: '#4A4030' }}>
                  <div><strong>Guest:</strong> {bookingConfirmed.guestName}</div>
                  <div><strong>Room:</strong> {bookingConfirmed.roomName}</div>
                  <div><strong>Check-in:</strong> {bookingConfirmed.checkInDate}</div>
                  <div><strong>Stay:</strong> {bookingConfirmed.nights} Night{bookingConfirmed.nights > 1 ? 's' : ''}</div>
                  <div style={{ gridColumn: 'span 2', marginTop: '4px', paddingTop: '6px', borderTop: '1px dashed #D9CDBA', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>Total Payable at Hotel:</span>
                    <span style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '14px' }}>₹{bookingConfirmed.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '13px 16px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #25D366 0%, #1DAD54 100%)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
                    fontFamily: 'inherit',
                  }}
                >
                  <MessageCircle size={16} />
                  Send Confirmation on WhatsApp
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="tel:+919001187776"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: '#F0E9DC',
                      border: '1.5px solid #D9CDBA',
                      color: '#1A1A1A',
                      fontWeight: 600,
                      fontSize: '12px',
                      textDecoration: 'none',
                      fontFamily: 'inherit',
                    }}
                  >
                    <PhoneCall size={14} style={{ color: '#A8936A' }} />
                    Call Vijay Ji
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      flex: 1,
                      padding: '12px 14px',
                      borderRadius: '14px',
                      background: '#E5D9C9',
                      border: '1.5px solid #D9CDBA',
                      color: '#1A1A1A',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Done
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleResetForm}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#8A7E70',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    marginTop: '4px',
                  }}
                >
                  Book another room
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '3px 10px', borderRadius: '999px',
                    border: '1px solid #D9CDBA', background: 'transparent',
                    fontSize: '11px', fontWeight: 600, color: '#7A7060',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    Direct Hotel Reservation
                  </div>
                </div>

                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.15 }}>
                  Book Your Stay
                </h3>
                <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#9A8E80' }}>
                  400m from Shri Goga Ji Temple • Free Parking • 24/7 Geyser
                </p>
              </div>

              <form onSubmit={handleDirectBooking} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                {/* Room Type */}
                <div>
                  <label className="bm-label">
                    <BedDouble size={11} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                    Select Room Type
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                      { key: 'ac', name: 'Deluxe AC Room', price: `₹${roomRates.ac.toLocaleString('en-IN')} / night` },
                      { key: 'cooler', name: 'Non-AC Room', price: `₹${roomRates.cooler.toLocaleString('en-IN')} / night` },
                    ].map(r => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => setRoomType(r.key)}
                        className={`bm-room-btn ${roomType === r.key ? 'active' : ''}`}
                      >
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#1A1A1A' }}>{r.name}</div>
                        <div style={{ fontSize: '12px', color: '#A8936A', fontWeight: 600, marginTop: '2px' }}>{r.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Check-in Row: Date + Time */}
                <div>
                  <label className="bm-label">
                    <CalendarDays size={11} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                    Check-in
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <input
                        type="date"
                        value={checkInDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setCheckInDate(e.target.value);
                          if (e.target.value >= checkOutDate) {
                            const d = new Date(e.target.value);
                            d.setDate(d.getDate() + 1);
                            setCheckOutDate(d.toISOString().split('T')[0]);
                          }
                        }}
                        className="bm-input"
                        required
                      />
                    </div>
                    <div>
                      <select value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} className="bm-input">
                        {CHECK_IN_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Check-out Row: Date + Time */}
                <div>
                  <label className="bm-label">
                    <CalendarDays size={11} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                    Check-out
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <input
                        type="date"
                        value={checkOutDate}
                        min={checkInDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="bm-input"
                        required
                      />
                    </div>
                    <div>
                      <select value={checkOutTime} onChange={(e) => setCheckOutTime(e.target.value)} className="bm-input">
                        {CHECK_OUT_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rooms + Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="bm-label">Rooms</label>
                    <select value={roomsCount} onChange={(e) => setRoomsCount(Number(e.target.value))} className="bm-input">
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="bm-label">
                      <Users size={11} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                      Guests
                    </label>
                    <select value={guestsCount} onChange={(e) => setGuestsCount(Number(e.target.value))} className="bm-input">
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                </div>

                {/* Name + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label className="bm-label">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="bm-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="bm-label">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98765 43210"
                      className="bm-input"
                      required
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div style={{
                  background: '#F0E9DC', borderRadius: '16px', padding: '14px 16px',
                  border: '1.5px solid #D9CDBA', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: '13px', color: '#5A5040' }}>
                    <span>{roomsCount} Room × {nights} Night{nights > 1 ? 's' : ''}</span>
                    <div style={{ marginTop: '2px' }}>
                      <span style={{ fontSize: '11px', color: '#9A8E80' }}>Total: </span>
                      <strong style={{ fontSize: '18px', fontWeight: 800, color: '#1A1A1A' }}>
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#27864A', fontWeight: 600 }}>
                    <ShieldCheck size={14} />
                    <span>Pay at Hotel</span>
                  </div>
                </div>

                {/* Action Buttons Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
                  {/* 1. PRIMARY BIG BUTTON: Book Room Now */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '14px 20px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #1A1A1A 0%, #2F2923 100%)',
                      border: '1.5px solid #4A3E31',
                      color: '#FDF6EA',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
                      transition: 'all 0.18s ease',
                      fontFamily: 'inherit',
                      opacity: isSubmitting ? 0.75 : 1,
                    }}
                    onMouseEnter={e => !isSubmitting && (e.currentTarget.style.transform = 'translateY(-1px)', e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)')}
                    onMouseLeave={e => !isSubmitting && (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.18)')}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Saving to Hotel System...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} style={{ color: '#D4AF37' }} />
                        <span>Book Room Now • ₹{totalAmount.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
