import { supabase, PROPERTY_ID } from '../supabase';

/**
 * Website se seedhe PMS me online booking push karne ka function
 * 
 * @param {Object} bookingData
 * @param {string} bookingData.guestName - Guest ka naam (e.g. "Ramesh Sharma")
 * @param {string} bookingData.guestPhone - 10-digit mobile number (e.g. "9876543210")
 * @param {string} [bookingData.guestEmail=''] - Guest email id
 * @param {string} bookingData.checkInDate - Format: "YYYY-MM-DD" e.g. "2026-10-10"
 * @param {string} bookingData.checkOutDate - Format: "YYYY-MM-DD" e.g. "2026-10-12"
 * @param {string} [bookingData.checkInTime='12:00 PM'] - Check-in time
 * @param {string} [bookingData.checkOutTime='11:00 AM'] - Check-out time
 * @param {number} [bookingData.totalGuests=1] - Total guests
 * @param {string} [bookingData.roomCategory='Deluxe AC Room'] - "Deluxe AC Room" ya "Cooler Room"
 * @param {number} [bookingData.totalAmount=1500] - Total booking amount
 * @param {number} [bookingData.paidAmount=0] - Advance / Full paid amount
 * @param {string} [bookingData.paymentMethod='Razorpay'] - "Razorpay", "UPI", "Pay at Hotel", "WhatsApp"
 * @param {string} [bookingData.razorpayPaymentId=''] - Razorpay payment transaction id
 * @param {string} [bookingData.reasonOfVisit='Darshan / Tour'] - Visit reason
 * @param {string} [bookingData.homeAddress=''] - City / State
 * 
 * @returns {Promise<{ success: boolean, confirmationNumber?: string, reservationId?: string, message?: string, error?: string }>}
 */
export async function createWebsiteBooking({
  guestName,
  guestPhone,
  guestEmail = '',
  checkInDate,
  checkOutDate,
  checkInTime = '12:00 PM',
  checkOutTime = '11:00 AM',
  totalGuests = 1,
  guestsCount,
  roomCategory = 'Deluxe AC Room',
  roomType,
  roomsCount = 1,
  totalAmount = 1500,
  paidAmount = 0,
  paymentMethod = 'Razorpay',
  paymentGateway,
  razorpayPaymentId = '',
  paymentId,
  reasonOfVisit = 'Darshan / Tour',
  homeAddress = ''
}) {
  try {
    const guestsNum = Number(totalGuests || guestsCount || 1);
    const roomsNum = Number(roomsCount || 1);
    const resolvedCategory = roomCategory || (roomType === 'cooler' ? 'Cooler Room' : 'Deluxe AC Room');
    const resolvedMethod = paymentMethod || paymentGateway || 'Razorpay';
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

    // 2. Booking confirmation number banayein (Format: WEB-XXXXXX)
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
      check_in_time: checkInTime,
      check_out_time: checkOutTime,
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
        check_in_time: checkInTime,
        check_out_time: checkOutTime,
        adults: guestsNum,
        children: 0,
        total_guests: guestsNum,
        total_amount: Number(totalAmount) || 0,
        special_requests: specialRequests,
      })
      .select('*')
      .single();

    if (resErr) throw resErr;

    // 4. Reservation item add karein (Receptionist PMS software se room allot karega)
    try {
      await supabase
        .from('reservation_items')
        .insert({
          reservation_id: res.id,
          assigned_room_id: null,
          stay_date: checkInDate,
          nightly_rate: Number(totalAmount) || 0,
          tax_amount: 0,
          is_active: true,
        });
    } catch (itemErr) {
      console.warn('[reservation_items] note:', itemErr);
    }

    // 5. Folio add karein (PMS software billing / folio balance ke liye)
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
      console.warn('[folios] note:', folioErr);
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
      error: error?.message || 'Failed to submit booking'
    };
  }
}

// Backward compatibility alias
export const createWebsiteReservation = createWebsiteBooking;
