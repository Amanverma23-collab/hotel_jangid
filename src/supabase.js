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
 * Fetch live room categories and prices from PMS
 */
export async function getLiveRoomRates() {
  try {
    const { data, error } = await supabase
      .from('room_types')
      .select('id, name, code, base_price, amenities, max_occupancy')
      .order('base_price', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Fallback to default room rates:', error);
      return [
        { id: 'c0000000-0000-0000-0000-000000000001', name: 'Deluxe AC Room', code: 'AC-DLX', base_price: 1200 },
        { id: 'c0000000-0000-0000-0000-000000000002', name: 'Non-AC Room', code: 'NON-AC', base_price: 1000 },
      ];
    }

    return data;
  } catch (err) {
    console.error('Failed to load room rates:', err);
    return [
      { id: 'c0000000-0000-0000-0000-000000000001', name: 'Deluxe AC Room', code: 'AC-DLX', base_price: 1200 },
      { id: 'c0000000-0000-0000-0000-000000000002', name: 'Non-AC Room', code: 'NON-AC', base_price: 1000 },
    ];
  }
}

/**
 * Live prices for AC and Cooler rooms: { ac: number, cooler: number }
 */
export async function getCategoryPrices() {
  try {
    const rates = await getLiveRoomRates();
    let acPrice = 1200;
    let coolerPrice = 1000;

    rates.forEach(r => {
      const name = (r.name || '').toLowerCase();
      const code = (r.code || '').toLowerCase();
      if (name.includes('cooler') || name.includes('non-ac') || code.includes('clr') || code.includes('exe')) {
        coolerPrice = Number(r.base_price) || 1000;
      } else if (name.includes('ac') || name.includes('king') || name.includes('deluxe') || code.includes('dlx')) {
        acPrice = Number(r.base_price) || 1200;
      }
    });

    return { ac: acPrice, cooler: coolerPrice };
  } catch {
    return { ac: 1200, cooler: 1000 };
  }
}

/**
 * Website se seedhe room ka live price update karna
 */
export async function updateLiveRoomRate({ id, base_price }) {
  try {
    const priceNum = Number(base_price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return { success: false, error: 'Please enter a valid price amount' };
    }

    const { data, error } = await supabase
      .from('room_types')
      .update({ base_price: priceNum, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) throw error;

    return {
      success: true,
      message: `Price successfully updated to ₹${priceNum.toLocaleString('en-IN')}`,
      data
    };
  } catch (err) {
    console.error('Failed to update room rate:', err);
    return { success: false, error: err?.message || 'Update failed' };
  }
}

/**
 * Category wise (AC ya Cooler) price direct website se update karna
 */
export async function updateCategoryPrice({ category, newPrice }) {
  try {
    const priceNum = Number(newPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      return { success: false, error: 'Please enter a valid positive price' };
    }

    const isCooler = category === 'cooler' || category === 'non_ac';
    const targetRoomTypeId = isCooler
      ? 'c0000000-0000-0000-0000-000000000002'
      : 'c0000000-0000-0000-0000-000000000001';

    // 1. Update room_types
    await supabase
      .from('room_types')
      .update({ base_price: priceNum, updated_at: new Date().toISOString() })
      .eq('id', targetRoomTypeId);

    // 2. Update custom_price in rooms
    const coolingType = isCooler ? 'COOLER' : 'AC';
    const { data: allRooms } = await supabase.from('rooms').select('id, notes');
    if (allRooms && allRooms.length > 0) {
      const matchIds = allRooms
        .filter(r => {
          try {
            const p = JSON.parse(r.notes || '{}');
            return p.cooling === coolingType;
          } catch {
            return r.notes?.includes(coolingType);
          }
        })
        .map(r => r.id);

      if (matchIds.length > 0) {
        await supabase
          .from('rooms')
          .update({ custom_price: priceNum, updated_at: new Date().toISOString() })
          .in('id', matchIds);
      }
    }

    return {
      success: true,
      category: isCooler ? 'Non-AC Room' : 'Deluxe AC Room',
      newPrice: priceNum,
      message: `${isCooler ? 'Non-AC Room' : 'Deluxe AC Room'} price updated to ₹${priceNum}`
    };
  } catch (err) {
    console.error('Failed to update category price:', err);
    return { success: false, error: err?.message || 'Update failed' };
  }
}

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
  totalAmount = 1200,
  paidAmount = 0,
  paymentMethod = 'Pay at Hotel', // 'Razorpay', 'UPI', 'Pay at Hotel', 'WhatsApp'
  paymentGateway,
  razorpayPaymentId = '',
  paymentId,
  reasonOfVisit = null,
  homeAddress = '',
}) {
  try {
    // Enforce maximum 7 days advance booking limit for check-in
    const now = new Date();
    const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
    const max7DaysDate = new Date(now);
    max7DaysDate.setDate(max7DaysDate.getDate() + 7);
    const maxCheckInStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(max7DaysDate);

    if (checkInDate && checkInDate > maxCheckInStr) {
      throw new Error('Advance booking is allowed only up to 7 days in advance. Maximum Check-In date is ' + maxCheckInStr + '.');
    }

    const guestsNum = Number(totalGuests || guestsCount || 1);
    const roomsNum = Number(roomsCount || 1);
    const resolvedCategory = roomCategory || (roomType === 'cooler' || roomType === 'non_ac' ? 'Non-AC Room' : 'Deluxe AC Room');
    const resolvedMethod = paymentMethod || paymentGateway || 'Pay at Hotel';
    const resolvedPaymentId = razorpayPaymentId || paymentId || (paidAmount > 0 ? `pay_web_${Date.now()}` : '');

    // 1. Create guest profile
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

    // 3. Create entry in reservations table (status: 'CONFIRMED')
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

    // 4. Add reservation item
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

    // 5. Create folio record for PMS billing
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
