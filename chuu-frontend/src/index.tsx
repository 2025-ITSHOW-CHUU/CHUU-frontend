import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.tsx";
import Search from "../src/pages/Search.tsx";
import Result from "../src/pages/Result.tsx";
import Test from "../src/pages/Test.tsx";
import EncateList from "./pages/EncateList.tsx";
import Encate from "./pages/Encate.tsx";
import "./fonts/Font.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/result" element={<Result />} />
      <Route path="/test" element={<Test />} />
      <Route path="/encate" element={<EncateList />} />
      <Route path="/encate/:id" element={<Encate />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
