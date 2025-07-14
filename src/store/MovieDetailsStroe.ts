import { makeAutoObservable, runInAction } from "mobx";
import { getMovieById } from "@/api/movies";
import type { MovieFull } from "@/api/types";

export class MovieDetailsStore {
    movie: MovieFull | null = null;
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetch(id: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await getMovieById(id);
            runInAction(() => (this.movie = data));
        } catch (e) {
            runInAction(() => {
                this.error = e instanceof Error ? e.message : "Ошибка запроса";
            });
        } finally {
            runInAction(() => (this.isLoading = false));
        }
    }

    reset() {
        this.movie = null;
        this.error = null;
    }
}
