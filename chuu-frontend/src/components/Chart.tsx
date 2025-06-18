import React from "react";
import style from "../styles/Chart.module.css";
import { ResponsivePieCanvas } from "@nivo/pie";

function Chart({ data }) {
  const gradientColors = [
    "#65E9FF",
    "#A0F3FF",
    "#D6FAFF",
    "#F0FDFF",
    "#FFFFFF",
    "#E6FCFF",
  ];

  const coloredData = data.map((item) => ({
    ...item,
    color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
  }));

  return (
    <ResponsivePieCanvas
      data={coloredData}
      colors={{ datum: "data.color" }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
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
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        { match: { id: "박지우" }, id: "dots" },
        { match: { id: "이대형" }, id: "lines" },
        { match: { id: "조예진" }, id: "dots" },
        { match: { id: "장하나" }, id: "lines" },
        { match: { id: "김윤지" }, id: "dots" },
        { match: { id: "이호연" }, id: "lines" },
      ]}
    />
  );
}

export default Chart;
