import { createClient } from '@supabase/supabase-js';

// Aapke Hotel PMS ka cloud Supabase configuration
export const SUPABASE_URL = 
  import.meta.env?.VITE_SUPABASE_URL || 
  'https://edpxglrduqqldhqljjec.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcHhnbHJkdXFxbGRocWxqamVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjM0NTUsImV4cCI6MjEwNTk5OTQ1NX0.p8IbOTqTj6Lyw8xp_-0QaoB5mj3uG9Rqo4x_TJikmyk';

export const PROPERTY_ID = 
  import.meta.env?.VITE_PROPERTY_ID || 
  'a0000000-0000-0000-0000-000000000001';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Website se seedhe PMS me online booking push karne ka function
 */
export async function createWebsiteBooking({
  guestName,
  guestPhone,
  guestEmail = '',
  checkInDate,     // Format: "YYYY-MM-DD" e.g. "2026-10-05"
  checkInTime = '12:00 PM',
  checkOutDate,    // Format: "YYYY-MM-DD" e.g. "2026-10-06"
  checkOutTime = '11:00 AM',
  totalGuests,
  guestsCount,
  roomCategory,
  roomType,
  roomsCount = 1,
  totalAmount = 1500,
  paidAmount = 0,
  paymentMethod = 'Pay at Hotel', // 'Razorpay', 'UPI', 'Pay at Hotel', 'WhatsApp'
  paymentGateway,
  razorpayPaymentId = '',
  paymentId,
  reasonOfVisit = 'Shri Goga Ji Mandir Darshan',
  homeAddress = '',
}) {
  try {
    // Resolve flexible parameters
    const guestsNum = Number(totalGuests || guestsCount || 1);
    const roomsNum = Number(roomsCount || 1);
    const resolvedCategory = roomCategory || (roomType === 'cooler' ? 'Cooler Room' : 'Deluxe AC Room');
    const resolvedMethod = paymentMethod || paymentGateway || 'Pay at Hotel';
    const resolvedPaymentId = razorpayPaymentId || paymentId || (paidAmount > 0 ? `pay_web_${Date.now()}` : '');

    // 1. Guest profile create karein
    const nameParts = (guestName || 'Website Guest').trim().split(/\s+/);
    const fName = nameParts[0] || 'Guest';
    const lName = nameParts.slice(1).join(' ') || '';

    const { data: guest, error: guestErr } = await supabase
      .from('guests')
      .insert({
        first_name: fName,
        last_name: lName,
        phone: String(guestPhone || '').trim(),
        email: guestEmail ? String(guestEmail).trim() : null,
      })
      .select('id')
      .single();

    if (guestErr) throw guestErr;

    // 2. Booking confirmation number banayein (WEB-XXXXXX)
    const confNumber = `WEB-${Math.floor(100000 + Math.random() * 900000)}`;

    const specialRequests = JSON.stringify({
      booking_source: 'WEBSITE',
      room_category: resolvedCategory,
      payment_gateway: resolvedMethod,
      razorpay_payment_id: resolvedPaymentId || null,
      paid_amount: Number(paidAmount) || 0,
      payment_status: paidAmount >= totalAmount ? 'PAID' : (paidAmount > 0 ? 'PARTIAL' : 'PENDING'),
      room_allotted: false,
      room_id: null,
      room_number: null,
      check_in_time: checkInTime || '12:00 PM',
      check_out_time: checkOutTime || '11:00 AM',
      reason_of_visit: reasonOfVisit,
      home_address: homeAddress || null,
      rooms_count: roomsNum,
      guests_count: guestsNum
    });

    // 3. Reservations table me entry karein (status: 'CONFIRMED' pre-booking ke roop me)
    const { data: res, error: resErr } = await supabase
      .from('reservations')
      .insert({
        property_id: PROPERTY_ID,
        confirmation_number: confNumber,
        guest_id: guest.id,
        channel: 'ONLINE_WEBSITE',
        status: 'CONFIRMED',
        arrival_date: checkInDate,
        departure_date: checkOutDate,
        check_in_time: checkInTime || '12:00 PM',
        check_out_time: checkOutTime || '11:00 AM',
        adults: guestsNum,
        children: 0,
        total_guests: guestsNum,
        total_amount: Number(totalAmount) || 0,
        special_requests: specialRequests,
      })
      .select('*')
      .single();

    if (resErr) throw resErr;

    // 4. Reservation item add karein
    try {
      await supabase
        .from('reservation_items')
        .insert({
          reservation_id: res.id,
          assigned_room_id: null, // Receptionist PMS se room allot karega
          stay_date: checkInDate,
          nightly_rate: Number(totalAmount) || 0,
          tax_amount: 0,
          is_active: true,
        });
    } catch (itemErr) {
      console.warn('[reservation_items] optional note:', itemErr);
    }

    // 5. Folio add karein (PMS software billing / folio ke liye)
    try {
      await supabase
        .from('folios')
        .insert({
          property_id: PROPERTY_ID,
          reservation_id: res.id,
          guest_id: guest.id,
          folio_number: `FOL-${confNumber}`,
          status: 'OPEN',
          total_charges: Number(totalAmount) || 0,
          total_payments: Number(paidAmount) || 0,
          balance: Math.max(0, (Number(totalAmount) || 0) - (Number(paidAmount) || 0)),
          tax_total: 0
        });
    } catch (folioErr) {
      console.warn('[folios] optional note:', folioErr);
    }

    return {
      success: true,
      confirmationNumber: confNumber,
      reservationId: res.id,
      message: 'Booking successfully created!'
    };
  } catch (error) {
    console.error('Booking submission failed:', error);
    return {
      success: false,
      error: error?.message || 'Failed to submit booking',
      confirmationNumber: `WEB-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}

// Backward compatibility alias
export const createWebsiteReservation = createWebsiteBooking;
