import qs from "qs";
import { makeAutoObservable, runInAction } from "mobx";

import { kpApi } from "../api/client";
import { MovieShort, MoviesResponse } from "@/api/types";
import { Filters } from "@/types/filters";

export class MoviesStore {
    movies: MovieShort[] = [];
    page = 1;
    pages = 1;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Сброс и загрузка первой страницы
    async fetchFirstPage(filters: Filters) {
        this.page = 1;
        await this.fetchPage(1, filters, true);
    }

    // Подгрузка следующей страницы (для бесконечного скролла)
    async fetchNextPage(filters: Filters) {
        if (this.isLoading || this.page >= this.pages) return;
        await this.fetchPage(this.page + 1, filters);
    }

    // Загрузка страницы
    async fetchPage(page: number, filters: Filters, replace: boolean = false) {
        this.isLoading = true;
        this.error = null;

        try {
            const params: Record<string, unknown> = {
                page,
                limit: 50,
                ...(filters.genres.length && { "genres.name": filters.genres }),
                // Рейтинu от 0 до 10
                "rating.kp": `${filters.rating[0]}-${filters.rating[1]}`,
                year: `${filters.year[0]}-${filters.year[1]}`,
            };

            const { data } = await kpApi.get<MoviesResponse>("movie", {
                params,
                paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
            });

            runInAction(() => {
                console.log(data);
                this.page = data.page;
                this.pages = data.pages;
                this.movies = replace ? data.docs : [...this.movies, ...data.docs];
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
