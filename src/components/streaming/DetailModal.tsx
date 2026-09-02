import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";
import type { Title } from "../../data/content";

export default function DetailModal({
  title,
  onClose,
  onPlay,
  similar,
}: {
  title: Title | null;
  onClose: () => void;
  onPlay: (t: Title) => void;
  similar: Title[];
}) {
  const style = useTheme();
  const isGlass = style.motion === "glass-morph" || style.motion === "blur-parallax";

  return (
    <AnimatePresence>
      {title && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.65)" }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto"
            style={{
              background: "var(--r-surface)",
              backdropFilter: isGlass ? `blur(var(--r-blur))` : undefined,
              border: "1px solid var(--r-border)",
              borderRadius: "var(--r-radius-lg)",
              boxShadow: "var(--r-shadow-lg)",
            }}
          >
            <div
              className="relative flex h-48 items-end overflow-hidden p-6 sm:h-60"
              style={{ background: `linear-gradient(150deg, hsl(${title.hue} 55% 22%), hsl(${title.hue2} 50% 12%))` }}
            >
              {title.poster && (
                <>
                  <img src={title.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.15))" }} />
                </>
              )}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-sm"
                style={{ background: "rgba(0,0,0,0.4)", color: "#fff" }}
              >
                ✕
              </button>
              <h3
                className="text-3xl font-extrabold text-white"
                style={{ fontFamily: "var(--r-font-heading)", letterSpacing: "var(--r-tracking-heading)" }}
              >
                {title.title}
              </h3>
            </div>

            <div className="p-6" style={{ color: "var(--r-text)" }}>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--r-text-muted)" }}>
                <span className="font-bold" style={{ color: "var(--r-accent-2)" }}>{title.match}% Match</span>
                <span>{title.rating}</span>
                <span>{title.duration}</span>
                {title.genres.map((g) => (
                  <span key={g} className="rounded-full px-2 py-0.5" style={{ background: "var(--r-surface-alt)" }}>
                    {g}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-body)" }}>
                {title.longSynopsis}
              </p>
              <p className="mt-4 text-xs" style={{ color: "var(--r-text-muted)" }}>
                <span style={{ color: "var(--r-text)" }}>Cast:</span> {title.cast.join(", ")}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    onPlay(title);
                    onClose();
                  }}
                  className="rounded-full px-5 py-2.5 text-sm font-bold"
                  style={{ background: "var(--r-accent)", color: "var(--r-bg)", borderRadius: "var(--r-radius)" }}
                >
                  ▶ Play
                </button>
                <button
                  className="rounded-full px-5 py-2.5 text-sm font-semibold"
                  style={{ background: "var(--r-surface-alt)", color: "var(--r-text)", borderRadius: "var(--r-radius)", border: "1px solid var(--r-border)" }}
                >
                  ＋ My List
                </button>
              </div>

              <h4 className="mt-8 mb-3 text-sm font-bold" style={{ fontFamily: "var(--r-font-heading)" }}>
                More Like This
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {similar.map((s) => (
                  <div
                    key={s.id}
                    className="aspect-square overflow-hidden"
                    style={{
                      borderRadius: "var(--r-radius)",
                      background: `linear-gradient(150deg, hsl(${s.hue} 55% 22%), hsl(${s.hue2} 50% 12%))`,
                    }}
                  >
                    {s.poster && <img src={s.poster} alt="" className="h-full w-full object-cover" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
