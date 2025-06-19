import React, { lazy, Suspense } from "react";

// React Router
import { Route, Routes } from "react-router-dom";

// Components
import Loading from "./components/common/Loading.jsx";

// Pages
const Authors = lazy(() => import("./pages/Authors.jsx"));
const Books = lazy(() => import("./pages/Books.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Suspense>
  );
}
