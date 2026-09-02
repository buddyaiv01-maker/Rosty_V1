import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";

const DEFAULT_LINKS = ["Home", "Movies", "Series", "My List"];

function PillNav({ links }: { links: string[] }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState(links[0]);
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null);

  const handleClick = (l: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setActive(l);
    const btn = e.currentTarget;
    setBurst({ id: Date.now(), x: btn.offsetLeft + btn.offsetWidth / 2, y: btn.offsetTop + btn.offsetHeight / 2 });
  };

  return (
    <div
      className="relative flex items-center gap-1 rounded-full px-2 py-2"
      style={{
        background: "var(--r-surface)",
        backdropFilter: `blur(var(--r-blur))`,
        border: "1px solid var(--r-border)",
        boxShadow: "var(--r-shadow)",
      }}
    >
      {searchOpen ? (
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => setSearchOpen(false)}
          placeholder="Search..."
          className="w-32 border-none bg-transparent px-3 py-1.5 text-sm outline-none"
          style={{ color: "var(--r-text)" }}
        />
      ) : (
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base"
          style={{ color: "var(--r-text-muted)" }}
        >
          ⌕
        </motion.button>
      )}

      {links.map((l, i) => {
        const isActive = active === l;
        return (
          <motion.button
            key={l}
            onClick={(e) => handleClick(l, e)}
            whileTap={{ scale: 0.93 }}
            className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium sm:px-4 ${i === 0 ? "block" : "hidden sm:block"}`}
            style={{
              color: isActive ? "var(--r-bg)" : "var(--r-text-muted)",
              fontWeight: isActive ? 600 : 500,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="pill-active-bg"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--r-text)" }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </motion.button>
        );
      })}

      <AnimatePresence>
        {burst && (
          <motion.span
            key={burst.id}
            initial={{ opacity: 0.5, scale: 0.3 }}
            animate={{ opacity: 0, scale: 2.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onAnimationComplete={() => setBurst(null)}
            className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "var(--r-accent)", left: burst.x, top: burst.y }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function NavBar() {
  const style = useTheme();
  const links = style.navLinks ?? DEFAULT_LINKS;
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const chrome = style.motion === "chrome-gloss";
  const neon = style.motion === "glitch-scan" || style.motion === "vhs-glow";

  if (style.navVariant === "pill") {
    return (
      <nav
        className="sticky top-0 z-40 relative flex items-center justify-between gap-4 px-5 py-4 backdrop-blur-md sm:px-8"
        style={{ background: `color-mix(in srgb, var(--r-bg) 55%, transparent)` }}
      >
        <span
          className="text-lg font-extrabold"
          style={{ fontFamily: "var(--r-font-heading)", letterSpacing: "var(--r-tracking-heading)", color: "var(--r-accent)" }}
        >
          Rosty
        </span>
        <div className="absolute left-1/2 -translate-x-1/2">
          <PillNav links={links} />
        </div>
        <div
          className="h-8 w-8 shrink-0 rounded-full"
          style={{ background: `linear-gradient(135deg, var(--r-accent), var(--r-accent-2))`, boxShadow: "var(--r-shadow)" }}
        />
      </nav>
    );
  }

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between gap-4 px-5 py-4 backdrop-blur-md sm:px-8"
      style={{
        background: `color-mix(in srgb, var(--r-bg) 78%, transparent)`,
        borderBottom: `1px solid var(--r-border)`,
      }}
    >
      <div className="flex items-center gap-8">
        <span
          className="text-xl font-extrabold"
          style={{
            fontFamily: "var(--r-font-heading)",
            letterSpacing: "var(--r-tracking-heading)",
            color: "var(--r-accent)",
            textShadow: neon ? "0 0 12px var(--r-accent), 0 0 26px var(--r-accent-2)" : "none",
          }}
        >
          Rosty
        </span>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <span
              key={l}
              className="cursor-pointer text-sm font-medium transition-colors"
              style={{ color: "var(--r-text-muted)", fontFamily: "var(--r-font-body)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--r-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--r-text-muted)")}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center">
          {searchOpen ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setSearchOpen(false)}
              placeholder="Search titles..."
              className="w-36 border-none px-3 py-1.5 text-sm outline-none sm:w-56"
              style={{
                background: "var(--r-surface-alt)",
                color: "var(--r-text)",
                borderRadius: chrome ? "999px" : "var(--r-radius)",
              }}
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-9 w-9 place-items-center text-lg"
              style={{
                background: "var(--r-surface-alt)",
                color: "var(--r-text)",
                borderRadius: chrome ? "999px" : "var(--r-radius)",
              }}
            >
              ⌕
            </button>
          )}
        </div>
        <div
          className="h-8 w-8 shrink-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, var(--r-accent), var(--r-accent-2))`,
            boxShadow: "var(--r-shadow)",
          }}
        />
      </div>
    </nav>
  );
}
