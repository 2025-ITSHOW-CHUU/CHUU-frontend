import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider 추가
import { store } from "./store/index.ts"; // store import 추가

import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import Result from "./pages/Result.tsx";
import Test from "./pages/Test.tsx";
import Encate from "./pages/Encate.tsx";
import Photo from "./pages/Photo.tsx";
import FinalResult from "./pages/FinalResult.tsx";
import "./fonts/Font.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result" element={<Result />} />
          <Route path="/test" element={<Test />} />
          <Route path="/encate" element={<Encate />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/encate-result" element={<FinalResult />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
