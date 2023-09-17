import { lazy } from "react";

export const LazyLoginPage = lazy(async () => import("./HomePage"));
