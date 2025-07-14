import { FavoritesStore } from "./FavoritesStore";
import { MovieDetailsStore } from "./MovieDetailsStroe";
import { MoviesStore } from "./MoviesStore";

export class RootStore {
    movies: MoviesStore;
    details: MovieDetailsStore;
    favorites: FavoritesStore;

    constructor() {
        this.movies = new MoviesStore();
        this.details = new MovieDetailsStore();
        this.favorites = new FavoritesStore();
    }
}

export const rootStore = new RootStore();
