export const privacy = {
  showPhoneNumbersPublicly: false,
  showExactAddressPublicly: false,
  showHoroscopePublicly: false, // gotram/rasi/nakshatram shown only after access
  requireAccessCodeForContact: true,
  accessCodeHint: "Shared privately with interested families",
  enableBiodataDownload: true,
  enableWhatsAppContact: false,
  enableInquiryForm: true,
  blockImageDownload: true,
} as const;

// Private details live ONLY here and must never be rendered into public page
// source when the corresponding flag is false. Values come from env, never the repo.
export const privateContact = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  // Server-side only — never prefixed with NEXT_PUBLIC, never sent to the client.
  accessCode: process.env.CONTACT_ACCESS_CODE ?? "",
};

export type Privacy = typeof privacy;
