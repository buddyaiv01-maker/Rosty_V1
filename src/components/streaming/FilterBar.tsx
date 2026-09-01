import { useTheme } from "../../theme/ThemeContext";
import { FILTER_GENRES } from "../../data/content";

export default function FilterBar({ active, onChange }: { active: string; onChange: (g: string) => void }) {
  const style = useTheme();
  const pill = style.tokens.radius === "999px" || style.motion === "chrome-gloss";

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-2 pt-1 sm:px-8">
      {FILTER_GENRES.map((g) => {
        const isActive = g === active;
        return (
          <button
            key={g}
            onClick={() => onChange(g)}
            className="shrink-0 whitespace-nowrap px-4 py-1.5 text-xs font-semibold transition-colors sm:text-sm"
            style={{
              borderRadius: pill ? "999px" : "var(--r-radius)",
              background: isActive ? "var(--r-accent)" : "var(--r-surface-alt)",
              color: isActive ? "var(--r-bg)" : "var(--r-text-muted)",
              border: `1px solid ${isActive ? "var(--r-accent)" : "var(--r-border)"}`,
            }}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}
