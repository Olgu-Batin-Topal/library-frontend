import React, { lazy, Suspense } from "react";

// React Router
import { Route, Routes } from "react-router-dom";

// Components
import Loading from "./components/common/Loading.jsx";
import Layout from "./components/common/Layout.jsx";

// Pages
const Authors = lazy(() => import("./pages/Authors.jsx"));
const Books = lazy(() => import("./pages/Books.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Books />
            </Layout>
          }
        />
        <Route
          path="/authors"
          element={
            <Layout>
              <Authors />
            </Layout>
          }
        />
        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
      </Routes>
    </Suspense>
  );
}
