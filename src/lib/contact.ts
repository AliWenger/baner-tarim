/**
 * İletişim formu doğrulaması — hem tarayıcıda hem sunucuda aynı kurallar.
 */
export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  /** Bot tuzağı — gerçek kullanıcılar bu alanı görmez ve boş bırakır. */
  website: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export function validateContact(data: ContactPayload): ContactErrors {
  const e: ContactErrors = {};
  const name = data.name.trim();
  if (name.length < 2) e.name = "Lütfen adınızı ve soyadınızı yazın.";
  else if (name.length > 100) e.name = "Ad soyad en fazla 100 karakter olabilir.";

  if (data.company.trim().length > 120) e.company = "Firma adı en fazla 120 karakter olabilir.";

  if (!data.email.trim()) e.email = "E-posta adresi gerekli.";
  else if (!EMAIL.test(data.email.trim())) e.email = "Geçerli bir e-posta adresi yazın.";

  if (data.phone.trim() && !PHONE.test(data.phone.trim())) e.phone = "Geçerli bir telefon numarası yazın.";

  if (data.subject.trim().length > 150) e.subject = "Konu en fazla 150 karakter olabilir.";

  const msg = data.message.trim();
  if (msg.length < 10) e.message = "Mesajınız en az 10 karakter olmalı.";
  else if (msg.length > 4000) e.message = "Mesajınız en fazla 4000 karakter olabilir.";

  if (!data.consent) e.consent = "Devam etmek için aydınlatma metnini onaylayın.";
  return e;
}

export function toPayload(raw: Record<string, unknown>): ContactPayload {
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    subject: str(raw.subject),
    message: str(raw.message),
    consent: raw.consent === true || raw.consent === "on" || raw.consent === "true",
    website: str(raw.website),
  };
}
