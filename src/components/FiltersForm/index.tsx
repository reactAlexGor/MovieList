import { useState, useEffect } from "react";
import { Box, Slider, Typography, Autocomplete, TextField, Button } from "@mui/material";
import type { Filters } from "@/types/filters";

interface Props {
    filters: Filters;
    onApply: (f: Filters) => void;
}

const FiltersForm: React.FC<Props> = ({ filters, onApply }) => {
    const [draft, setDraft] = useState<Filters>(filters);

    // если filters сменились — синхронизируемся
    useEffect(() => setDraft(filters), [filters]);

    // проверим, менялись ли значения, чтобы дизэблить кнопку
    const isChanged = JSON.stringify(draft) !== JSON.stringify(filters);

    return (
        <Box display="flex" flexDirection="column" gap={2} sx={{ maxWidth: 360 }} paddingBottom="40px">
            <Typography variant="h6">Фильтры</Typography>

            <Autocomplete
                multiple
                options={allGenres}
                value={draft.genres}
                onChange={(_, value) => setDraft({ ...draft, genres: value })}
                renderInput={(p) => <TextField {...p} label="Жанры" />}
            />

            <Typography>Рейтинг: {draft.rating.join(" – ")}</Typography>
            <Slider
                value={draft.rating}
                onChange={(_, value) => setDraft({ ...draft, rating: value as [number, number] })}
                valueLabelDisplay="auto"
                step={0.1}
                min={0}
                max={10}
            />

            <Typography>Год выпуска: {draft.year.join(" – ")}</Typography>
            <Slider
                value={draft.year}
                onChange={(_, value) => setDraft({ ...draft, year: value as [number, number] })}
                valueLabelDisplay="auto"
                step={1}
                min={1990}
                max={new Date().getFullYear()}
            />

            <Button variant="contained" onClick={() => onApply(draft)} disabled={!isChanged}>
                Применить
            </Button>
        </Box>
    );
};

export default FiltersForm;

const allGenres = [
    "аниме",
    "биография",
    "боевик",
    "вестерн",
    "военный",
    "детектив",
    "документальный",
    "драма",
    "игра",
    "комедия",
    "короткометражка",
    "криминал",
    "мелодрама",
    "мультфильм",
    "музыка",
    "мюзикл",
    "новости",
    "приключения",
    "реальное ТВ",
    "семейный",
    "спорт",
    "ток-шоу",
    "триллер",
    "ужасы",
    "фантастика",
    "фильм-нуар",
    "фэнтези",
];
