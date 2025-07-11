import { createBrowserRouter } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import FavoritesPage from "./pages/FavoritesPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MoviesPage />,
    },
    {
        path: "/movie/:id",
        element: <MoviePage />,
    },
    {
        path: "/favorites",
        element: <FavoritesPage />,
    },
]);
