import React from "react";
import filterJson from "../../assets/filter.json";
import { useNavigate } from "react-router-dom";
import style from "../../styles/SelectFourCut.module.css";

function SelectFourCut() {
  const navigate = useNavigate();
  const handleClick = (selectedFrame) => {
    navigate("/four-cut", {
      state: {
        frames: selectedFrame.frames,
        finalFrame: selectedFrame.finalFrame,
      },
    });
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
