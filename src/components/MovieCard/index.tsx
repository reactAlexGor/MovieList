import { Card, CardActionArea, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import type { MovieShort } from "@/api/types";

import noPosterImg from "./assets/no-poster.png";

interface Props {
    movie: MovieShort;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
    return (
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
                    <Typography variant="subtitle2" component="div" gutterBottom noWrap>
                        {movie.name ? movie.name : movie.alternativeName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Box component="span" display="flex" justifyContent="space-between" width="100%">
                            <span>{movie.year}</span>
                            <span>🌟 {movie.rating?.kp !== undefined ? movie.rating.kp.toFixed(1) : "—"}</span>
                        </Box>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MovieCard;
