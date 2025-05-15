import React from "react";
import style from "../styles/Chart.module.css";
import { ResponsivePie } from "@nivo/pie";

function Chart({ data }) {
  console.log([...data]);
  return (
    <ResponsivePie
      data={[...data]}
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
        { match: { id: "박지우" }, id: "dots" },
        { match: { id: "이대형" }, id: "dots" },
        { match: { id: "조예진" }, id: "dots" },
        { match: { id: "장하나" }, id: "dots" },
        { match: { id: "김윤지" }, id: "dots" },
        { match: { id: "이호연" }, id: "dots" },
      ]}
      animate={false}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
}

export default Chart;
