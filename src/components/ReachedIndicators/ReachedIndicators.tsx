import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { ReachedIndicatorsProps } from "./ReachedIndicatorsModel";

Chart.register(ArcElement);

const plugins = [
  {
    beforeDraw: function (chart) {
      const width = chart.width,
        height = chart.height,
        ctx = chart.ctx,
        data = chart.data;

      const totalPercentage =
        data.datasets[0].data[0] +
        data.datasets[0].data[1] +
        data.datasets[0].data[2];
      ctx.restore();
      ctx.font = "bold 22px Poppins ";
      ctx.textBaseline = "middle"; 
      ctx.fillStyle = "black";
      const text = `${totalPercentage}%`,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        offsetY = 4,  
        textY = height / 2 + offsetY; 
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];


const ReachedIndicators: React.FC<ReachedIndicatorsProps> = ({
  totalPercentage,
  goal,
  supergoal,
  challenge,
}) => {
  return (
    <div className="w-full max-w-[240px] h-full max-h-[290px] rounded-[20px] px-[18px] py-[24px] flex flex-col items-center justify-between font-poppins  border-[1px] border-[#D9D9D9] text-[#312843]">
      <h2 className="text-sm font-normal">
        <span className="text-base font-bold">{totalPercentage}%</span> dos
        indicadores foram alcançados
      </h2>

      <div className="w-full max-w-[104px] max-h-[104px]">
        <Doughnut
          plugins={plugins}
          options={{
            cutout: 32,
          }}
          data={{
            datasets: [
              {
                data: [
                  goal,
                  supergoal,
                  challenge,
                  100 - (goal + supergoal + challenge),
                ],
                backgroundColor: ["#AC72C1", "#32B97C", "#6186D3", "#A3A3A3"],
                hoverOffset: 1,
              },
            ],
          }}
        ></Doughnut>
      </div>
      <div className="flex flex-col gap-2 items-center text-xs w-[140px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="w-3 h-1 bg-[#AC72C1] rounded-2xl block mr-2"></span>
            <p>Meta</p>
          </div>
          <p className="font-bold">{goal}%</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="w-3 h-1 bg-[#32B97C] rounded-2xl block mr-2"></span>
            <p>Supermeta</p>
          </div>
          <p className="font-bold">{supergoal}%</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="w-3 h-1 bg-[#6186D3] rounded-2xl block mr-2"></span>
            <p>Desafio</p>
          </div>
          <p className="font-bold">{challenge}%</p>
        </div>
      </div>
    </div>
  );
};

export default ReachedIndicators;