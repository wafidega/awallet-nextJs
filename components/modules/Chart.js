import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useEffect, useState } from "react";
import axios from "utils/axios";
import Cookie from "js-cookie";

const Chart = () => {
  const id = Cookie.get("id");
  const [dataDahsboard, setDataDashboard] = useState([]);

  const getDashboard = () => {
    axios
      .get(`/dashboard/${id}`)
      .then((res) => {
        setDataDashboard(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getDashboard();
  }, []);

  console.log(dataDahsboard);

  let labelChart = [];
  dataDahsboard.listIncome?.map((item) => {
    labelChart.push(item.day);
  });
  console.log(labelChart);

  let dataChart = [];
  dataDahsboard.listIncome?.map((item) => {
    dataChart.push(item.total);
  });
  console.log(dataChart);

  let dataChartExpense = [];
  dataDahsboard.listExpense?.map((item) => {
    dataChartExpense.push(item.total);
  });
  console.log(dataChartExpense);

  const data = {
    labels: labelChart,
    datasets: [
      {
        label: "Week History",
        backgroundColor: ["#3e95cd"],
        data: dataChart,
      },
      {
        label: "Week History",
        backgroundColor: ["#8e5ea2"],
        data: dataChartExpense,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };

  return (
    <>
      <div>
        <Bar data={data} options={config} />
      </div>
    </>
  );
};

export default Chart;
