import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";

type Profile = { name: string; gradient: [string, string] };

const PROFILES: Profile[] = [
  { name: "Alex", gradient: ["#60a5fa", "#a78bfa"] },
  { name: "Sam", gradient: ["#34d399", "#60a5fa"] },
  { name: "Jordan", gradient: ["#f472b6", "#a78bfa"] },
  { name: "Kids", gradient: ["#fbbf24", "#f472b6"] },
];

export default function WhoIsWatching({ onSelect }: { onSelect: () => void }) {
  const style = useTheme();
  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (name: string) => {
    setPicked(name);
    setTimeout(onSelect, 550);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{
        background: "var(--r-bg)",
        backgroundImage: "var(--r-bg-image)",
      }}
    >
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--r-font-heading)", color: "var(--r-text)" }}
          >
            Who's Watching?
          </motion.h1>

          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8">
            {PROFILES.map((p, i) => {
              const isPicked = picked === p.name;
              const isOther = picked !== null && !isPicked;
              return (
                <motion.button
                  key={p.name}
                  onClick={() => !picked && handlePick(p.name)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isOther ? 0.25 : 1,
                    y: 0,
                    scale: isPicked ? 0.9 : 1,
                  }}
                  transition={{ duration: 0.4, delay: picked ? 0 : 0.08 * i, ease: "easeOut" }}
                  whileHover={!picked ? { scale: 1.06 } : undefined}
                  whileTap={!picked ? { scale: 0.96 } : undefined}
                  className="group flex flex-col items-center gap-3"
                >
                  <div
                    className="relative h-24 w-24 overflow-hidden sm:h-32 sm:w-32"
                    style={{
                      borderRadius: "var(--r-radius-lg)",
                      background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                      boxShadow: "var(--r-shadow)",
                      border: "2px solid transparent",
                      backdropFilter: `blur(var(--r-blur))`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        border: `2px solid var(--r-text)`,
                        borderRadius: "var(--r-radius-lg)",
                      }}
                    />
                    {isPicked && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.35)" }}
                      >
                        <div
                          className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
                          style={{ borderTopColor: "var(--r-text)", borderRightColor: "var(--r-text)" }}
                        />
                      </motion.div>
                    )}
                  </div>
                  <span
                    className="text-sm font-medium sm:text-base"
                    style={{ color: isPicked ? "var(--r-text)" : "var(--r-text-muted)", fontFamily: "var(--r-font-body)" }}
                  >
                    {p.name}
                  </span>
                </motion.button>
              );
            })}

            <motion.button
              onClick={() => {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: picked ? 0.25 : 1, y: 0 }}
              transition={{ duration: 0.4, delay: picked ? 0 : 0.08 * PROFILES.length, ease: "easeOut" }}
              whileHover={!picked ? { scale: 1.06 } : undefined}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="grid h-24 w-24 place-items-center text-3xl sm:h-32 sm:w-32"
                style={{
                  borderRadius: "var(--r-radius-lg)",
                  background: "var(--r-surface)",
                  border: "1px solid var(--r-border)",
                  color: "var(--r-text-muted)",
                  backdropFilter: `blur(var(--r-blur))`,
                }}
              >
                +
              </div>
              <span className="text-sm font-medium sm:text-base" style={{ color: "var(--r-text-muted)" }}>
                Add Profile
              </span>
            </motion.button>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: picked ? 0 : 0.7 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-14 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--r-border)",
              color: "var(--r-text-muted)",
            }}
          >
            Manage Profiles
          </motion.button>

      <p className="mt-6 text-[11px]" style={{ color: "var(--r-text-muted)", opacity: 0.6 }}>
        {style.name}
      </p>
    </motion.div>
  );
}
