import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

type EncateChartType = {
  question: string;
  category: string[];
  choice: string;
  scores: Record<string, number>;
};

function EncateChart(props: { data: EncateChartType }) {
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    const { scores, question } = props.data;

    const allTeachers = Object.keys(scores);
    const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

    const newSeries = allTeachers.map((teacher) => ({
      name: teacher,
      data: [((scores[teacher] / total) * 100).toFixed(2)],
    }));

    setSeries(newSeries);

    setOptions({
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
        text: question,
      },
      xaxis: {
        categories: [question],
      },
      tooltip: {
        y: {
          formatter: (val: any) => `${val}%`,
        },
      },
    });
  }, [props.data]);

  return (
    <div>
      {series.length > 0 && options?.xaxis ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={180}
          width={"80%"}
        />
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default EncateChart;
