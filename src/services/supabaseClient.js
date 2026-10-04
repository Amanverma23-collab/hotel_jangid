import { createClient } from '@supabase/supabase-js';

// Supabase Credentials (from Vite env with resilient production fallbacks)
const SUPABASE_URL = 
  import.meta.env?.VITE_SUPABASE_URL || 
  'https://edpxglrduqqldhqljjec.supabase.co';

const SUPABASE_ANON_KEY = 
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcHhnbHJkdXFxbGRocWxqamVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjM0NTUsImV4cCI6MjEwNTk5OTQ1NX0.p8IbOTqTj6Lyw8xp_-0QaoB5mj3uG9Rqo4x_TJikmyk';

export const PROPERTY_ID = 
  import.meta.env?.VITE_PROPERTY_ID || 
  'a0000000-0000-0000-0000-000000000001';

// Room type UUIDs configured in Supabase PMS database
export const ROOM_TYPE_IDS = {
  ac: 'c0000000-0000-0000-0000-000000000001',      // Deluxe King / AC Room
  cooler: 'c0000000-0000-0000-0000-000000000002',  // Executive / Cooler Room
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Creates a website reservation in Supabase that instantly appears
 * in the Hotel Jangid PMS software (Online Bookings view + History).
 */
export async function createWebsiteReservation(booking) {
  try {
    const {
      guestName = '',
      guestPhone = '',
      guestEmail = '',
      checkInDate,
      checkInTime = '12:00 PM',
      checkOutDate,
      checkOutTime = '11:00 AM',
      roomType = 'ac',
      roomsCount = 1,
      guestsCount = 2,
      totalAmount = 1200,
      paidAmount = 0,
      paymentGateway = 'Direct / WhatsApp',
      paymentId = null,
      paymentStatus = 'PAY_AT_HOTEL',
      homeAddress = '',
      reasonOfVisit = 'Shri Goga Ji Mandir Darshan',
    } = booking;

    // 1. Generate standard Web confirmation number: WEB-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const confirmationNumber = `WEB-${randomSuffix}`;

    // Clean name
    const trimmedName = guestName.trim() || 'Website Guest';
    const nameParts = trimmedName.split(/\s+/);
    const firstName = nameParts[0] || 'Guest';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Calculate nights
    const nights = Math.max(
      1,
      Math.round(
        (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 1
    );

    const roomCategoryName =
      roomType === 'cooler' ? 'Cooler Room' : 'Deluxe AC Room';

    // 2. Insert Guest
    const cleanPhone = (guestPhone || '').replace(/\D/g, '');
    const { data: guestData, error: guestError } = await supabase
      .from('guests')
      .insert({
        first_name: firstName,
        last_name: lastName || 'Guest',
        phone: cleanPhone || '9001187776',
        email: guestEmail?.trim() || null,
      })
      .select('id')
      .single();

    if (guestError || !guestData) {
      console.warn('[Supabase] Guest insertion note:', guestError?.message);
    }
    const guestId = guestData?.id || null;

    // 3. Prepare special_requests JSON (parsed by PMS for Online Bookings view)
    const specialRequests = JSON.stringify({
      booking_source: 'WEBSITE',
      room_category: roomCategoryName,
      payment_gateway: paymentGateway,
      razorpay_payment_id: paymentId,
      paid_amount: Number(paidAmount) || 0,
      payment_status: paymentStatus,
      room_allotted: false,
      room_id: null,
      room_number: null,
      allotted_at: null,
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
      reason_of_visit: reasonOfVisit,
      home_address: homeAddress || null,
      rooms_count: Number(roomsCount) || 1,
      guests_count: Number(guestsCount) || 2,
      nights: nights,
      client_timestamp: new Date().toISOString(),
    });

    // 4. Insert Reservation
    const { data: resData, error: resError } = await supabase
      .from('reservations')
      .insert({
        property_id: PROPERTY_ID,
        confirmation_number: confirmationNumber,
        guest_id: guestId,
        channel: 'ONLINE_WEBSITE',
        status: 'CONFIRMED',
        arrival_date: checkInDate,
        departure_date: checkOutDate,
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        adults: Number(guestsCount) || 2,
        children: 0,
        total_guests: Number(guestsCount) || 2,
        total_amount: Number(totalAmount) || 0,
        special_requests: specialRequests,
      })
      .select('id, confirmation_number')
      .single();

    if (resError) {
      console.warn('[Supabase] Reservation creation failed:', resError.message);
      return {
        success: false,
        error: resError.message,
        confirmationNumber,
      };
    }

    const reservationId = resData.id;

    // 5. Insert Reservation Item
    try {
      const roomTypeId =
        roomType === 'cooler' ? ROOM_TYPE_IDS.cooler : ROOM_TYPE_IDS.ac;
      const nightlyRate = Math.round(
        Number(totalAmount) / (nights * (Number(roomsCount) || 1))
      );

      await supabase.from('reservation_items').insert({
        reservation_id: reservationId,
        room_type_id: roomTypeId,
        stay_date: checkInDate,
        nightly_rate: nightlyRate,
        tax_amount: 0,
        stay_start: `${checkInDate}T06:30:00+00:00`,
        stay_end: `${checkOutDate}T05:30:00+00:00`,
        is_active: true,
      });
    } catch (itemErr) {
      console.warn('[Supabase] Reservation item insert optional warning:', itemErr);
    }

    // 6. Insert Folio for accounting in PMS
    try {
      if (guestId) {
        await supabase.from('folios').insert({
          property_id: PROPERTY_ID,
          reservation_id: reservationId,
          guest_id: guestId,
          folio_number: `FOL-${confirmationNumber}`,
          status: 'OPEN',
          total_charges: Number(totalAmount) || 0,
          total_payments: Number(paidAmount) || 0,
          balance: Math.max(0, (Number(totalAmount) || 0) - (Number(paidAmount) || 0)),
          tax_total: 0,
        });
      }
    } catch (folioErr) {
      console.warn('[Supabase] Folio insert optional warning:', folioErr);
    }

    return {
      success: true,
      confirmationNumber,
      reservationId,
      guestId,
      roomCategory: roomCategoryName,
    };
  } catch (err) {
    console.error('[Supabase] createWebsiteReservation unhandled error:', err);
    return {
      success: false,
      error: err?.message || 'Network error',
      confirmationNumber: `WEB-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }
}

/**
 * Fetches live availability from PMS database
 */
export async function fetchLiveAvailability() {
  try {
    const { data: rooms, error } = await supabase
      .from('rooms')
      .select('id, room_number, occupancy_status, clean_status, notes')
      .eq('property_id', PROPERTY_ID);

    if (error || !rooms) return null;

    let acTotal = 0;
    let acVacant = 0;
    let coolerTotal = 0;
    let coolerVacant = 0;

    rooms.forEach((r) => {
      let isAc = true;
      try {
        const notesObj = JSON.parse(r.notes || '{}');
        if (notesObj.cooling === 'COOLER' || notesObj.cooling === 'NON_AC') {
          isAc = false;
        }
      } catch {
        if (r.notes?.includes('COOLER') || r.notes?.includes('NON_AC')) {
          isAc = false;
        }
      }

      const isVacant = r.occupancy_status === 'VACANT';

      if (isAc) {
        acTotal++;
        if (isVacant) acVacant++;
      } else {
        coolerTotal++;
        if (isVacant) coolerVacant++;
      }
    });

    return {
      totalRooms: rooms.length,
      acTotal,
      acVacant,
      coolerTotal,
      coolerVacant,
    };
  } catch (err) {
    console.warn('[Supabase] fetchLiveAvailability failed:', err);
    return null;
  }
}
