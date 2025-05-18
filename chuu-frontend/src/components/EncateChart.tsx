import React from "react";
import Chart from "react-apexcharts";

const chartData = [
  {
    question: "가장 결혼을 빨리할 것 같은 선생님은?",
    scores: { 박지우: 7, 김윤환: 6, 박성래: 14 },
  },
  {
    question: "쿠팡 VIP일 것 같은 선생님은?",
    scores: { 김영철: 5, 손명수: 5, 고낙은: 16 },
  },
  {
    question: "CC를 해봤을 것 같은 선생님은?",
    scores: { 김종성: 7, 임정훈: 14, 김윤지: 4 },
  },
  {
    question: "위플래쉬를 가장 잘 출 것 같은 선생님은?",
    scores: { 박향규: 9, 유병석: 11, 최규정: 5 },
  },
];

// 모든 선생님 목록 추출
const allTeachers = Array.from(
  new Set(chartData.flatMap((q) => Object.keys(q.scores)))
);

// 각 선생님 기준으로 질문별 점수 비율 계산
const series = allTeachers.map((teacher) => ({
  name: teacher,
  data: chartData.map((q) => {
    const total = Object.values(q.scores).reduce((sum, val) => sum + val, 0);
    const score = q.scores[teacher] || 0;
    return ((score / total) * 100).toFixed(2);
  }),
}));

const options = {
  chart: {
    type: "bar",
    stacked: true,
    stackType: "100%",
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  title: {
    text: "선생님 밈 투표 결과 (100% 누적 그래프)",
  },
  xaxis: {
    categories: chartData.map((q) => q.question),
  },
  tooltip: {
    y: {
      formatter: (val: any) => `${val}%`,
    },
  },
};

export default function EncateChart() {
  return <Chart options={options} series={series} type="bar" height={350} />;
}
