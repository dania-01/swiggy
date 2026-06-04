export function formatPrice(amount) {
  return `₹${amount}`;
}

export function formatRating(rating) {
  return Number(rating).toFixed(1);
}

export function formatDeliveryTime(minutes) {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  const lower = Math.floor(minutes / 5) * 5;
  const upper = lower + 5;
  return `${lower}-${upper} mins`;
}

export function formatPriceForTwo(amount) {
  return `₹${amount} for two`;
}

export function formatDiscount(discount) {
  if (!discount) return null;
  return discount;
}

export function formatRatingCount(count) {
  return count;
}
