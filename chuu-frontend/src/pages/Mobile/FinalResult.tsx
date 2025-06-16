import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import React, { useState, useEffect } from "react";
import { clearItem } from "../../store/slices/encateSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import question from "../../assets/encate.json";
import encate from "../../assets/encate.json";
import EncateChart from "../../components/EncateChart";
import style from "../../styles/FinalResult.module.css";
import { useNavigate } from "react-router-dom";

type EncateChartType = {
  question: string;
  category: string[];
  choice: string;
  scores: Record<string, number>;
};
type EncateQuestionType = {
  questionNumber: number;
  question: string;
  teacher: string[];
  image: string;
};

function FinalResult() {
  const items = useSelector((state: RootState) => state.encate.list);
  const [totalData, setTotalData] = useState([]);
  const [encateChart, setEncateChart] = useState<EncateChartType[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_, setEncateQuestion] = useState<EncateQuestionType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const total_result = await axios.get(
          "https://chuu.mirim-it-show.site/home"
        );
        setTotalData(total_result.data.scores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setEncateQuestion(encate.encate);
  }, []);

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/web-main"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  useEffect(() => {
    // items와 totalData가 모두 비어있지 않은 경우에만 ratioTotal 실행
    if (items.length > 0 && totalData.length > 0) {
      ratioTotal();
    }
  }, [items, totalData]); // items 또는 totalData가 변경될 때마다 실행

  function ratioTotal() {
    for (let i = 0; i < totalData.length; i++) {
      const newData = {
        question: question.encate[i].question,
        category: question.encate[i].teacher,
        choice: items[i].answer,
        scores: totalData[i].scores,
      };
      setEncateChart((prev) => [...prev, newData]);
      dispatch(clearItem()); // items 초기화
    }
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        결과 ✨
      </h1>
      {encateChart.map((val: EncateChartType, idx: number) => {
        return <EncateChart key={idx} data={val} />;
      })}
      <button onClick={() => navigate("/")} className={style.homeButton}>
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default FinalResult;
