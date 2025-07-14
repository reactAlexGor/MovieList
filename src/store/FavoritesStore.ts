import { makeAutoObservable, reaction } from "mobx";
import type { MovieShort } from "@/api/types";
export class FavoritesStore {
    // Map<id, MovieShort> для быстрого has(id)
    items = new Map<number, MovieShort>();

    constructor() {
        makeAutoObservable(this);

        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            const arr: MovieShort[] = JSON.parse(raw);
            arr.forEach((m) => this.items.set(m.id, m));
        }

        // Отслеживаем изменения в items и сохраняем их в localStorage
        reaction(
            () => Array.from(this.items.values()),
            (arr) => localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)),
        );
    }

    has(id: number) {
        return this.items.has(id);
    }

    // Вызывается после подтверждения модалки
    add(movie: MovieShort) {
        this.items.set(movie.id, movie);
    }

    remove(id: number) {
        this.items.delete(id);
    }
}

const STORAGE_KEY = "favoriteMovies";
