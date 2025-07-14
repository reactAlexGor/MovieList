import { observer } from "mobx-react-lite";
import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import MovieCard from "@/components/MovieCard";
import { useStores } from "@/store";

const FavoritesPage = observer(() => {
    const { favorites } = useStores();
    const list = Array.from(favorites.items.values());

    return (
        <Box p={4}>
            <Box display="flex" fkexDirection="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Typography variant="h4">Избранное</Typography>
                <Button variant="contained" color="primary" component={Link} to="/">
                    К списку фильмов
                </Button>
            </Box>

            {list.length === 0 ? (
                <Typography>Список пуст</Typography>
            ) : (
                <Grid container spacing={2}>
                    {list.map((m) => (
                        <Grid item key={m.id}>
                            <MovieCard movie={m} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
});

export default FavoritesPage;
