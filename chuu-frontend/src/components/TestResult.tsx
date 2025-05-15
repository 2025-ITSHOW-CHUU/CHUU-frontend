import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import style from "../styles/TestResult.module.css";

function TestResult({}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getQuestionResult() {
      try {
        const res = await axios.get("http://localhost:3000/users/max");
        const transformedData = res.data.map((item) => ({
          id: item.id,
          value: item.teacherScore,
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
      <div style={{ width: "100%", height: "400px" }}>
        {data.length > 0 ? (
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 40 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
            ]}
            fill={[
              {
                match: { id: "박지우" },
                id: "dots",
              },
              {
                match: { id: "이대형" },
                id: "dots",
              },
              {
                match: { id: "조예진" },
                id: "dots",
              },
              {
                match: { id: "정하나" },
                id: "dots",
              },
              {
                match: { id: "김윤지" },
                id: "dots",
              },
              {
                match: { id: "이호연" },
                id: "dots",
              },
            ]}
            animate={false}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
              },
            ]}
          />
        ) : (
          <div>기다리세요</div>
        )}
      </div>
    </div>
  );
}

export default TestResult;
