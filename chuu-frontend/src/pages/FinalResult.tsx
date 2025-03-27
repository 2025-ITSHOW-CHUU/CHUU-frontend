import { useSelector } from "react-redux";
import { RootState } from "../store";
import React, { useState, useEffect } from "react";
import { clearItem } from "../store/slices/encateSlice.ts";
import { useDispatch } from "react-redux";
import axios from "axios";

type ratioType = [number, number];

function FinalResult() {
  const items = useSelector((state: RootState) => state.encate.list);
  const [totalData, setTotalData] = useState([]);
  const [ratio, setRatio] = useState<ratioType[]>([]);
  const dispatch = useDispatch();

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
  }, []);

  useEffect(() => {
    // items와 totalData가 모두 비어있지 않은 경우에만 ratioTotal 실행
    if (items.length > 0 && totalData.length > 0) {
      ratioTotal();
    }
  }, [items, totalData]); // items 또는 totalData가 변경될 때마다 실행

  function ratioTotal() {
    console.log(items[0], totalData);
    let ratioList: ratioType[] = [];
    for (let i = 0; i < totalData.length; i++) {
      const myChoice = items[0][i].answer;
      const questionAnswer = totalData[i].scores;
      const myChoiceAnswer = questionAnswer[myChoice];
      console.log(myChoice, questionAnswer);
      const totalAnswer = Object.values(questionAnswer).reduce(
        (total: number, value: unknown) =>
          total + (typeof value === "number" ? value : 0),
        0
      );
      console.log(myChoiceAnswer, totalAnswer);
      ratioList.push([myChoiceAnswer, totalAnswer] as ratioType);
    }
    setRatio(ratioList);
    console.log(ratioList);
    dispatch(clearItem());
  }

  return (
    <ul>
      {items.map((item: { answer: string }, index: number) => (
        <li key={index}>{item.answer}</li>
      ))}
    </ul>
  );
}

export default FinalResult;
