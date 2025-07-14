// src/pages/MoviePage.tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Box, Typography, CircularProgress, Chip, CardMedia, Button } from "@mui/material";

import StarRateIcon from "@material-ui/icons/StarRate";

import { useStores } from "@/store";

import noPosterImg from "@/assets/img/no-poster.png";

const MoviePage = observer(() => {
    const { id } = useParams(); // /movie/:id
    const { details } = useStores();

    useEffect(() => {
        if (id) details.fetch(id);
        return () => details.reset();
    }, [id]);

    if (details.isLoading || !details.movie)
        return (
            <Box p={4} textAlign="center">
                <CircularProgress />
            </Box>
        );

    if (details.error)
        return (
            <Box p={4}>
                <Typography color="error">{details.error}</Typography>
            </Box>
        );

    const m = details.movie;

    return (
        <Box p={4} display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
            <CardMedia
                component="img"
                image={m.poster?.url ?? noPosterImg}
                alt={m.name ?? m.alternativeName}
                sx={{ width: 300, height: 450, objectFit: "cover", bgcolor: "#eee" }}
            />

            <Box flex={1}>
                <Typography variant="h4" gutterBottom>
                    {m.name ?? m.alternativeName}
                </Typography>

                <Typography variant="body1" gutterBottom color="text.secondary">
                    {m.description || "Описание недоступно."}
                </Typography>

                <Typography variant="h6" mt={2}>
                    <Box component="span" display="flex" alignItems="center">
                        Рейтинг: <StarRateIcon /> {m.rating?.kp?.toFixed(1) ?? "—"}
                    </Box>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Дата выхода: {m.year}
                </Typography>

                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                    {m.genres?.map((g) => (
                        <Chip key={g.name} label={g.name} />
                    ))}
                </Box>

                <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 4 }}>
                    К списку фильмов
                </Button>
            </Box>
        </Box>
    );
});

export default MoviePage;
