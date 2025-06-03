import React from "react";
import filterJson from "../../assets/filter.json";
import { useNavigate } from "react-router-dom";
import style from "../../styles/SelectFourCut.module.css";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";

function SelectFourCut() {
  const navigate = useNavigate();
  const { setFourCutInfo } = useFourCutInfoStore();
  const handleClick = (selectedFrame) => {
    console.log(selectedFrame);
    setFourCutInfo(selectedFrame);
    navigate("/four-cut");
  };
  return (
    <div className={style.selectFrameContainer}>
      <h1>프레임을 선택하세요!</h1>
      <div className={style.framesContainer}>
        {filterJson.map((filter, index) => {
          return (
            <>
              <div
                className={style.frameContainer}
                style={{
                  width: "240px",
                }}
              >
                <img
                  onClick={() => handleClick(filter)}
                  src={filter.finalFrame}
                  alt={filter.title}
                  style={{
                    height: "427px",
                    width: "auto",
                  }}
                />
                <p>{filter.title}</p>
              </div>
              {filter.teacher !==
                (filterJson[index + 1]?.teacher || filter.teacher) && (
                <div style={{ width: "100%" }} />
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default SelectFourCut;
