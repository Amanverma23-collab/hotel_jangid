export const HOTEL_INFO = {
  name: "Jangid Hotel",
  hindiName: "होटल जांगिड़",
  town: "Gogamedi, Rajasthan",
  tagline: "400 m from Goga Ji Temple · 900 m from Railway Station",
  promise: "A quiet, honest family-run stay in Gogamedi.",
  phone: "+91 98120 00000",
  whatsapp: "+91 98120 00000",
  address: "Jamal - Gogamedi Road, near Goga Mandir Turn Point, Gogamedi, Hanumangarh, Rajasthan — 335504",
  mapUrl: "https://maps.google.com/?q=Hotel+Jangid+Gogamedi",
  totalRooms: 23,
  distances: {
    temple: "400 m (5-minute walk)",
    railwayStation: "900 m (10-minute walk / 3-minute e-rickshaw)",
    busStand: "600 m",
  },
  owners: [
    {
      name: "Surjeet Jangid",
      role: "Founder & Elder",
      desc: "Our family has welcomed pilgrims for years. We ensure every guest feels the warmth and security of home."
    },
    {
      name: "Vijay Jangid",
      role: "Co-Owner & Manager",
      desc: "I am personally on-site every day to check room cleanliness and help guests with temple timings and travel."
    }
  ],
  roomTypes: [
    {
      id: "ac",
      name: "Deluxe AC Room",
      price: 1200,
      capacity: "2–3 Guests",
      beds: "1 Double Bed + 1 Extra Cot",
      image: "/images/room-ac-deluxe.jpg",
      gallery: [
        "/images/room-ac-deluxe.jpg",
        "/images/room-family-deluxe.jpg",
        "/images/room-bathroom.jpg",
        "/images/room-ac-entrance.jpg"
      ],
      features: [
        "High-cooling split air conditioner",
        "Attached western bathroom with hot water",
        "Wall-mounted LED TV & charging points",
        "Clean cotton bedding & fresh linens",
        "24x7 inverter power backup",
        "Daily housekeeping & pure RO drinking water"
      ]
    },
    {
      id: "non-ac",
      name: "Cooler Room (Non-AC)",
      price: 1000,
      capacity: "2–3 Guests",
      beds: "1 Double Bed + 1 Cot",
      image: "/images/room-standard-ac.jpg",
      gallery: [
        "/images/room-standard-ac.jpg",
        "/images/room-bathroom.jpg",
        "/images/room-ac-entrance.jpg"
      ],
      features: [
        "Heavy-duty desert air cooler & ceiling fan",
        "Attached private tiled bathroom",
        "Fresh water supply & geyser facility",
        "Clean mattresses and pillows",
        "Spacious, well-ventilated windows",
        "Peaceful courtyard atmosphere"
      ]
    }
  ],
  faqs: [
    {
      q: "What are the check-in and check-out timings?",
      a: "Standard check-in is at 12:00 PM and check-out is at 11:00 AM. Early check-in is accommodated subject to room availability on arrival."
    },
    {
      q: "Is government ID proof required at check-in?",
      a: "Yes. In accordance with government hotel regulations, all adult guests must present a valid government photo ID (Aadhaar Card, Voter ID, or Driving License)."
    },
    {
      q: "How far is the hotel from Goga Ji Temple and Railway Station?",
      a: "The hotel is 400 meters from Shri Goga Ji Temple (an easy 5-minute walk along a direct paved road). Gogamedi Railway Station is 900 meters away (approx. 3 minutes by e-rickshaw or 10 minutes on foot)."
    },
    {
      q: "Is safe vehicle parking available?",
      a: "Yes. Jangid Hotel has a large, open private courtyard directly in front of the building with secure parking space for personal cars, SUVs, and taxis."
    },
    {
      q: "Do you serve food or tea on premises?",
      a: "Jangid Hotel is strictly a rooms-only property. There is no restaurant on the premises. However, several pure vegetarian Rajasthani dhabas and eateries are located within 50 to 100 meters on Temple Road."
    },
    {
      q: "What is your booking cancellation policy?",
      a: "You can modify or cancel your booking by notifying us at least 24 hours prior to your scheduled check-in. For any immediate assistance, you can contact Vijay Jangid directly via phone or WhatsApp."
    }
  ]
};
