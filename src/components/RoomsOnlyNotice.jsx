import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export default function RoomsOnlyNotice() {
  return (
    <section className="bg-sand-200/70 border-y border-sand-300 py-7 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <div className="w-11 h-11 rounded-full bg-sand-300 text-ink-800 flex items-center justify-center shrink-0">
          <UtensilsCrossed className="w-5 h-5 text-ink-700" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-lg text-ink-950">
            Rooms Only Notice
          </h4>
          <p className="text-xs sm:text-sm text-ink-600 mt-0.5">
            Rooms only. No restaurant on the premises. Several wholesome vegetarian dhabas, tea stalls, and Marwari eateries are situated 50 to 100 meters along Temple Road.
          </p>
        </div>
      </div>
    </section>
  );
}
