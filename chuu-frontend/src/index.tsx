import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider 추가
import { store } from "./store/index.ts"; // store import 추가

import Home from "./pages/Mobile/Home.tsx";
import Search from "./pages/Mobile/Search.tsx";
import Result from "./pages/Mobile/Result.tsx";
import Test from "./pages/Mobile/Test.tsx";
import Encate from "./pages/Mobile/Encate.tsx";
import Photo from "./pages/Mobile/Photo.tsx";
import FinalResult from "./pages/Mobile/FinalResult.tsx";
import UploadImage from "./pages/Mobile/UploadImage.tsx";
import Main from "./pages/Web/Main.tsx";
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
          <Route path="/upload-post" element={<UploadImage />} />
          <Route path="web-main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
