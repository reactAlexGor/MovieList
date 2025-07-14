export interface MovieShort {
    id: number;
    name: string;
    alternativeName: string;
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

export interface Genre {
    id: number;
    name: string;
}

export interface Poster {
    url: string;
    previewUrl?: string;
}

export interface Rating {
    kp?: number;
    imdb?: number;
}

export interface MovieFull {
    id: number;
    name: string;
    alternativeName: string;
    year: number;
    poster?: Poster;
    rating?: Rating;
    genres?: Genre[];
    description?: string;
}
