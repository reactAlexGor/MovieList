import { makeAutoObservable, runInAction } from "mobx";
import { kpApi } from "../api/client";
import { MovieShort, MoviesResponse } from "@/api/types";
import { MovieFilters } from "@/api/movies";

export class MoviesStore {
    movies: MovieShort[] = [];
    page = 1;
    pages = 1;
    isLoading = false;
    error: string | null = null;
    filters: MovieFilters = {};

    constructor() {
        makeAutoObservable(this);
    }

    /** сброс и загрузка первой страницы */
    async fetchFirstPage(filters: MovieFilters = {}) {
        this.filters = filters;
        this.page = 1;
        this.movies = [];
        await this.fetchPage(1);
    }

    /** подгрузка следующей страницы (для бесконечного скролла) */
    async fetchNextPage() {
        if (this.page >= this.pages) return;
        await this.fetchPage(this.page + 1);
    }

    async fetchPage(page: number) {
        this.isLoading = true;
        this.error = null;
        try {
            const { data } = await kpApi.get<MoviesResponse>("/movie", {
                params: { page, limit: 50, ...this.filters },
            });
            runInAction(() => {
                this.page = data.page;
                this.pages = data.pages;
                this.movies = page === 1 ? data.docs : [...this.movies, ...data.docs];
            });
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка запроса";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}
