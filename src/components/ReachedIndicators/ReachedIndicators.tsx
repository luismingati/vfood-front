import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

interface ReachedIndicatorsProps {
  totalPercentage: number;
  goal: number;
  supergoal: number;
  challenge: number;
}

Chart.register(ArcElement);

const textCenter = {
  id: 'textCenter',
  beforeDatasetDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;
    const totalPercentage = data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2]; // Obtém o totalPercentage dos dados

    ctx.save();
    ctx.font = '24px Poppins';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${totalPercentage}%`, chart.width / 2, chart.height / 2);
    ctx.restore();
  }
};

const ReachedIndicators: React.FC<ReachedIndicatorsProps> = ({ totalPercentage, goal, supergoal, challenge }) => {
  return (
    <div className="w-full max-w-[240px] h-full max-h-[290px] rounded-[20px] px-[18px] py-[24px] flex flex-col items-center justify-between font-poppins  border-[1px] border-[#D9D9D9] text-[#312843]">
      <h2 className="text-sm font-normal"><span className="text-base font-bold">{totalPercentage}%</span> dos indicadores foram alcançados</h2>
      <div className="w-[100px] h-[100px]">
        <Doughnut
          plugins={[textCenter]}
          data={{
            datasets: [
              {
                data: [goal, supergoal, challenge, 100 - (goal + supergoal + challenge)],
                backgroundColor: [
                  "#AC72C1",
                  "#32B97C",
                  "#6186D3",
                  "#A3A3A3",
                ],
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
