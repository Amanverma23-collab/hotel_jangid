import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OwnersSection from './components/OwnersSection';
import AmenitiesSection from './components/AmenitiesSection';
import GalleryTestimonialsSection from './components/GalleryTestimonialsSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [selectedRoomType, setSelectedRoomType] = useState('ac');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState(null);

  const handleOpenBooking = (type, prefill = null) => {
    if (typeof type === 'string' && (type === 'ac' || type === 'cooler')) {
      setSelectedRoomType(type);
    }
    if (prefill && typeof prefill === 'object') {
      setBookingPrefill(prefill);
    }
    setIsBookingModalOpen(true);
  };

  return (
    <main className="w-full max-w-full bg-[#FAF8F5] text-ink-900 font-sans selection:bg-[#dfc59e]/30 selection:text-ink-950">
      {/* Content wrapper with z-index to reveal sticky footer curtain beneath */}
      <div className="relative z-10 bg-[#FAF8F5]">
        {/* 1. Global Navigation Bar */}
        <Navbar onBookClick={() => handleOpenBooking('ac')} />

        {/* 2. Full-Bleed Luxury Hero Section */}
        <Hero onBookClick={handleOpenBooking} />

        {/* 3. About / Owners Pixel-Accurate Bento Grid Section */}
        <OwnersSection />

        {/* 4. Hotel Amenities (Free Wifi, Geyser, AC, 400m Temple, 900m Station, Free Parking) */}
        <AmenitiesSection onExploreClick={() => handleOpenBooking('ac')} />

        {/* 5. Curved Wave Photo Gallery & Real Google Reviews */}
        <GalleryTestimonialsSection />
      </div>

      {/* 6. Luxury Sticky Footer with Curtain Reveal Effect */}
      <Footer />

      {/* Direct WhatsApp & Phone Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoomType={selectedRoomType}
        initialCheckIn={bookingPrefill?.checkIn}
        initialCheckOut={bookingPrefill?.checkOut}
        initialGuests={bookingPrefill?.guests}
      />
    </main>
  );
}
