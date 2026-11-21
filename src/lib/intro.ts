"use client";

import { useEffect, useState } from "react";

/**
 * Açılış perdesi ile hero animasyonunu senkronlar.
 * Preloader, efektinde `window.__banerIntro` değerini ayarlar; hero bu değer
 * "playing" ise perde kalkana kadar bekler.
 */
declare global {
  interface Window {
    __banerIntro?: "playing" | "done";
  }
}

import { INTRO_EVENT } from "./constants";

export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__banerIntro !== "playing") {
      setReady(true);
      return;
    }
    const done = () => setReady(true);
    window.addEventListener(INTRO_EVENT, done, { once: true });
    return () => window.removeEventListener(INTRO_EVENT, done);
  }, []);
  return ready;
}
