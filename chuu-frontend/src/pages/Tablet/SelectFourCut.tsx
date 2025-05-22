import React from "react";
import filterJson from "../../assets/filter.json";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>프레임을 선택하세요!</h1>
      {filterJson.map((filter) => {
        return <div onClick={() => handleClick(filter)}>{filter.title}</div>;
      })}
    </div>
  );
}

export default SelectFourCut;
