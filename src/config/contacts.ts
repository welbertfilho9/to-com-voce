export const CONTACTS_CONFIG = {
  welbert: {
    name: 'Welbert',
    phoneRaw: '82994227593',
    phoneFormatted: '(82) 99422-7593',
    phoneInternational: '+5582994227593',
    email: 'welbertfilho9@gmail.com',
    location: 'Diadema, SP (UFABC)'
  },
  antonella: {
    name: 'Antonella',
    nickname: 'Tonton',
    phoneRaw: '82991034733',
    phoneFormatted: '(82) 99103-4733',
    phoneInternational: '+5582991034733',
    email: 'antonellaawanes441@gmail.com',
    location: 'Maceió, AL (Clima Bom / UFAL)'
  }
};

export function getWelbertWhatsAppLink(message: string): string {
  return `https://wa.me/5582994227593?text=${encodeURIComponent(message)}`;
}

export function getAntonellaWhatsAppLink(message: string): string {
  return `https://wa.me/5582991034733?text=${encodeURIComponent(message)}`;
}

export function getWelbertCallLink(): string {
  return 'tel:+5582994227593';
}

export function getAntonellaCallLink(): string {
  return 'tel:+5582991034733';
}

export function getWelbertSmsLink(body: string): string {
  // iOS format for SMS deep-link
  return `sms:+5582994227593&body=${encodeURIComponent(body)}`;
}
