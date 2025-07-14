import { kpApi } from "./client";
import type { MoviesResponse } from "./types";
import type { MovieFull } from "@/api/types";

export interface MovieFilters {
    page?: number;
    limit?: number; // 50
    year?: [number, number]; // 1990-2000"
    rating?: [number, number]; // 6-10
    genres?: string[]; // ["драма","комедия"]
}

export const getMovies = async ({ page = 1, limit = 50, ...rest }: MovieFilters = {}) => {
    const { data } = await kpApi.get<MoviesResponse>("/movie", { params: { page, limit, ...rest } });
    return data;
};

export const getMovieById = async (id: string | number) => kpApi.get<MovieFull>(`movie/${id}`).then((r) => r.data);
