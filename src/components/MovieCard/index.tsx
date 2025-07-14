import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import type { MovieShort } from "@/api/types";

import FavIcon from "@material-ui/icons/Favorite";
import FavBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarRateIcon from "@material-ui/icons/StarRate";

import noPosterImg from "@/assets/img/no-poster.png";
import { observer } from "mobx-react-lite";
import { useStores } from "@/store";
import { useState } from "react";
import { ConfirmDialog } from "../ConfirmDialog";

interface Props {
    movie: MovieShort;
}

const MovieCard: React.FC<Props> = observer(({ movie }) => {
    const { favorites } = useStores();
    const [open, setOpen] = useState(false);

    const isFav = favorites.has(movie.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault(); // не переходить по ссылке
        if (isFav) {
            favorites.remove(movie.id); // удаляем без подтверждения
        } else {
            setOpen(true); // открыть модал
        }
    };

    return (
        <>
            <Card sx={{ width: 180 }}>
                <CardActionArea component={Link} to={`/movie/${movie.id}`}>
                    <CardMedia
                        component="img"
                        height="270"
                        image={movie.poster?.url ?? noPosterImg}
                        alt={movie.name ? movie.name : movie.alternativeName}
                        sx={{ backgroundColor: "#eee" }}
                    />
                    <CardContent>
                        <Box component="div" display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography variant="subtitle2" component="div" noWrap>
                                {movie.name ? movie.name : movie.alternativeName}
                            </Typography>
                            <IconButton size="small" onClick={handleClick} sx={{ float: "right" }}>
                                {isFav ? <FavIcon style={{ color: "#ff4e4e" }} /> : <FavBorderIcon />}
                            </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            <Box component="span" display="flex" justifyContent="space-between" width="100%">
                                <span>{movie.year}</span>
                                <Box component="span" display="flex" alignItems="center">
                                    <StarRateIcon /> {movie.rating?.kp !== undefined ? movie.rating.kp.toFixed(1) : "—"}
                                </Box>
                            </Box>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <ConfirmDialog
                open={open}
                title="Добавить в избранное?"
                text={movie.name ?? movie.alternativeName}
                onCancel={() => setOpen(false)}
                onConfirm={() => {
                    favorites.add(movie);
                    setOpen(false);
                }}
            />
        </>
    );
});

export default MovieCard;
