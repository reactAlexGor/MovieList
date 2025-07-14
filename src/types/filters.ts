export interface Filters {
    genres: string[];
    rating: [number, number];
    year: [number, number];
}

export const DEFAULT_FILTERS: Filters = {
    genres: [],
    rating: [0, 10],
    year: [1990, new Date().getFullYear()],
};
