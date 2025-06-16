import React, { useState, useEffect } from "react";
import filterJson from "../../assets/filter.json";
import { useNavigate } from "react-router-dom";
import style from "../../styles/SelectFourCut.module.css";
import useFourCutInfoStore from "../../store/useFourCutInfoStore";
import ModalPortal from "../../components/ModalPortal";
import { IoIosArrowBack } from "react-icons/io";

function SelectFourCut() {
  const navigate = useNavigate();
  const { fourCutInfo, setFourCutInfo } = useFourCutInfoStore();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const isWideScreen = window.innerWidth >= 1024;

    if (!isWideScreen) {
      navigate("/"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  const handleClick = (selectedFrame) => {
    setFourCutInfo(selectedFrame);
    navigate("/four-cut");
  };

  const openModal = (selectedFrame) => {
    setFourCutInfo(selectedFrame);
    setModalOpen(true);
  };

  return (
    <div className={style.selectFrameContainer}>
      <div className={style.headerContainer}>
        <IoIosArrowBack />
        <h1>프레임을 선택하세요!</h1>
      </div>
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
                  onClick={() => openModal(filter)}
                  src={filter.finalFrame}
                  alt={filter.title}
                  style={{
                    height: "427px",
                    width: "auto",
                  }}
                />
                <p>{filter.title}</p>
              </div>
              {console.log(index)}
              {(index + 1) % 4 === 0 && <div style={{ width: "100%" }} />}
            </>
          );
        })}
      </div>

      {modalOpen && (
        <ModalPortal>
          <div
            className={style["modal-overlay"]}
            onClick={(e) => setModalOpen(false)}
          >
            <div
              className={style["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={fourCutInfo.finalFrame} alt={fourCutInfo.finalFrame} />
              <button onClick={() => handleClick(fourCutInfo)}>
                프레임 선택하기
              </button>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default SelectFourCut;
