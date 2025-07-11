// src/store/index.ts
import { createContext, useContext } from "react";
import { rootStore } from "./RootStore";

// Контекст со стором
export const StoresContext = createContext(rootStore);

// Хук для доступа к стору из компонентов
export const useStores = () => useContext(StoresContext);
