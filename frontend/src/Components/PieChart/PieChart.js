import React from "react";
import "./PieChart.css";
import { Doughnut } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend, Chart } from "chart.js";

Chart.register(Tooltip, Title, ArcElement, Legend);

const PieChart = ({ data }) => {
    return (
        <div className="pie-chart">
            <Doughnut data={data} className="doughnut" />
        </div>
    );
};

export default PieChart;
