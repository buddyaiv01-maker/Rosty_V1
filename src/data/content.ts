export type Title = {
  id: string;
  title: string;
  synopsis: string;
  longSynopsis: string;
  genres: string[];
  duration: string;
  rating: string;
  match: number;
  cast: string[];
  hue: number;
  hue2: number;
  poster?: string;
  year?: string;
  isSeries?: boolean;
};

type OmdbEntry = {
  id: string;
  title: string;
  year: string;
  type: string;
  rated: string;
  runtime: string;
  genres: string[];
  actors: string[];
  synopsis: string;
  imdbRating: string;
  totalSeasons: string | null;
  poster: string | null;
};

function hashHue(seed: string, offset = 0): number {
  let h = offset;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 360;
}

function resolvePoster(poster: string | null): string | undefined {
  if (!poster) return undefined;
  return `${import.meta.env.BASE_URL}${poster.replace(/^\//, "")}`;
}

function fromOmdb(e: OmdbEntry): Title {
  const matchBase = Number.parseFloat(e.imdbRating);
  const match = Number.isFinite(matchBase) ? Math.round(matchBase * 10) : 80;
  return {
    id: e.id,
    title: e.title,
    synopsis: e.synopsis?.length > 140 ? e.synopsis.slice(0, 137) + "…" : e.synopsis || "",
    longSynopsis: e.synopsis || "",
    genres: e.genres.length ? e.genres : ["Drama"],
    duration: e.type === "series" ? `${e.totalSeasons ?? "1"} Season${e.totalSeasons === "1" ? "" : "s"}` : e.runtime,
    rating: e.rated && e.rated !== "N/A" ? e.rated : "NR",
    match: Math.min(99, Math.max(60, match)),
    cast: e.actors,
    hue: hashHue(e.id, 7),
    hue2: hashHue(e.id, 131),
    poster: resolvePoster(e.poster),
    year: e.year?.replace(/[–-].*/, ""),
    isSeries: e.type === "series",
  };
}

// --- Placeholder fallback generator (used until public/data/db.json exists) ---

const NAME_PARTS_A = [
  "Silent", "Neon", "Last", "Hollow", "Crimson", "Northern", "Broken", "Glass",
  "Wandering", "Static", "Velvet", "Iron", "Quiet", "Distant", "Paper", "Amber",
  "Faded", "Endless", "Midnight", "Salt",
];
const NAME_PARTS_B = [
  "Signal", "Harbor", "Circuit", "Garden", "Horizon", "Machine", "River", "Echo",
  "District", "Season", "Orbit", "Archive", "Frontier", "Static", "Grove", "Tide",
  "Compass", "Wire", "Bloom", "Vault",
];
const GENRE_POOL = [
  "Action", "Drama", "Sci-Fi", "Comedy", "Thriller", "Romance", "Documentary",
  "Fantasy", "Mystery", "Crime", "Animation", "Horror",
];
const CAST_FIRST = ["Rene", "Kobi", "Sana", "Theo", "Marlow", "Ines", "Aris", "Dev", "Nia", "Colton"];
const CAST_LAST = ["Voss", "Amara", "Kessler", "Onho", "Bright", "Delacroix", "Marsh", "Iyer", "Lund", "Reyes"];

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return function () {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function makeTitle(seed: number): Title {
  const rand = seededRandom(seed);
  const title = `${pick(NAME_PARTS_A, rand)} ${pick(NAME_PARTS_B, rand)}`;
  const genres = Array.from(new Set([pick(GENRE_POOL, rand), pick(GENRE_POOL, rand)]));
  const isSeries = rand() > 0.5;
  const cast = Array.from({ length: 4 }, () => `${pick(CAST_FIRST, rand)} ${pick(CAST_LAST, rand)}`);
  return {
    id: `t${seed}`,
    title,
    synopsis: `A ${genres[0].toLowerCase()} story of two strangers pulled into a conflict neither of them chose.`,
    longSynopsis: `When a quiet discovery unravels years of buried history, an unlikely group must decide how far they'll go to protect what's left. Set across shifting timelines, this ${genres.join(" / ").toLowerCase()} tale balances intimate character drama with sweeping consequence.`,
    genres,
    duration: isSeries ? `${1 + Math.floor(rand() * 4)} Seasons` : `${1 + Math.floor(rand() * 2)}h ${10 + Math.floor(rand() * 49)}m`,
    rating: pick(["PG-13", "TV-14", "TV-MA", "R", "PG"], rand),
    match: 72 + Math.floor(rand() * 27),
    cast,
    hue: Math.floor(rand() * 360),
    hue2: Math.floor(rand() * 360),
    year: String(1995 + Math.floor(rand() * 30)),
    isSeries,
  };
}

const PLACEHOLDER_TITLES: Title[] = Array.from({ length: 60 }, (_, i) => makeTitle(i + 1));

export const FILTER_GENRES = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Thriller", "Documentary", "Fantasy"];

export type Row = { label: string; titles: Title[] };

export function buildRows(titles: Title[]): Row[] {
  const byGenre = (g: string) => titles.filter((t) => t.genres.includes(g));
  const rows: Row[] = [
    { label: "Trending Now", titles: titles.slice(0, 10) },
    { label: "Continue Watching", titles: titles.slice(10, 18).length ? titles.slice(10, 18) : titles.slice(0, 8) },
    {
      label: `Because You Watched ${titles[0]?.title ?? "Something Great"}`,
      titles: byGenre(titles[0]?.genres[0] ?? "Drama").slice(0, 10),
    },
    { label: "New Releases", titles: titles.slice(18, 30).length ? titles.slice(18, 30) : titles.slice(0, 10) },
    { label: "Critically Acclaimed", titles: [...titles].sort((a, b) => b.match - a.match).slice(0, 10) },
  ];
  return rows.filter((r) => r.titles.length > 0);
}

let cache: Title[] | null = null;

export async function loadTitles(): Promise<Title[]> {
  if (cache) return cache;
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/db.json`);
    if (!res.ok) throw new Error("no db");
    const json = await res.json();
    const entries: OmdbEntry[] = json.titles ?? [];
    if (!entries.length) throw new Error("empty db");
    cache = entries.map(fromOmdb);
    return cache;
  } catch {
    cache = PLACEHOLDER_TITLES;
    return cache;
  }
}
