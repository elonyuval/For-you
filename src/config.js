/**
 * Where the "tell him" button sends to.
 *
 * International format, digits only, no + and no leading zero.
 * Israeli example: 050-123-4567 becomes '972501234567'.
 *
 * Leave it empty and the button simply never renders — better a missing
 * button than one that opens a broken chat.
 */
export const WHATSAPP_NUMBER = '';

/** The message she sends, with the time she picked dropped in. */
export const confirmMessage = (time) =>
  `קבענו! ❤️ שישי ב-${time} — ואל תדאג, המנטוס עליי 🌹`;

export const whatsappLink = (time) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(confirmMessage(time))}`;
