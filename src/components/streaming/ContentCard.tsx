import { useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import type { Title } from "../../data/content";

type Ripple = { id: number; x: number; y: number };

export default function ContentCard({
  title,
  onOpen,
  span,
}: {
  title: Title;
  onOpen: (t: Title) => void;
  span?: string;
}) {
  const style = useTheme();
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const isMaterial = style.motion === "ripple-elevate";
  const isGlitch = style.motion === "glitch-scan";
  const isChrome = style.motion === "chrome-gloss";
  const isGlass = style.motion === "glass-morph" || style.motion === "blur-parallax";
  const isSoft = style.motion === "soft-press";

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaterial) {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    }
    onOpen(title);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative shrink-0 cursor-pointer select-none overflow-hidden transition-all duration-300"
      style={{
        width: span ?? "clamp(160px, 22vw, 230px)",
        aspectRatio: "var(--r-card-aspect)",
        borderRadius: "var(--r-radius)",
        background: isGlass ? "var(--r-surface)" : `linear-gradient(150deg, hsl(${title.hue} 55% 20%), hsl(${title.hue2} 50% 12%))`,
        border: `1px solid var(--r-border)`,
        boxShadow: hovered ? "var(--r-shadow-lg)" : isSoft ? "var(--r-shadow)" : "none",
        backdropFilter: isGlass ? `blur(var(--r-blur))` : undefined,
        transform: hovered ? (isSoft ? "scale(0.98)" : "scale(1.06) translateY(-4px)") : "scale(1)",
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(150deg, hsl(${title.hue} 60% 26%), hsl(${title.hue2} 55% 14%))`,
          animation: isGlitch && hovered ? "glitchShift 0.5s steps(6) infinite" : undefined,
        }}
      >
        {title.poster && (
          <img
            src={title.poster}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
        )}
      </div>

      {isChrome && (
        <div
          className="pointer-events-none absolute inset-0 bg-[length:220%_220%] opacity-0 group-hover:opacity-70"
          style={{
            backgroundImage: "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
            animation: hovered ? "shimmer 1.4s linear infinite" : undefined,
          }}
        />
      )}

      {isMaterial &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute h-4 w-4 rounded-full"
            style={{ left: r.x - 8, top: r.y - 8, background: "rgba(255,255,255,0.6)", animation: "rippleOut 0.6s ease-out forwards" }}
          />
        ))}

      <div className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.5)", color: "var(--r-accent-2)" }}>
        {title.match}% Match
      </div>

      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 transition-all duration-300"
        style={{
          background: "linear-gradient(0deg, rgba(0,0,0,0.85), transparent)",
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0.92,
        }}
      >
        <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--r-font-heading)" }}>
          {title.title}
        </span>
        <span className="text-[11px] text-white/60">{title.duration} · {title.rating}</span>
        <div
          className="mt-1 flex items-center gap-2 overflow-hidden transition-all duration-300"
          style={{ maxHeight: hovered ? "24px" : "0px", opacity: hovered ? 1 : 0 }}
        >
          <button className="grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] text-black">▶</button>
          <button className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-[10px] text-white">＋</button>
          <button className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-[10px] text-white">ⓘ</button>
        </div>
      </div>
    </div>
  );
}
