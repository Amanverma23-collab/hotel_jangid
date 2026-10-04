import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OwnersSection from './components/OwnersSection';
import AmenitiesSection from './components/AmenitiesSection';
import GalleryTestimonialsSection from './components/GalleryTestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import CookieConsent from './components/CookieConsent';

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
    <div className="w-full max-w-full bg-[#FAF8F5] text-ink-900 font-sans selection:bg-[#dfc59e]/30 selection:text-ink-950">
      {/* Content wrapper with z-index to reveal sticky footer curtain beneath */}
      <main className="site-main relative z-10 bg-[#FAF8F5] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)]">
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

        {/* 6. Frequently Asked Questions (SEO & AEO Engine) */}
        <FAQSection />
      </main>

      {/* 6. Luxury Sticky Footer with Curtain Reveal Effect */}
      <Footer onBookClick={() => handleOpenBooking('ac')} />

      {/* Direct WhatsApp & Phone Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoomType={selectedRoomType}
        initialCheckIn={bookingPrefill?.checkIn}
        initialCheckOut={bookingPrefill?.checkOut}
        initialGuests={bookingPrefill?.guests}
      />
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
