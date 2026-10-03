import React, { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export default function BookingModal({ isOpen, onClose, initialRoomType = 'ac' }) {
  const [roomType, setRoomType] = useState(initialRoomType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [roomsCount, setRoomsCount] = useState(1);
  const [guestsCount, setGuestsCount] = useState(2);

  if (!isOpen) return null;

  const roomPrice = roomType === 'ac' ? 1200 : 1000;
  const roomName = roomType === 'ac' ? 'Deluxe AC Room' : 'Cooler Room';
  const totalAmount = roomPrice * roomsCount;

  const handleWhatsAppBooking = (e) => {
    e.preventDefault();
    const message = `Hello Vijay ji, I would like to book a room at Hotel Jangid, Gogamedi.
• Room: ${roomName} (${roomsCount} room)
• Check-in Date: ${checkInDate}
• Guests: ${guestsCount}
• Guest Name: ${name || 'Guest'}
• Mobile: ${phone || 'Not provided'}
• Total Estimated: ₹${totalAmount}/night.
Please confirm room availability.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919414487691?text=${encoded}`, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#0d1424] text-white rounded-3xl border border-[#dfc59e]/30 shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dfc59e]/15 border border-[#dfc59e]/30 text-[#dfc59e] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Direct Hotel Reservation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Book Your Stay
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            400m from Shri Goga Ji Temple • Free Courtyard Parking • 24/7 Geyser
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleWhatsAppBooking} className="space-y-4">
          {/* Room Type Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Select Room Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoomType('ac')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  roomType === 'ac'
                    ? 'border-[#dfc59e] bg-[#dfc59e]/15 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm text-white">Deluxe AC Room</div>
                <div className="text-xs text-[#dfc59e] font-semibold mt-0.5">₹1,200 / night</div>
              </button>

              <button
                type="button"
                onClick={() => setRoomType('cooler')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  roomType === 'cooler'
                    ? 'border-[#dfc59e] bg-[#dfc59e]/15 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="font-bold text-sm text-white">Cooler Room</div>
                <div className="text-xs text-[#dfc59e] font-semibold mt-0.5">₹1,000 / night</div>
              </button>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Check-in Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#dfc59e]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Rooms</label>
              <select
                value={roomsCount}
                onChange={(e) => setRoomsCount(Number(e.target.value))}
                className="w-full bg-[#121a2d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#dfc59e]"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n} className="bg-[#0d1424] text-white">
                    {n} Room{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Guests</label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full bg-[#121a2d] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#dfc59e]"
              >
                {[1, 2, 3, 4, 6, 8, 10].map((n) => (
                  <option key={n} value={n} className="bg-[#0d1424] text-white">
                    {n} Guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest Name & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dfc59e]"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98765 43210"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#dfc59e]"
                required
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400">Total Price: </span>
              <strong className="text-white font-bold text-sm">₹{totalAmount}</strong>
              <span className="text-gray-400 text-[11px]"> / night</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pay at Hotel Available</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </button>

            <a
              href="tel:+919414487691"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all"
            >
              <PhoneCall className="w-4 h-4 text-[#dfc59e]" />
              <span>Call Vijay Ji</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
