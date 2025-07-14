import { Filters, DEFAULT_FILTERS } from "@/types/filters";

export function paramsToFilters(p: URLSearchParams): Filters {
    return {
        genres: p.getAll("genres"),
        rating: [
            Number(p.get("ratingFrom") ?? DEFAULT_FILTERS.rating[0]),
            Number(p.get("ratingTo") ?? DEFAULT_FILTERS.rating[1]),
        ],
        year: [
            Number(p.get("yearFrom") ?? DEFAULT_FILTERS.year[0]),
            Number(p.get("yearTo") ?? DEFAULT_FILTERS.year[1]),
        ],
    };
}

export function filtersToParams(f: Filters): URLSearchParams {
    const p = new URLSearchParams();
    f.genres.forEach((g) => p.append("genres", g));
    p.set("ratingFrom", String(f.rating[0]));
    p.set("ratingTo", String(f.rating[1]));
    p.set("yearFrom", String(f.year[0]));
    p.set("yearTo", String(f.year[1]));
    return p;
}
