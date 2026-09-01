export default function Footer() {
  return (
    <footer
      className="mt-10 flex flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-8"
      style={{ borderTop: "1px solid var(--r-border)", color: "var(--r-text-muted)" }}
    >
      <span className="text-lg font-extrabold" style={{ fontFamily: "var(--r-font-heading)", color: "var(--r-accent)" }}>
        Rosty
      </span>
      <div className="flex gap-5 text-xs font-medium">
        <span>Help</span>
        <span>Terms</span>
        <span>About</span>
      </div>
      <div className="flex gap-3 text-xs">
        <span>◎</span>
        <span>▣</span>
        <span>✦</span>
      </div>
    </footer>
  );
}
