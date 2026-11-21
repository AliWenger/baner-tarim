"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const ease = [0.76, 0, 0.24, 1] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 420);
  });

  // Rota değişince menüyü kapat
  useEffect(() => setOpen(false), [pathname]);

  // Menü açıkken sayfa kaydırmasını kilitle, Esc ile kapat
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const solid = scrolled && !open;

  return (
    <>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink"
      >
        İçeriğe geç
      </a>

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-700",
          solid
            ? "border-b border-ink/10 bg-bone/85 text-ink backdrop-blur-md"
            : "border-b border-transparent text-bone",
        )}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="gutter flex h-[76px] items-center justify-between md:h-[88px]">
          <Link href="/" aria-label={`${site.name} — Ana sayfa`} className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-9">
              {navigation.slice(1).map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative py-2 text-[0.9rem] font-medium tracking-[0.01em]"
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={menuButton}
            type="button"
            className="relative z-10 -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobil-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="eyebrow text-[0.66rem]">{open ? "Kapat" : "Menü"}</span>
            <span className="relative block h-3 w-7" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobil-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-40 flex flex-col bg-forest text-bone lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease }}
          >
            <nav aria-label="Mobil menü" className="gutter flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-1">
                {navigation.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "110%", transition: { duration: 0.4, ease } }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-baseline gap-4 py-1.5"
                        >
                          <span className="eyebrow w-6 text-[0.6rem] text-sage">0{i + 1}</span>
                          <span
                            className={cn(
                              "font-display text-[clamp(2.3rem,10vw,4rem)] leading-[1.05] font-light tracking-[-0.03em] transition-colors",
                              active ? "text-wheat" : "group-hover:text-wheat",
                            )}
                          >
                            {item.label}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              className="gutter grid gap-1 border-t border-bone/15 py-7 text-sm text-bone/75"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <a href={site.contact.phoneHref}>{site.contact.phone}</a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
