import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";

import MovieCard from "@/components/MovieCard";
import { useStores } from "@/store";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const MoviesPage = observer(() => {
    const { movies: ms } = useStores();

    // Первый запрос для загрузки фильмов
    useEffect(() => {
        ms.fetchFirstPage();
    }, []);

    // sentinel для IntersectionObserver
    const sentinelRef = useInfiniteScroll(() => {
        ms.fetchNextPage();
    });

    if (ms.isLoading && ms.movies.length === 0) {
        return (
            <Box p={4} textAlign="center">
                <CircularProgress />
            </Box>
        );
    }

    if (ms.error) {
        return (
            <Box p={4}>
                <Typography color="error">{ms.error}</Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Grid container spacing={2}>
                {ms.movies.map((movie) => (
                    <Grid item key={movie.id}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {ms.isLoading && (
                <Box mt={4} textAlign="center">
                    <CircularProgress />
                </Box>
            )}
            <div ref={sentinelRef} style={{ height: "1px" }} />
        </Box>
    );
});

export default MoviesPage;
