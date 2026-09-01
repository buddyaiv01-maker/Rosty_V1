import { useTheme } from "../../theme/ThemeContext";
import type { Title } from "../../data/content";

export default function HuluHero({ title, onOpen }: { title: Title; onOpen: (t: Title) => void }) {
  const style = useTheme();
  const isGlass = style.motion === "glass-morph";
  const isSoft = style.motion === "soft-press";
  const isMaterial = style.motion === "ripple-elevate";

  const subtitle = title.isSeries ? "S1 E1 · Now Streaming" : "Now Streaming";

  return (
    <div className="relative flex items-end overflow-hidden" style={{ height: "var(--r-hero-height)" }}>
      <div className="absolute inset-0">
        {title.poster ? (
          <img src={title.poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <div
            className="h-full w-full"
            style={{ background: `linear-gradient(140deg, hsl(${title.hue} 55% 22%), hsl(${title.hue2} 50% 12%))` }}
          />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--r-bg) 8%, rgba(0,0,0,0.15) 45%, transparent 70%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--r-bg) 2%, transparent 45%)" }} />
      </div>

      <div className="relative z-10 max-w-xl px-6 pb-14 sm:px-10 sm:pb-16">
        <p
          className="mb-2 text-xs font-bold uppercase tracking-widest"
          style={{ color: "var(--r-text-muted)" }}
        >
          Start Watching
        </p>
        <p
          className="text-sm font-extrabold uppercase tracking-wide"
          style={{ fontFamily: "var(--r-font-heading)", color: "var(--r-accent)" }}
        >
          Rosty
        </p>
        <h1
          className="mt-1 text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl"
          style={{ fontFamily: "var(--r-font-heading)", letterSpacing: "var(--r-tracking-heading)", color: "var(--r-text)" }}
        >
          {title.title}
        </h1>
        <p className="mt-4 text-sm font-semibold" style={{ color: "var(--r-accent-2)" }}>
          {subtitle}
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: "var(--r-text-muted)" }}>
          {title.synopsis}
        </p>
        <p className="mt-3 text-xs font-medium" style={{ color: "var(--r-text-muted)" }}>
          {title.rating} &nbsp;·&nbsp; {title.genres.join(", ")} &nbsp;·&nbsp; {title.year}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold transition-transform active:scale-95"
            style={{
              background: "var(--r-text)",
              color: "var(--r-bg)",
              borderRadius: isMaterial ? "4px" : "var(--r-radius)",
              boxShadow: isSoft ? "var(--r-shadow)" : "none",
            }}
          >
            ▶ Play
          </button>
          <button
            onClick={() => onOpen(title)}
            className="px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-transform active:scale-95"
            style={{
              background: isGlass ? "var(--r-surface)" : "transparent",
              backdropFilter: isGlass ? `blur(var(--r-blur))` : undefined,
              color: "var(--r-text)",
              border: "1.5px solid var(--r-text)",
              borderRadius: isMaterial ? "4px" : "var(--r-radius)",
            }}
          >
            Details
          </button>
          <button
            className="grid h-11 w-11 place-items-center text-lg"
            style={{
              background: "var(--r-surface-alt)",
              color: "var(--r-text-muted)",
              borderRadius: "999px",
              boxShadow: isSoft ? "var(--r-shadow)" : "none",
            }}
          >
            ⋮
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === 0 ? "18px" : "6px",
              background: i === 0 ? "var(--r-text)" : "var(--r-border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
