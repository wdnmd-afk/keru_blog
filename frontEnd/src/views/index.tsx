import Home from "./systemPages/home.tsx";
import { lazy } from "react";
const LazyComponents = {
  Home: lazy(() => import("./systemPages/home.tsx")),
  NotFound: lazy(() => import("./systemPages/NotFound.tsx")),
};

const staticComponents = {
  Login: Home,
};

export { LazyComponents, staticComponents };
