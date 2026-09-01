export type LayoutVariant = "hulu";
export type Motion =
  | "cursor-glow"
  | "scroll-scale"
  | "blur-parallax"
  | "mask-reveal"
  | "blob-drift"
  | "glass-morph"
  | "glitch-scan"
  | "chrome-gloss"
  | "vhs-glow"
  | "stream-type"
  | "soft-press"
  | "ripple-elevate";

export type StyleConfig = {
  slug: string;
  name: string;
  inspiration: string;
  motionHint: string;
  motion: Motion;
  layout: LayoutVariant;
  navLinks?: string[];
  navVariant?: "pill";
  galleryGradient: string;
  tokens: {
    bg: string;
    bgImage?: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accent2: string;
    border: string;
    radius: string;
    radiusLg: string;
    shadow: string;
    shadowLg: string;
    fontHeading: string;
    fontBody: string;
    trackingHeading: string;
    cardAspect: string;
    heroHeight: string;
    blur?: string;
  };
};

export const LIQUID_GLASS: StyleConfig = {
  slug: "liquid-glass",
  name: "Liquid Glass",
  inspiration: "Inspired by Apple + OpenAI",
  motionHint: "Fluid morphing · glass distortion · floating layers",
  motion: "glass-morph",
  layout: "hulu",
  navLinks: ["Home", "Movies", "Shows", "Playlists", "Collections"],
  navVariant: "pill",
  galleryGradient: "linear-gradient(135deg, #c9d6e3 0%, #8ea9c9 45%, #3b6ea5 100%)",
  tokens: {
    bg: "#0d1117",
    bgImage:
      "radial-gradient(circle at 30% 20%, rgba(226,232,240,0.18), transparent 50%), radial-gradient(circle at 75% 70%, rgba(59,130,246,0.28), transparent 50%)",
    surface: "rgba(226,232,240,0.08)",
    surfaceAlt: "rgba(226,232,240,0.14)",
    text: "#eef3f9",
    textMuted: "#9fb0c4",
    accent: "#cbd5e1",
    accent2: "#60a5fa",
    border: "rgba(226,232,240,0.25)",
    radius: "28px",
    radiusLg: "36px",
    shadow: "0 8px 32px rgba(0,0,0,0.4)",
    shadowLg: "0 30px 70px rgba(96,165,250,0.2)",
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    trackingHeading: "-0.01em",
    cardAspect: "16/9",
    heroHeight: "60vh",
    blur: "24px",
  },
};
