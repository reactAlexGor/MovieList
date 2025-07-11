export interface MovieShort {
    id: number;
    name: string;
    year: number;
    poster?: { url: string };
    rating?: { kp: number };
}

export interface MoviesResponse {
    docs: MovieShort[];
    page: number;
    pages: number;
    limit: number;
}
