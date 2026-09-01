import { useTheme } from "../../theme/ThemeContext";

// Fictional in-network brand pills — echoes the "Disney / Pixar / Marvel / ESPN"
// style row without borrowing any real studio names, marks, or logos.
const BRANDS = ["Rosty Originals", "Nova Pictures", "Atlas Docs", "Comet Kids", "Orbit Sci-Fi", "Rosty Live", "Apex Sports"];

export default function BrandRow() {
  const style = useTheme();
  const isMaterial = style.motion === "ripple-elevate";

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-5 py-5 sm:px-8">
      {BRANDS.map((b) => (
        <div
          key={b}
          className="flex shrink-0 items-center justify-center px-5 py-4 text-center text-xs font-bold uppercase tracking-wide"
          style={{
            background: "var(--r-surface-alt)",
            color: "var(--r-text-muted)",
            border: "1px solid var(--r-border)",
            borderRadius: isMaterial ? "4px" : "var(--r-radius)",
            minWidth: "132px",
          }}
        >
          {b}
        </div>
      ))}
    </div>
  );
}
