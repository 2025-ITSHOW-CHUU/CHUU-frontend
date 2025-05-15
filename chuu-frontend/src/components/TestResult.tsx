import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/TestResult.module.css";
import Chart from "./Chart";

function TestResult({}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getQuestionResult() {
      try {
        const res = await axios.get("http://localhost:3000/users/max");
        const transformedData = res.data.map((item) => ({
          id: item.id,
          label: item.id,
          value: item.teacherScore ?? 0,
          color: "hsl(243, 70%, 50%)",
        }));
        setData(transformedData);
      } catch (err) {
        console.log(err);
      }
    }

    getQuestionResult();
  }, []);
  console.log(data);
  return (
    <div className={style.TestResultContainer}>
      <h1>민수님의 추구미 찾으러 가기</h1>
      <p>옆에 배치된 핸드폰으로 바로 추구미 찾기</p>
      <div style={{ width: 500, height: 500 }}>
        <div style={{ width: 500, height: 500 }}>
          {data.length > 0 ? <Chart data={data} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
}

export default TestResult;
