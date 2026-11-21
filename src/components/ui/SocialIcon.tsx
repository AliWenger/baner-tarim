import type { SocialLink } from "@/content/types";

const paths: Record<SocialLink["platform"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6.5 10v8M6.5 6.5v.01M10.5 18v-4.5a2.5 2.5 0 0 1 5 0V18M10.5 10v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m10.2 9.3 4.6 2.7-4.6 2.7V9.3Z" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6.5H14V14h2.5l.5-3.5h-3V8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />,
  x: <path d="m4.5 4.5 15 15m0-15-15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
};

export function SocialIcon({ platform, className }: { platform: SocialLink["platform"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      {paths[platform]}
    </svg>
  );
}
