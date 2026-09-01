import { useEffect, useState } from "react";
import { ThemeContext, cssVars } from "../../theme/ThemeContext";
import type { StyleConfig } from "../../data/styles";
import { buildRows, loadTitles, type Title } from "../../data/content";
import NavBar from "./NavBar";
import HuluHero from "./HuluHero";
import FilterBar from "./FilterBar";
import HuluRow from "./HuluRow";
import BrandRow from "./BrandRow";
import Footer from "./Footer";
import DetailModal from "./DetailModal";

export default function StreamingPage({ style }: { style: StyleConfig }) {
  const [titles, setTitles] = useState<Title[] | null>(null);
  const [genre, setGenre] = useState("All");
  const [selected, setSelected] = useState<Title | null>(null);

  useEffect(() => {
    loadTitles().then(setTitles);
  }, []);

  if (!titles) {
    return (
      <div
        className="grid min-h-screen place-items-center"
        style={{ ...cssVars(style), background: "var(--r-bg)", color: "var(--r-text-muted)" }}
      >
        Loading…
      </div>
    );
  }

  const rows = buildRows(titles);
  const featured = titles[0];
  const filteredRows =
    genre === "All" ? rows : rows.map((r) => ({ ...r, titles: r.titles.filter((t) => t.genres.includes(genre)) }));
  const huluRows = filteredRows.length ? [{ ...filteredRows[0], label: "Live Now" }, ...filteredRows.slice(1)] : filteredRows;

  return (
    <ThemeContext.Provider value={style}>
      <div
        data-style={style.slug}
        className="min-h-screen"
        style={{
          ...cssVars(style),
          background: "var(--r-bg)",
          backgroundImage: "var(--r-bg-image)",
          color: "var(--r-text)",
          fontFamily: "var(--r-font-body)",
        }}
      >
        <NavBar />
        <HuluHero title={featured} onOpen={setSelected} />
        <BrandRow />
        <FilterBar active={genre} onChange={setGenre} />

        {huluRows.map((r) => (r.titles.length ? <HuluRow key={r.label} row={r} onOpen={setSelected} /> : null))}

        <Footer />
        <DetailModal title={selected} onClose={() => setSelected(null)} similar={titles.slice(0, 6)} />
      </div>
    </ThemeContext.Provider>
  );
}
