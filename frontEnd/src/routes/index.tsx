import React, { lazy } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useGlobalStore } from "@/store";
import { BrowserLocalStorage } from "@/utils";
import Layout from "@/views/systemPages/Layout.tsx";

const LazyComponents = {
  Home: lazy(() => import("@/views/systemPages/Home.tsx")),
  NotFound: lazy(() => import("@/views/systemPages/NotFound.tsx")),
  Login: lazy(() => import("@/views/systemPages/Login.tsx")),
  Books: lazy(() => import("@/views/normalPages/Books.tsx")),
  Technology: lazy(() => import("@/views/normalPages/Technology.tsx")),
  Files: lazy(() => import("@/views/normalPages/Files.tsx"))
};

const publicRoutes = [
  { path: "/login", component: <LazyComponents.Login /> },
  { path: "*", component: <LazyComponents.NotFound /> }
];

const privateRoutes = [
  { path: "/", component: <LazyComponents.Home /> },
  { path: "/books", component: <LazyComponents.Books /> },
  { path: "/technology", component: <LazyComponents.Technology /> },
  { path: "/files", component: <LazyComponents.Files /> }
];

const AppRoutes: React.FC = () => {
  const user = useGlobalStore(state => state.user);
  const localToken = BrowserLocalStorage.get("userInfo");

  const isAuthenticated = user.token || localToken;

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={<React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>}
          />
        ))}
        {privateRoutes.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={
              isAuthenticated ? (
                <Layout>
                  <React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
