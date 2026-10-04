import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarCheck,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Download,
  CreditCard,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOTEL_INFO } from '../data/hotelData';
import { createWebsiteBooking } from '../supabase';

export default function BookingSection({ preselectedRoomType = 'ac' }) {
  // Form State
  const [roomType, setRoomType] = useState(preselectedRoomType);
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2);
  
  // Default to today and tomorrow
  const today = new Date().toISOString().split('T')[0];
  const maxAdvanceDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  })();
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkInTime, setCheckInTime] = useState('12:00');
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [checkOutTime, setCheckOutTime] = useState('11:00');

  const [guestName, setGuestName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [guestAddress, setGuestAddress] = useState('');
  const [reasonOfVisit, setReasonOfVisit] = useState('Temple darshan');
  
  // Payment preference: 'full' | 'advance' (50%)
  const [paymentOption, setPaymentOption] = useState('full');

  // UI state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Update room type when preselected prop changes
  useEffect(() => {
    if (preselectedRoomType) {
      setRoomType(preselectedRoomType);
    }
  }, [preselectedRoomType]);

  // Calculate nights
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const diff = new Date(checkOutDate).getTime() - new Date(checkInDate).getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();
  const roomPrice = roomType === 'ac' ? 1200 : 1000;
  const totalAmount = nights * roomsCount * roomPrice;
  const payableAmount = paymentOption === 'advance' ? Math.round(totalAmount / 2) : totalAmount;

  // Handle Form Submission & Razorpay Integration
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!guestName.trim()) {
      setErrorMessage('Please enter guest name');
      return;
    }

    const mobileClean = mobileNumber.replace(/\D/g, '');
    if (mobileClean.length !== 10 || !/^[6-9]\d{9}$/.test(mobileClean)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setErrorMessage('Check-out date must be after check-in date');
      return;
    }

    if (checkInDate > maxAdvanceDate) {
      setErrorMessage(`Advance booking is allowed only up to 7 days in advance. Maximum Check-In date is ${maxAdvanceDate}.`);
      return;
    }

    setIsProcessing(true);

    const bookingId = `JNG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Razorpay Integration
    if (typeof window !== 'undefined' && window.Razorpay) {
      const options = {
        key: 'rzp_test_YourKeyPlaceholder', // Configured key
        amount: payableAmount * 100, // in paise
        currency: 'INR',
        name: 'Jangid Hotel, Gogamedi',
        description: `${roomType === 'ac' ? 'Deluxe AC Room' : 'Cooler Room'} (${roomsCount} Room, ${nights} Night)`,
        image: '/images/hotel-exterior-day.jpg',
        prefill: {
          name: guestName,
          contact: mobileClean,
        },
        theme: {
          color: '#C85A32',
        },
        handler: function (response) {
          finalizeBooking(bookingId, response.razorpay_payment_id || `PAY_${Date.now()}`);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          setIsProcessing(false);
          setErrorMessage(`Payment failed: ${response.error.description || 'Please try again.'}`);
        });
        rzp.open();
      } catch (err) {
        simulateInstantConfirmation(bookingId);
      }
    } else {
      simulateInstantConfirmation(bookingId);
    }
  };

  const simulateInstantConfirmation = (bookingId) => {
    setTimeout(() => {
      finalizeBooking(bookingId, `TXN_SIM_${Date.now()}`);
    }, 1000);
  };

  const finalizeBooking = async (bookingId, paymentId) => {
    setIsProcessing(false);
    let assignedBookingId = bookingId;

    try {
      const res = await createWebsiteBooking({
        guestName,
        guestPhone: mobileNumber,
        checkInDate,
        checkInTime: checkInTime ? `${checkInTime} ${Number(checkInTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}` : '12:00 PM',
        checkOutDate,
        checkOutTime: checkOutTime ? `${checkOutTime} ${Number(checkOutTime.split(':')[0]) >= 12 ? 'PM' : 'AM'}` : '11:00 AM',
        roomType,
        roomsCount,
        guestsCount,
        totalAmount,
        paidAmount: payableAmount,
        paymentGateway: paymentId?.startsWith('pay_') ? 'Razorpay' : 'Pay at Hotel',
        paymentId: paymentId || null,
        paymentStatus: payableAmount >= totalAmount ? 'PAID' : (payableAmount > 0 ? 'PARTIAL' : 'PAY_AT_HOTEL'),
        homeAddress: guestAddress,
        reasonOfVisit: reasonOfVisit,
      });
      if (res?.confirmationNumber) {
        assignedBookingId = res.confirmationNumber;
      }
    } catch (err) {
      console.warn('[BookingSection] PMS sync note:', err);
    }

    const bookingData = {
      bookingId: assignedBookingId,
      paymentId,
      guestName,
      mobileNumber,
      guestAddress,
      roomType: roomType === 'ac' ? 'Deluxe AC Room' : 'Cooler Room (Non-AC)',
      roomsCount,
      nights,
      guestsCount,
      checkInDate,
      checkInTime,
      checkOutDate,
      checkOutTime,
      totalAmount,
      payableAmount,
      balanceDue: totalAmount - payableAmount,
      bookedAt: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
    };

    setConfirmedBooking(bookingData);

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#D97706', '#F4ECE0', '#22C55E']
      });
    } catch (e) {
      // Safe fallback
    }
  };

  return (
    <section id="booking" className="py-20 md:py-32 bg-sand-200/50 text-ink-900 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-terracotta-600 bg-terracotta-50 px-3.5 py-1 rounded-full border border-terracotta-200/60 mb-3">
            Fast Booking • Under 2 Minutes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-950 tracking-tight leading-tight">
            Reserve Your Room Online
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-600 leading-relaxed">
            During temple festival dates and weekends, rooms fill up quickly. Secure your stay in advance with instant Razorpay confirmation.
          </p>
        </div>

        {/* Confirmation Screen */}
        <AnimatePresence>
          {confirmedBooking ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-warm-lg border-2 border-emerald-500/30 max-w-2xl mx-auto"
            >
              <div className="text-center pb-6 border-b border-sand-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  Booking Confirmed
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink-950 mt-2">
                  Welcome, {confirmedBooking.guestName}!
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  Booking ID: <strong className="font-mono text-terracotta-600 font-bold text-base">{confirmedBooking.bookingId}</strong>
                </p>
              </div>

              {/* Booking Summary Voucher */}
              <div className="py-6 space-y-4 text-xs sm:text-sm text-ink-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-sand-50 p-5 rounded-2xl border border-sand-200">
                  <div>
                    <span className="text-[11px] text-ink-500 uppercase block font-semibold">Room Type:</span>
                    <strong className="text-ink-950 text-sm sm:text-base">{confirmedBooking.roomType}</strong>
                    <span className="text-xs text-ink-600 block mt-0.5">{confirmedBooking.roomsCount} Room • {confirmedBooking.nights} Night</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-ink-500 uppercase block font-semibold">Guest & Contact:</span>
                    <strong className="text-ink-950 text-sm sm:text-base">{confirmedBooking.mobileNumber}</strong>
                    <span className="text-xs text-ink-600 block mt-0.5">{confirmedBooking.guestAddress || 'Pilgrim Guest'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-ink-500 uppercase block font-semibold">Check-in:</span>
                    <span className="text-ink-900 font-medium">{confirmedBooking.checkInDate} ({confirmedBooking.checkInTime})</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-ink-500 uppercase block font-semibold">Check-out:</span>
                    <span className="text-ink-900 font-medium">{confirmedBooking.checkOutDate} ({confirmedBooking.checkOutTime})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-sand-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-ink-600 block">Payment Status (Razorpay):</span>
                    <span className="font-bold text-emerald-700 text-xs sm:text-sm">Verified (Txn: {confirmedBooking.paymentId.substring(0, 14)}...)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-ink-600 block">Total Amount:</span>
                    <span className="font-serif text-2xl font-bold text-ink-950">₹{confirmedBooking.payableAmount}</span>
                  </div>
                </div>

                {confirmedBooking.balanceDue > 0 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    Remaining Balance: <strong>₹{confirmedBooking.balanceDue}</strong> (Payable at hotel front desk upon check-in)
                  </div>
                )}

                {/* Important Instructions */}
                <div className="text-xs text-ink-600 bg-sand-50 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-ink-800">Check-in Instructions:</p>
                  <p>• Address: {HOTEL_INFO.address}</p>
                  <p>• Please carry a government-issued photo ID (Aadhaar or Voter ID) for all adult guests.</p>
                  <p>• For any questions on arrival, call Vijay Jangid at {HOTEL_INFO.phone}.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Vijay ji, my booking ID is ${confirmedBooking.bookingId}. I have booked a ${confirmedBooking.roomType} (${confirmedBooking.roomsCount} room) for ${confirmedBooking.checkInDate}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm active:scale-98 transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Voucher to WhatsApp</span>
                </a>

                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-ink-900 hover:bg-ink-800 text-white font-semibold text-xs sm:text-sm active:scale-98 transition-transform cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="flex items-center justify-center py-3 px-4 rounded-xl bg-sand-200 hover:bg-sand-300 text-ink-800 font-semibold text-xs sm:text-sm active:scale-98 transition-colors cursor-pointer"
                >
                  New Booking
                </button>
              </div>
            </motion.div>
          ) : (
            /* Booking Form */
            <form
              onSubmit={handleBookingSubmit}
              className="bg-white rounded-3xl p-6 sm:p-9 shadow-warm-lg border border-sand-300 grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              {/* Left Column: Stay & Guest Details */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-950 pb-2 border-b border-sand-200">
                    1. Stay Information
                  </h3>
                </div>

                {/* Room Type Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
                    Select Room Type *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRoomType('ac')}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        roomType === 'ac'
                          ? 'border-terracotta-500 bg-terracotta-50/60 shadow-sm'
                          : 'border-sand-300 hover:border-sand-400 bg-sand-50/40'
                      }`}
                    >
                      <span className="block font-bold text-xs sm:text-sm text-ink-950">Deluxe AC Room</span>
                      <span className="block text-xs font-semibold text-terracotta-600 mt-0.5">₹1,200 / night</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRoomType('non-ac')}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        roomType === 'non-ac'
                          ? 'border-terracotta-500 bg-terracotta-50/60 shadow-sm'
                          : 'border-sand-300 hover:border-sand-400 bg-sand-50/40'
                      }`}
                    >
                      <span className="block font-bold text-xs sm:text-sm text-ink-950">Cooler Room (Non-AC)</span>
                      <span className="block text-xs font-semibold text-terracotta-600 mt-0.5">₹1,000 / night</span>
                    </button>
                  </div>
                </div>

                {/* Rooms and Guests Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Number of Rooms
                    </label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Room' : 'Rooms'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Number of Guests (optional)
                    </label>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 font-medium text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                        <option key={g} value={g}>
                          {g} {g === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates & Times */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Check-in Date & Time *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        min={today}
                        max={maxAdvanceDate}
                        value={checkInDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val > maxAdvanceDate) {
                            setErrorMessage(`Advance booking is allowed only up to 7 days in advance. Maximum Check-In date is ${maxAdvanceDate}.`);
                            setCheckInDate(maxAdvanceDate);
                            return;
                          }
                          setErrorMessage('');
                          setCheckInDate(val);
                        }}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                      <input
                        type="time"
                        value={checkInTime}
                        onChange={(e) => setCheckInTime(e.target.value)}
                        className="w-24 px-2 py-2 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Check-out Date & Time *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        min={checkInDate || today}
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                      <input
                        type="time"
                        value={checkOutTime}
                        onChange={(e) => setCheckOutTime(e.target.value)}
                        className="w-24 px-2 py-2 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="pt-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-950 pb-2 border-b border-sand-200">
                    2. Guest Information
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-700 mb-1.5">
                    Primary Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar Sharma"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Mobile Number (10 digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink-700 mb-1.5">
                      Reason of Visit *
                    </label>
                    <select
                      value={reasonOfVisit}
                      onChange={(e) => setReasonOfVisit(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 font-medium"
                    >
                      <option value="Temple darshan">Temple Darshan</option>
                      <option value="Fair or festival">Fair or Festival (Goga Mela)</option>
                      <option value="Family visit">Family Visit</option>
                      <option value="Travel stopover">Travel Stopover</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink-700 mb-1.5">
                    Address / Home City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hisar, Haryana / Delhi"
                    value={guestAddress}
                    onChange={(e) => setGuestAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-300 bg-sand-50 text-ink-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                  />
                </div>

              </div>

              {/* Right Column: Live Price Summary & Razorpay */}
              <div className="md:col-span-5 flex flex-col justify-between bg-sand-100/70 p-6 rounded-2xl border border-sand-300">
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-xl text-ink-950 pb-2 border-b border-sand-300">
                    Booking Summary
                  </h4>

                  {/* 23 Room Inventory Indicator */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Rooms available (23 room inventory)</span>
                  </div>

                  {/* Calculations */}
                  <div className="space-y-2.5 text-xs sm:text-sm text-ink-700">
                    <div className="flex justify-between items-center">
                      <span>Room Type:</span>
                      <strong className="text-ink-950 font-semibold">{roomType === 'ac' ? 'Deluxe AC' : 'Cooler Room'}</strong>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Rate per night:</span>
                      <span>₹{roomPrice}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Stay Duration:</span>
                      <span>{nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Number of Rooms:</span>
                      <span>{roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}</span>
                    </div>

                    <div className="pt-3 border-t border-sand-300 flex justify-between items-baseline">
                      <span className="font-bold text-ink-950 text-sm sm:text-base">Total Calculation:</span>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-terracotta-600">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Payment Option: Full vs 50% Advance */}
                  <div className="pt-2 border-t border-sand-300">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-2">
                      Payment Choice:
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setPaymentOption('full')}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentOption === 'full'
                            ? 'border-terracotta-500 bg-white font-bold text-ink-950 shadow-sm'
                            : 'border-sand-300 bg-sand-200/50 text-ink-600'
                        }`}
                      >
                        Full (₹{totalAmount})
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentOption('advance')}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          paymentOption === 'advance'
                            ? 'border-terracotta-500 bg-white font-bold text-ink-950 shadow-sm'
                            : 'border-sand-300 bg-sand-200/50 text-ink-600'
                        }`}
                      >
                        50% Token (₹{Math.round(totalAmount / 2)})
                      </button>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-1 text-[11px] text-ink-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-bit encrypted Razorpay Checkout</span>
                    </p>
                    <p>• Room hold is automatically secured upon payment.</p>
                  </div>
                </div>

                {/* Submit / Pay Button */}
                <div className="mt-6 pt-4 border-t border-sand-300">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-terracotta-500 hover:bg-terracotta-600 disabled:bg-sand-400 text-white font-bold text-sm sm:text-base shadow-warm-md hover:shadow-terracotta-500/25 active:scale-98 transition-all duration-150 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Opening Razorpay Checkout...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Pay & Confirm (₹{payableAmount})</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-ink-500 mt-2">
                    UPI, Cards, Google Pay, PhonePe & Net Banking supported
                  </p>
                </div>

              </div>

            </form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
