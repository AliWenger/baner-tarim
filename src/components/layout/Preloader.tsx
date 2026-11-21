"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { INTRO_EVENT, INTRO_KEY } from "@/lib/constants";


/**
 * Oturum başına yalnızca bir kez gösterilen kısa açılış perdesi (~1.3 sn).
 * Sunucuda görünür olarak render edilir (ilk karede içerik "parlamasın" diye);
 * layout'taki küçük satır içi betik, daha önce görüldüyse onu CSS ile gizler.
 * JavaScript kapalıysa veya "hareketi azalt" açıksa hiç görünmez.
 */
export function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      window.__banerIntro = "done";
      setShow(false);
      return;
    }
    window.__banerIntro = "playing";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
      setShow(false);
      window.__banerIntro = "done";
      window.dispatchEvent(new Event(INTRO_EVENT));
    }, 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="preloader fixed inset-0 z-[90] flex items-center justify-center bg-forest text-bone"
          initial={false}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogoMark className="h-10 w-10 text-wheat" />
            <span className="font-display text-4xl font-light tracking-[-0.03em]">Baner Tarım</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
