import React from 'react';
import {
  Wifi,
  Droplets,
  Snowflake,
  Landmark,
  Train,
  Car,
  Zap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function AmenitiesSection({ onExploreClick }) {
  const amenities = [
    {
      icon: Wifi,
      title: 'Free Wi-Fi',
      desc: 'Stay connected smoothly',
    },
    {
      icon: Droplets,
      title: 'Hot & Cold Water',
      desc: '24x7 geyser in every room',
    },
    {
      icon: Snowflake,
      title: 'Deluxe AC Rooms',
      desc: 'High-cooling split units',
    },
    {
      icon: Landmark,
      title: 'Goga Ji Temple',
      desc: 'Just 400 m (5 min walk)',
    },
    {
      icon: Train,
      title: 'Railway Station',
      desc: 'Only 900 m (3 min ride)',
    },
    {
      icon: Car,
      title: 'Free Parking',
      desc: 'Secure private courtyard',
    },
    {
      icon: Zap,
      title: '24/7 Power Backup',
      desc: 'Continuous inverter supply',
    },
    {
      icon: ShieldCheck,
      title: 'Pure RO Water',
      desc: 'Fresh hygienic drinking water',
    },
  ];

  const handleExplore = (e) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('booking') || document.getElementById('rooms');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="amenities"
      className="relative py-20 md:py-24 bg-[#070c18] text-white overflow-hidden border-t border-b border-white/5"
    >
      {/* Subtle Tropical Palm Silhouettes on Edges (Exact Match to Reference Image) */}
      <div className="absolute -left-10 top-0 bottom-0 w-56 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_left,rgba(223,197,158,0.2),transparent_70%)]" />
      <div className="absolute -right-10 top-0 bottom-0 w-56 opacity-10 pointer-events-none select-none bg-[radial-gradient(ellipse_at_right,rgba(223,197,158,0.2),transparent_70%)]" />

      {/* Decorative Palm Silhouette SVGs on Left & Right */}
      <svg
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-auto opacity-[0.07] pointer-events-none text-[#dfc59e]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,100 C40,70 90,50 160,30 C130,55 100,85 90,130 C80,85 50,55 0,100 Z" />
        <path d="M0,100 C50,110 110,130 180,160 C140,140 100,120 70,100 Z" />
        <path d="M0,100 C30,90 70,80 140,70 C110,85 80,100 60,120 Z" />
      </svg>
      <svg
        className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-auto opacity-[0.07] pointer-events-none scale-x-[-1] text-[#dfc59e]"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M0,100 C40,70 90,50 160,30 C130,55 100,85 90,130 C80,85 50,55 0,100 Z" />
        <path d="M0,100 C50,110 110,130 180,160 C140,140 100,120 70,100 Z" />
      </svg>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Subtitle & Explore Link */}
          <div className="lg:col-span-4 xl:col-span-4 text-left">
            <span className="block text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-semibold text-[#dfc59e] mb-2.5">
              HOTEL AMENITIES
            </span>
            
            <h2 className="font-luxury-serif text-3xl sm:text-4xl md:text-[2.75rem] font-normal text-white tracking-tight leading-[1.15]">
              What Facilities &amp; Amenities Does Hotel Jangid Provide?
            </h2>

            <p className="mt-4 text-sm sm:text-[15px] text-white/70 font-sans leading-relaxed">
              From continuous hot geyser water to 400-meter temple proximity, we provide everything needed for a restful pilgrimage stay.
            </p>

            <a
              href="/#rooms"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 mt-6 text-xs sm:text-sm font-semibold text-[#dfc59e] hover:text-white transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-[#dfc59e]/50 group-hover:decoration-white">
                Explore All Amenities
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          {/* Vertical Divider for Desktop */}
          <div className="hidden lg:block lg:col-span-1 border-l border-white/10 h-64 self-center justify-self-center" />

          {/* Right Column: 8 Amenities Grid (4 columns x 2 rows) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 md:gap-y-10 text-center">
              {amenities.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-start text-center group cursor-default transition-transform duration-200 hover:-translate-y-1"
                  >
                    {/* Minimalist Gold Line Icon (Matches Reference Aesthetic) */}
                    <div className="w-12 h-12 flex items-center justify-center text-[#dfc59e] group-hover:text-[#ecd7b6] group-hover:scale-110 transition-all duration-300 mb-3">
                      <IconComponent className="w-8 h-8 stroke-[1.6]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-white tracking-wide group-hover:text-[#dfc59e] transition-colors">
                      {item.title}
                    </h3>

                    {/* Subtitle / Tagline */}
                    <p className="mt-1 text-xs text-white/55 font-sans leading-snug">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
