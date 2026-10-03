import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Users, Bed, MapPin } from 'lucide-react';

export default function RoomsSection({ onSelectRoom }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const roomsData = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      roomTypeKey: 'ac',
      price: '₹1,200',
      period: '/night',
      image: '/images/room-ac-deluxe.jpg',
      badge: null,
      viewBadge: 'Courtyard View',
      guests: '2 Adults',
      beds: '1 King Bed',
      view: 'Courtyard View',
      description: 'Spacious deluxe room with split air conditioning, attached modern western bathroom and 24/7 power backup.'
    },
    {
      id: 'ocean-suite',
      name: 'Ocean View Suite',
      roomTypeKey: 'ac',
      price: '₹1,400',
      period: '/night',
      image: '/images/room-family-deluxe.jpg',
      badge: 'Most Popular',
      viewBadge: 'Temple View',
      guests: '2 Adults',
      beds: '1 King Bed',
      view: 'Temple View',
      description: 'Premium suite with large bay windows, panoramic views, luxury linens and dedicated room service.'
    },
    {
      id: 'family-suite',
      name: 'Family Suite',
      roomTypeKey: 'ac',
      price: '₹1,800',
      period: '/night',
      image: '/images/room-family-view2.jpg',
      badge: null,
      viewBadge: 'Garden View',
      guests: '4 Adults',
      beds: '2 Queen Beds',
      view: 'Garden View',
      description: 'Expansive multi-bed suite built specifically for visiting families and pilgrim groups with attached double bath.'
    },
    {
      id: 'presidential-suite',
      name: 'Presidential Suite',
      roomTypeKey: 'ac',
      price: '₹2,400',
      period: '/night',
      image: '/images/room-standard-ac.jpg',
      badge: null,
      viewBadge: 'Panoramic View',
      guests: '2 Adults',
      beds: '1 King Bed',
      view: 'Panoramic View',
      description: 'The pinnacle of luxury hospitality featuring private sitting lounge, master bath and executive amenities.'
    }
  ];

  const handleBook = (room) => {
    if (onSelectRoom) {
      onSelectRoom(room.roomTypeKey);
    } else {
      const bookingEl = document.getElementById('booking');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="rooms"
      className="relative pt-28 sm:pt-32 md:pt-40 pb-20 md:pb-32 bg-[#FBF9F5] text-gray-900 overflow-hidden"
    >
      {/* Subtle Luxury Palm Shadows on Edges (Matching Reference Mockup) */}
      <div className="absolute -left-12 bottom-0 w-64 h-96 opacity-15 pointer-events-none select-none bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.15),transparent_70%)]" />
      <div className="absolute -right-12 bottom-0 w-72 h-96 opacity-15 pointer-events-none select-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.15),transparent_70%)]" />

      {/* Decorative Subtle Palm Leaf SVGs on bottom corners */}
      <svg
        className="absolute left-0 bottom-0 w-44 sm:w-60 h-auto opacity-[0.06] pointer-events-none"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,200 C30,140 80,100 150,60 C120,90 90,130 80,200 Z" />
        <path d="M0,200 C50,130 110,80 190,40 C150,80 120,130 100,200 Z" />
        <path d="M0,200 C20,150 50,110 110,80 C90,110 70,150 60,200 Z" />
      </svg>
      <svg
        className="absolute right-0 bottom-0 w-44 sm:w-60 h-auto opacity-[0.06] pointer-events-none scale-x-[-1]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,200 C30,140 80,100 150,60 C120,90 90,130 80,200 Z" />
        <path d="M0,200 C50,130 110,80 190,40 C150,80 120,130 100,200 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Left Info + Right Carousel Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <span className="block text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-semibold text-gray-400 mb-2.5">
              OUR ROOMS
            </span>

            {/* Main Heading: Exact Luxury Serif Typography */}
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 tracking-tight leading-[1.15]">
              Exquisite Rooms &amp; Suites
            </h2>

            {/* Sub-paragraph */}
            <p className="mt-3.5 text-sm sm:text-base text-gray-600 font-sans leading-relaxed max-w-xl">
              Thoughtfully designed for your comfort, each room and suite offers a perfect blend of elegance, space, and modern amenities.
            </p>

            {/* View All Rooms Link */}
            <a
              href="#rooms"
              className="inline-flex items-center gap-2 mt-4 text-xs sm:text-sm font-semibold text-gray-900 hover:text-[#b9935a] transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-gray-300 group-hover:decoration-[#b9935a]">
                View All Rooms
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right: Circular Navigation Arrow Buttons */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous rooms"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 hover:text-gray-950 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next rooms"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 hover:text-gray-950 flex items-center justify-center shadow-sm transition-all duration-200 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Room Cards Horizontal Slider / Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-6 pt-2 snap-x snap-mandatory -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {roomsData.map((room) => (
            <div
              key={room.id}
              className="min-w-[290px] sm:min-w-[320px] md:min-w-[340px] lg:min-w-[360px] flex-1 snap-start bg-white rounded-[24px] p-3.5 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100/90 flex flex-col justify-between hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 group"
            >
              {/* Card Image Container with Inset Rounded Corners & Badges */}
              <div>
                <div className="relative aspect-[16/11] w-full rounded-[18px] overflow-hidden bg-gray-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top-Left 'Most Popular' Pill Badge */}
                  {room.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#0d1424]/90 backdrop-blur-md text-white text-[11px] font-medium tracking-wide shadow-md">
                        {room.badge}
                      </span>
                    </div>
                  )}

                  {/* Bottom Image Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-medium shadow-sm">
                      {room.viewBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-white/90 text-[10px] font-medium shadow-sm">
                      360° View
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="pt-4 px-1">
                  <h3 className="font-sans font-bold text-lg sm:text-[19px] text-gray-900 group-hover:text-[#b9935a] transition-colors">
                    {room.name}
                  </h3>

                  {/* Specs Line 1: Guests & Beds */}
                  <div className="flex items-center gap-3 text-xs sm:text-[13px] text-gray-500 font-medium mt-2">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{room.guests}</span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-gray-400" />
                      <span>{room.beds}</span>
                    </div>
                  </div>

                  {/* Specs Line 2: View */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-500 font-medium mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{room.view}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Warm Golden 'Book Now ->' Button */}
              <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between gap-3 px-1">
                <div>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 font-sans">
                    {room.price}
                  </span>
                  <span className="text-xs text-gray-400 font-normal ml-1 font-sans">
                    {room.period}
                  </span>
                </div>

                <button
                  onClick={() => handleBook(room)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#b9935a] hover:bg-[#a68249] active:scale-95 shadow-[0_4px_16px_rgba(185,147,90,0.3)] transition-all duration-200 cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
