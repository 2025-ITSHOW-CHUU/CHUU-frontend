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

    const allTeachers = Object.keys(scores).map(
      (teacher: string) => `${teacher} 선생님`
    );
    const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

    const newSeries = allTeachers.map((teacher) => {
      return {
        name: teacher.split(" ")[0],
        data: [
          total === 0
            ? 0
            : Number(
                ((scores[teacher.split(" ")[0]] / total) * 100).toFixed(2)
              ),
        ],
      };
    });

    setSeries(newSeries);

    setOptions({
      chart: {
        type: "bar",
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false,
        },
      },
      colors: ["#65E9FF", "#00EBE6", "#12DDFF"],
      plotOptions: {
        bar: {
          horizontal: true,
          startingShape: "rounded",
          endingShape: "rounded",
          barHeight: "60",
          borderRadius: 9,
          colors: {
            backgroundBarColors: ["#E6F0FF"],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 9,
          },
        },
      },
      grid: {
        show: false,
      },
      title: {
        text: `${question} : ${props.data.choice} 선생님`,
        align: "center",
        style: {
          fontSize: "18px",
          color: "#ffffff",
          fontFamily: "Pretendard",
          fontWeight: "600",
          screenLeft: "100px",
        },
      },
      xaxis: {
        categories: [question],
        labels: {
          show: false,
        },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        labels: {
          show: false, // y축 레이블 제거
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true, // 바 안에 값 없애기
        style: {
          color: "#000000",
        },
        formatter: function (val, opts) {
          const teacher = opts.w.config.series[opts.seriesIndex].name;
          return `${teacher} 선생님`;
        },
      },
      legend: {
        show: false, // 범례 제거
      },
      tooltip: {
        y: {
          formatter: (val: any) => `${val}%`,
        },
      },
    });
  }, [props.data]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {series.length > 0 && options?.xaxis ? (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={180}
          width={400}
        />
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default EncateChart;
