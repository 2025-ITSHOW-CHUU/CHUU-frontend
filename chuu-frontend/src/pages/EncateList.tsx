import React, { useEffect, useState } from "react";
import EncateSelect from "../components/EncateSelect.tsx";
import def from "../styles/Default.module.css";
import Footer from "../components/Footer.tsx";
import { ReactComponent as Logo } from "../assets/logo.svg";

function EncateList({}) {
  return (
    <div className={`${def["Body"]}`}>
      <div className={`${def["Logo"]}`}>
        <Logo />
      </div>
      <EncateSelect />
      <Footer />
    </div>
  );
}
export default EncateList;
