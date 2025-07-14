import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { StoresContext } from "@/store";
import { rootStore } from "@/store/RootStore";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StoresContext.Provider value={rootStore}>
            <RouterProvider router={router} />
        </StoresContext.Provider>
    </React.StrictMode>,
);
