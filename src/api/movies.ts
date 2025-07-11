import { kpApi } from "./client";
import type { MoviesResponse } from "./types";

export interface MovieFilters {
    page?: number;
    limit?: number; // по ТЗ — 50
    year?: string; // например, "1990-2000"
    rating?: string; // "6-10"
    genres?: string[]; // ["драма","комедия"]
}

export async function getMovies({ page = 1, limit = 50, ...rest }: MovieFilters = {}): Promise<MoviesResponse> {
    const { data } = await kpApi.get<MoviesResponse>("/movie", {
        params: { page, limit, ...rest },
    });
    return data;
}
