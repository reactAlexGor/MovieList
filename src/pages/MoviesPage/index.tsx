import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";

import MovieCard from "@/components/MovieCard";
import FiltersForm from "@/components/FiltersForm";

import { useStores } from "@/store";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Filters } from "@/types/filters";
import { paramsToFilters, filtersToParams } from "@/utils/filtersUrl";

const MoviesPage = observer(() => {
    const { movies: ms } = useStores();
    const [searchParams, setSearchParams] = useSearchParams();

    // Преобразуем параметры URL в фильтры
    const filters: Filters = useMemo(
        () => paramsToFilters(searchParams),
        [searchParams.toString()], // ⬅️ строка меняется только когда URL реально меняется
    );

    // Первый запрос для загрузки фильмов
    useEffect(() => {
        ms.fetchFirstPage(filters);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [filters]); // Если фильтр изменится, обновляем список фильмов

    // sentinel для IntersectionObserver
    const sentinelRef = useInfiniteScroll(() => {
        ms.fetchNextPage(filters);
    });

    const handleApply = (newFilters: Filters) => {
        // Пишем новую строку запроса. Триггерим useEffect выше
        setSearchParams(filtersToParams(newFilters));
    };

    // Если данные загружаются, но нет фильмов, показываем индикатор загрузки
    if (ms.isLoading && ms.movies.length === 0) {
        return (
            <Box p={4} textAlign="center">
                <CircularProgress />
            </Box>
        );
    }

    // Если есть ошибка, показываем сообщение об ошибке
    if (ms.error) {
        return (
            <Box p={4}>
                <Typography color="error">{ms.error}</Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <FiltersForm filters={filters} onApply={handleApply} />

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
