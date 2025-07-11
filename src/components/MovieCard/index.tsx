import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { MovieShort } from "@/api/types";

interface Props {
    movie: MovieShort;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
    return (
        <Card sx={{ width: 180 }}>
            <CardActionArea component={Link} to={`/movie/${movie.id}`}>
                <CardMedia
                    component="img"
                    height="270"
                    image={movie.poster?.url ?? "/no-poster.jpg"}
                    alt={movie.name}
                    sx={{ backgroundColor: "#eee" }}
                />
                <CardContent>
                    <Typography variant="subtitle2" component="div" gutterBottom noWrap>
                        {movie.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.year} &bull; ⭐ {movie.rating?.kp !== undefined ? movie.rating.kp.toFixed(1) : "—"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
