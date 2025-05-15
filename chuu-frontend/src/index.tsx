import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; // Redux Provider 추가
import { store } from "./store/index"; // store import 추가

import Home from "./pages/Mobile/Home";
import Search from "./pages/Mobile/Search";
import Result from "./pages/Mobile/Result";
import Test from "./pages/Mobile/Test";
import Encate from "./pages/Mobile/Encate";
import Photo from "./pages/Mobile/Photo";
import FinalResult from "./pages/Mobile/FinalResult";
import UploadImage from "./pages/Mobile/UploadImage";
import Main from "./pages/Web/Main";
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
          <Route path="/web-main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
