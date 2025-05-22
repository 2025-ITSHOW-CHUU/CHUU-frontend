import React from "react";
import filterJson from "../../assets/filter.json";
import { useNavigate } from "react-router-dom";
import style from "../../styles/SelectFourCut.module.css";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";

function SelectFourCut() {
  const navigate = useNavigate();
  const { fourCutInfo, setFourCutInfo } = useFourCutInfoStore();
  const handleClick = (selectedFrame) => {
    setFourCutInfo(selectedFrame);
    sessionStorage.setItem("fourcutInfo", JSON.stringify(selectedFrame));
    navigate("/four-cut");
  };
  return (
    <div className={style.selectFrameContainer}>
      <h1>프레임을 선택하세요!</h1>
      <div className={style.framesContainer}>
        {filterJson.map((filter) => {
          return (
            <div className={style.frameContainer}>
              <img
                onClick={() => handleClick(filter)}
                src={filter.finalFrame}
                alt={filter.title}
              />
              <p>{filter.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectFourCut;
