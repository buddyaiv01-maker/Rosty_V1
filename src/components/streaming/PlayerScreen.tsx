import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import type { Title } from "../../data/content";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PlayerScreen({ title, onClose }: { title: Title; onClose: () => void }) {
  const style = useTheme();
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(18);
  const [showControls, setShowControls] = useState(true);
  const durationSec = 8160; // mock 2h16m runtime
  const currentSec = Math.round((progress / 100) * durationSec);

  const isGlass = style.motion === "glass-morph";

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.min(100, Math.max(0, pct)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
      onMouseMove={() => setShowControls(true)}
      onClick={() => setShowControls((v) => !v)}
    >
      {title.poster ? (
        <img src={title.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(140deg, hsl(${title.hue} 55% 20%), hsl(${title.hue2} 50% 10%))` }}
        />
      )}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />

      <motion.button
        initial={false}
        animate={{ opacity: showControls ? 1 : 0, pointerEvents: showControls ? "auto" : "none" }}
        onClick={(e) => {
          e.stopPropagation();
          setPlaying((p) => !p);
        }}
        className="relative z-10 grid h-20 w-20 place-items-center rounded-full text-3xl"
        style={{
          background: "var(--r-surface)",
          backdropFilter: `blur(var(--r-blur))`,
          border: "1px solid var(--r-border)",
          color: "var(--r-text)",
          boxShadow: "var(--r-shadow-lg)",
        }}
      >
        {playing ? "❚❚" : "▶"}
      </motion.button>

      <motion.div
        initial={false}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 16 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 top-0 z-10 flex items-center gap-4 p-5 sm:p-8"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)" }}
      >
        <button
          onClick={onClose}
          aria-label="Close player"
          className="grid h-10 w-10 place-items-center rounded-full text-lg"
          style={{ background: "var(--r-surface)", backdropFilter: `blur(var(--r-blur))`, color: "var(--r-text)" }}
        >
          ←
        </button>
        <div>
          <h1 className="text-lg font-bold sm:text-xl" style={{ fontFamily: "var(--r-font-heading)", color: "var(--r-text)" }}>
            {title.title}
          </h1>
          <p className="text-xs" style={{ color: "var(--r-text-muted)" }}>
            {title.duration} · {title.rating}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 16 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-5 sm:p-8"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.65), transparent)" }}
      >
        <div
          onClick={handleScrub}
          className="group relative h-1.5 w-full cursor-pointer overflow-visible rounded-full"
          style={{ background: "rgba(255,255,255,0.25)" }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${progress}%`, background: "var(--r-accent)" }}
          />
          <div
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: `${progress}%`, background: "var(--r-text)" }}
          />
        </div>

        <div className="flex items-center justify-between text-xs" style={{ color: "var(--r-text-muted)" }}>
          <span>
            {formatTime(currentSec)} / {formatTime(durationSec)}
          </span>

          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaying((p) => !p);
              }}
              className="text-lg"
              style={{ color: "var(--r-text)" }}
              aria-label="Play/pause"
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button className="text-sm font-semibold" style={{ color: "var(--r-text)" }} aria-label="Volume">
              🔊
            </button>
            <button
              className="rounded px-2 py-1 text-[11px] font-bold uppercase tracking-wide"
              style={{ border: "1px solid var(--r-border)", color: "var(--r-text)", backdropFilter: isGlass ? `blur(var(--r-blur))` : undefined }}
              aria-label="Subtitles"
            >
              CC
            </button>
            <button className="text-sm" style={{ color: "var(--r-text)" }} aria-label="Fullscreen">
              ⛶
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
