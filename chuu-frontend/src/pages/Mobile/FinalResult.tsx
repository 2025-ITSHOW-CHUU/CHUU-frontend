import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import React, { useState, useEffect } from "react";
import { clearItem } from "../../store/slices/encateSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import question from "../../assets/encate.json";
import encate from "../../assets/encate.json";
import EncateChart from "../../components/EncateChart";

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
  const [_, setEncateQuestion] = useState<EncateQuestionType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const total_result = await axios.get("http://localhost:3000/home");
        setTotalData(total_result.data.scores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    setEncateQuestion(encate.encate);
  }, []);

  useEffect(() => {
    // items와 totalData가 모두 비어있지 않은 경우에만 ratioTotal 실행
    if (items.length > 0 && totalData.length > 0) {
      ratioTotal();
    }
  }, [items, totalData]); // items 또는 totalData가 변경될 때마다 실행

  function ratioTotal() {
    for (let i = 0; i < totalData.length - 1; i++) {
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
    <div>
      {encateChart.map((val: EncateChartType, idx: number) => (
        <EncateChart key={idx} data={val} />
      ))}
    </div>
  );
}

export default FinalResult;
