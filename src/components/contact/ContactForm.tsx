"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { toPayload, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { Arrow } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Form mesajlarının gönderileceği adres (statik site — sunucu yok).
 * Ör. Formspree: https://formspree.io/f/xxxxxxx  → NEXT_PUBLIC_CONTACT_ENDPOINT
 * JSON kabul eden herhangi bir form servisi / webhook kullanılabilir.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

type Status ={ type: "idle" } | { type: "sending" } | { type: "success" } | { type: "error"; message: string };

function Field({
  label,
  name,
  error,
  optional,
  textarea,
  type = "text",
  autoComplete,
  defaultValue,
  maxLength,
}: {
  label: string;
  name: keyof ContactPayload;
  error?: string;
  optional?: boolean;
  textarea?: boolean;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  maxLength?: number;
}) {
  const id = useId();
  const errId = `${id}-hata`;
  const common = {
    id,
    name,
    defaultValue,
    maxLength,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    className: cn(
      "peer w-full border-0 border-b bg-transparent px-0 pt-7 pb-3 text-[1.05rem] text-ink outline-none transition-colors duration-500 placeholder:text-transparent focus:ring-0",
      error ? "border-clay" : "border-ink/25 focus:border-forest",
    ),
    placeholder: label,
  };

  return (
    <div className="relative">
      {textarea ? (
        <textarea {...common} rows={5} className={cn(common.className, "resize-y")} />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-0 left-0 text-[0.78rem] tracking-[0.04em] text-ink/60 transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[1.05rem] peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[0.78rem] peer-focus:tracking-[0.04em] peer-focus:text-forest"
      >
        {label}
        {optional ? <span className="text-ink/40"> (opsiyonel)</span> : <span aria-hidden="true"> *</span>}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            id={errId}
            className="mt-2 text-[0.82rem] text-clay"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const subject = params.get("konu") ?? "";
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = toPayload({ ...Object.fromEntries(fd.entries()), consent: fd.get("consent") === "on" });
    const v = validateContact(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus({ type: "idle" });
      // İlk hatalı alana odaklan
      const first = Object.keys(v)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // Bot tuzağı doluysa sessizce "başarılı" göster
    if (payload.website) {
      setStatus({ type: "success" });
      form.reset();
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus({
        type: "error",
        message: `Form servisi henüz yapılandırılmadı. Lütfen ${site.contact.email} adresine e-posta gönderin.`,
      });
      return;
    }

    setStatus({ type: "sending" });
    try {
      const { website: _bot, consent, ...fields } = payload;
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...fields,
          kvkk_onayi: consent ? "Evet" : "Hayır",
          _subject: `Web sitesi mesajı: ${fields.subject || fields.name}`,
          _replyto: fields.email,
        }),
      });
      if (res.ok) {
        setStatus({ type: "success" });
        form.reset();
        return;
      }
      setStatus({ type: "error", message: "Mesajınız şu anda iletilemedi. Lütfen biraz sonra tekrar deneyin." });
    } catch {
      setStatus({ type: "error", message: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin." });
    }
  }

  if (status.type === "success") {
    return (
      <motion.div
        role="status"
        className="flex min-h-[420px] flex-col justify-center border border-forest/20 bg-sand/50 p-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="eyebrow text-olive">Mesajınız alındı</p>
        <p className="display-md mt-5 text-forest">Teşekkür ederiz.</p>
        <p className="mt-5 max-w-md text-ink/70">En kısa sürede size dönüş yapacağız.</p>
        <button
          type="button"
          onClick={() => setStatus({ type: "idle" })}
          className="link-underline mt-10 self-start pb-1 text-[0.95rem] font-medium text-forest"
        >
          Yeni mesaj gönder
        </button>
      </motion.div>
    );
  }

  const sending = status.type === "sending";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-durum" className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Ad soyad" name="name" autoComplete="name" error={errors.name} maxLength={100} />
        <Field label="Firma" name="company" optional autoComplete="organization" error={errors.company} maxLength={120} />
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="E-posta" name="email" type="email" autoComplete="email" error={errors.email} />
        <Field label="Telefon" name="phone" type="tel" optional autoComplete="tel" error={errors.phone} />
      </div>
      <Field label="Konu" name="subject" optional defaultValue={subject} error={errors.subject} maxLength={150} />
      <Field label="Mesajınız" name="message" textarea error={errors.message} maxLength={4000} />

      {/* Bot tuzağı */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Web sitesi
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-4 text-[0.9rem] leading-relaxed text-ink/75">
          <input
            type="checkbox"
            name="consent"
            aria-labelledby="kvkk-onay"
            aria-invalid={errors.consent ? true : undefined}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer appearance-none border border-ink/40 bg-transparent transition-colors checked:border-forest checked:bg-forest checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22m4%208%203%203%205-6%22%20fill=%22none%22%20stroke=%22%23f4f0e6%22%20stroke-width=%221.6%22/%3E%3C/svg%3E')]"
          />
          <span id="kvkk-onay">
            <Link href="/kvkk" target="_blank" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum; iletişim talebimin yanıtlanması amacıyla kişisel verilerimin işlenmesini kabul ediyorum.
          </span>
        </label>
        {errors.consent && <p className="mt-2 text-[0.82rem] text-clay">{errors.consent}</p>}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex shrink-0 items-center justify-center gap-4 bg-forest px-9 py-5 whitespace-nowrap text-[0.95rem] font-medium text-bone transition-colors duration-500 hover:bg-moss disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Gönderiliyor…" : "Mesajı gönder"}
          <Arrow className={cn("transition-transform duration-500", sending ? "animate-pulse" : "group-hover:translate-x-1")} />
        </button>
        <p id="form-durum" role="status" aria-live="polite" className="text-[0.9rem]">
          {status.type === "error" && <span className="text-clay">{status.message}</span>}
        </p>
      </div>
    </form>
  );
}
