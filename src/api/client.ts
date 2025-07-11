import axios from "axios";

export const kpApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "X-API-KEY": import.meta.env.VITE_KP_TOKEN,
    },
});
