import { useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import type { Row, Title } from "../../data/content";

function HuluCard({ title, onOpen }: { title: Title; onOpen: (t: Title) => void }) {
  const style = useTheme();
  const [hovered, setHovered] = useState(false);
  const isSoft = style.motion === "soft-press";
  const isMaterial = style.motion === "ripple-elevate";
  const isGlass = style.motion === "glass-morph";

  return (
    <div
      onClick={() => onOpen(title)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative shrink-0 cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        width: "clamp(170px, 20vw, 240px)",
        aspectRatio: "16/9",
        borderRadius: isMaterial ? "4px" : "var(--r-radius)",
        border: "1px solid var(--r-border)",
        boxShadow: hovered ? "var(--r-shadow-lg)" : isSoft ? "var(--r-shadow)" : "none",
        backdropFilter: isGlass ? `blur(var(--r-blur))` : undefined,
        transform: hovered ? (isSoft ? "scale(0.98)" : "scale(1.04) translateY(-3px)") : "scale(1)",
        zIndex: hovered ? 10 : 1,
      }}
    >
      {title.poster ? (
        <img src={title.poster} alt="" className="h-full w-full object-cover" />
      ) : (
        <div
          className="h-full w-full"
          style={{ background: `linear-gradient(150deg, hsl(${title.hue} 55% 22%), hsl(${title.hue2} 50% 12%))` }}
        />
      )}

      <button
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-xs opacity-0 transition-opacity group-hover:opacity-100"
        style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
        onClick={(e) => e.stopPropagation()}
      >
        ⋮
      </button>

      <span
        className="absolute bottom-2 left-2 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide"
        style={{ background: "rgba(0,0,0,0.55)", color: "var(--r-accent)" }}
      >
        Rosty
      </span>

      <div
        className="pointer-events-none absolute inset-0 flex items-end p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent 60%)" }}
      >
        <span className="text-xs font-bold text-white">{title.title}</span>
      </div>
    </div>
  );
}

export default function HuluRow({ row, onOpen, viewAllLabel }: { row: Row; onOpen: (t: Title) => void; viewAllLabel?: string }) {
  return (
    <section className="px-5 py-4 sm:px-8">
      <div className="mb-3 flex items-center gap-3">
        <h2
          className="text-base font-bold sm:text-lg"
          style={{ fontFamily: "var(--r-font-heading)", color: "var(--r-text)" }}
        >
          {row.label}
        </h2>
        <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--r-text-muted)" }}>
          {viewAllLabel ?? "View All"} ›
        </button>
      </div>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3">
        {row.titles.map((t) => (
          <HuluCard key={t.id} title={t} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
