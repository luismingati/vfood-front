import React from "react";

import { GraphModel } from "./GraphModel";
import useGraphViewModel from "./GraphViewModel";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC<GraphModel> = (props: GraphModel) => {
  const { graph, labels } = useGraphViewModel(props);

  return (
    <div
      className={`w-full ${
        graph.fullWidth ? "" : "max-w-[623px]"
      } h-fit border-[1px] border-solid border-[#D9D9D9] py-6 px-7 rounded-[10px]`}
    >
      <div className="flex justify-between items-center mb-5">
        <p className="font-poppins text-[18px] text-[#312843]">
          {graph.fullWidth
            ? "Evolução de resultados"
            : "Performance de indicadores"}
        </p>
        <p className="font-poppins text-[16px] text-[#A3A3A3] border-[1px] border-solid border-[#D9D9D9] py-1 px-2.5 rounded-[10px]">
          Últimos 6 meses
        </p>
      </div>

      <div className="flex items-center justify-start gap-2 w-full">
        <p className="-rotate-90 w-[30px] font-poppins text-[12px] text-[#A3A3A3]">
          Indicadores
        </p>
        <div className="flex flex-col items-center justify-start w-full gap-3 [&>*:first-child]:!w-full [&>*:first-child]:!h-[200px]">
          <Bar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: { size: 12, family: "Poppins" },
                    color: "#A3A3A3",
                  },
                },
                y: {
                  grid: {},
                  ticks: {
                    font: { size: 12, family: "Poppins" },
                    color: "#A3A3A3",
                    stepSize: 25,
                    autoSkip: false,
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
            data={{
              labels,
              datasets: [
                {
                  label: "Meta",
                  data: graph.graphData.map((data) => data.nGoal),
                  backgroundColor: "#AC72C1",
                  barPercentage: 0.6,
                  borderRadius: 40,
                  categoryPercentage: graph.fullWidth ? 0.3 : 0.6,
                },
                {
                  label: "Supermeta",
                  data: graph.graphData.map((data) => data.nSuperGoal),
                  backgroundColor: "#32B97C",
                  barPercentage: 0.6,
                  borderRadius: 40,
                  categoryPercentage: graph.fullWidth ? 0.3 : 0.6,
                },
                {
                  label: "Desafio",
                  data: graph.graphData.map((data) => data.nChallenge),
                  backgroundColor: "#6186D3",
                  barPercentage: 0.6,
                  borderRadius: 40,
                  categoryPercentage: graph.fullWidth ? 0.3 : 0.6,
                },
                {
                  label: "Não alcançado",
                  data: graph.graphData.map((data) => data.nFailed),
                  backgroundColor: "#F16062",
                  barPercentage: 0.6,
                  borderRadius: 40,
                  categoryPercentage: graph.fullWidth ? 0.3 : 0.6,
                },
              ],
            }}
          />
          <div className="flex justify-center items-center gap-5 w-full">
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-3 bg-[#AC72C1] rounded-[21px]"></span>
              <p className="font-poppins text-[13px] text-[#A3A3A3]">Meta</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-3 bg-[#32B97C] rounded-[21px]"></span>
              <p className="font-poppins text-[13px] text-[#A3A3A3]">
                Supermeta
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-3 bg-[#6186D3] rounded-[21px]"></span>
              <p className="font-poppins text-[13px] text-[#A3A3A3]">Desafio</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-3 bg-[#F16062] rounded-[21px]"></span>
              <p className="font-poppins text-[13px] text-[#A3A3A3]">
                Não alcançado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
