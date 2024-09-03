import React, { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import useStores from "@/hooks/useStores.ts";
import { BrowserLocalStorage } from "@/utils";

const LazyComponents = {
  Home: lazy(() => import("@/views/systemPages/home.tsx")),
  NotFound: lazy(() => import("@/views/systemPages/NotFound.tsx")),
  Login: lazy(() => import("@/views/systemPages/login.tsx")),
};

const routesConfig = [
  { path: "/", component: <LazyComponents.Home />, requiresAuth: true },
  { path: "/login", component: <LazyComponents.Login />, requiresAuth: false },
  { path: "*", component: <LazyComponents.NotFound />, requiresAuth: true },
];

const AppRoutes: React.FC = () => {
  /*const { GlobalStore } = useStores();
  console.log(GlobalStore.user.token, "uuuu");

  useEffect(() => {
    console.log(GlobalStore.user.token, "uuuu");
  }, [GlobalStore.user.token]);*/
  return (
    <Router>
      <Routes>
        {routesConfig.map(({ path, component, requiresAuth }) => (
          <Route
            key={path}
            path={path}
            element={
              requiresAuth ? (
                <Navigate to="/login" />
              ) : (
                <React.Suspense fallback={<div>Loading...</div>}>
                  {component}
                </React.Suspense>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
