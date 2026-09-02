import { useState } from "react";
import { motion } from "framer-motion";
import type { Title } from "../../data/content";

function formatTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VerticalSlider({ icon, value, onChange }: { icon: string; value: number; onChange: (v: number) => void }) {
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = 100 - ((e.clientY - rect.top) / rect.height) * 100;
    onChange(Math.min(100, Math.max(0, Math.round(pct))));
  };

  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-4 backdrop-blur-md">
      <span className="text-sm text-white/80">{icon}</span>
      <div onClick={handleDrag} className="relative h-28 w-1.5 cursor-pointer rounded-full bg-white/15">
        <div
          className="absolute bottom-0 w-full rounded-full"
          style={{ height: `${value}%`, background: "linear-gradient(0deg, #6366f1, #a78bfa)" }}
        />
        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
          style={{ left: "50%", bottom: `${value}%` }}
        />
      </div>
      <span className="text-[11px] text-white/60">{value}%</span>
    </div>
  );
}

export default function PlayerScreen({
  title,
  upNext,
  onClose,
  onSwitch,
}: {
  title: Title;
  upNext: Title[];
  onClose: () => void;
  onSwitch: (t: Title) => void;
}) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(27);
  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);
  const [showSettings, setShowSettings] = useState(false);

  const durationSec = 7122; // ~1h58m, matches reference mock
  const currentSec = Math.round((progress / 100) * durationSec);

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
      className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ background: "#0a0e17" }}
    >
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        {title.poster ? (
          <img src={title.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(140deg, hsl(${title.hue} 45% 25%), hsl(${title.hue2} 40% 12%))` }}
          />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #0a0e17 2%, rgba(10,14,23,0.15) 35%, rgba(10,14,23,0.35) 100%)" }} />

        {/* top bar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <div
              className="grid h-9 w-9 place-items-center rounded-lg text-sm font-extrabold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }}
            >
              R
            </div>
            <span className="text-lg font-extrabold text-white">Rosty</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md">
            <span>▶</span>
            {title.title}
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-black/45"
          >
            ‹ Back to Browse
          </button>
        </div>

        {/* side sliders */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <VerticalSlider icon="☀" value={brightness} onChange={setBrightness} />
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <VerticalSlider icon="🔊" value={volume} onChange={setVolume} />
        </div>

        {/* center play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="grid h-24 w-24 place-items-center rounded-full border border-white/25 bg-white/10 text-3xl text-white backdrop-blur-md transition-transform hover:scale-105"
            style={{ boxShadow: "0 0 60px rgba(99,102,241,0.35)" }}
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>

        {/* settings panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-28 right-6 w-72 rounded-2xl border border-white/10 bg-[#11141c]/95 p-2 text-sm text-white/90 shadow-2xl backdrop-blur-md sm:right-10"
          >
            {[
              { icon: "HD", label: "Quality", value: "1080p" },
              { icon: "◷", label: "Playback Speed", value: "1.0x" },
              { icon: "▤", label: "Subtitles", value: "English" },
              { icon: "♪", label: "Audio", value: "English" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/5">
                <div className="flex items-center gap-3">
                  <span className="grid h-6 w-8 place-items-center rounded text-[10px] font-bold" style={{ background: "rgba(255,255,255,0.1)" }}>
                    {row.icon}
                  </span>
                  <span>{row.label}</span>
                </div>
                <span className="flex items-center gap-1 text-white/60">
                  {row.value} <span>›</span>
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-white/5">
              <div className="flex items-center gap-3">
                <span className="grid h-6 w-8 place-items-center rounded text-[10px]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  ☀
                </span>
                <span>Ambient Mode</span>
              </div>
              <span className="h-5 w-9 rounded-full p-0.5" style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}>
                <span className="block h-4 w-4 translate-x-4 rounded-full bg-white" />
              </span>
            </div>
          </motion.div>
        )}

        {/* control bar */}
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md sm:inset-x-10 sm:p-5">
          <div className="mb-2 flex items-center gap-3 text-xs text-white/70">
            <span className="tabular-nums">{formatTime(currentSec)}</span>
            <div onClick={handleScrub} className="group relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/20">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #6366f1, #a78bfa)" }}
              />
              <div
                className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                style={{ left: `${progress}%` }}
              />
            </div>
            <span className="tabular-nums">{formatTime(durationSec)}</span>
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4 text-lg">
              <button onClick={() => setPlaying((p) => !p)} aria-label="Play/pause">
                {playing ? "❚❚" : "▶"}
              </button>
              <button aria-label="Previous" className="text-base">
                ⏮
              </button>
              <button aria-label="Next" className="text-base">
                ⏭
              </button>
              <button aria-label="Mute" className="text-base">
                🔊
              </button>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <button aria-label="Captions" className="text-base">
                ▤
              </button>
              <button
                onClick={() => setShowSettings((v) => !v)}
                aria-label="Settings"
                className="grid h-8 w-8 place-items-center rounded-full text-base transition-colors"
                style={{ background: showSettings ? "rgba(99,102,241,0.35)" : "transparent" }}
              >
                ⚙
              </button>
              <button aria-label="Picture in picture" className="text-base">
                ▣
              </button>
              <button aria-label="Fullscreen" className="text-base">
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* info + up next */}
      <div className="px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{title.title}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/50">
              <span>{title.year}</span>
              <span>·</span>
              <span>{title.genres.join(", ")}</span>
              <span>·</span>
              <span>{title.duration}</span>
              <span className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white/70">HD</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{title.longSynopsis}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              ＋ My List
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10">
              ↗
            </button>
          </div>
        </div>

        {upNext.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-base font-bold text-white">Up Next</h2>
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
              {upNext.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSwitch(t)}
                  className="group w-48 shrink-0 text-left"
                >
                  <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
                    {t.poster ? (
                      <img src={t.poster} alt="" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div
                        className="h-full w-full"
                        style={{ background: `linear-gradient(150deg, hsl(${t.hue} 50% 25%), hsl(${t.hue2} 45% 12%))` }}
                      />
                    )}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{t.title}</p>
                  <p className="text-xs text-white/50">{t.duration}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
