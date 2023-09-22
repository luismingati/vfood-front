import IndicatorCard from "../IndicatorCard/IndicatorCard";
import useIndicatorsSummaryViewModel from "./IndicatorsSummaryViewModel";

import starIcon from "./assets/starIcon.svg";
import graph from "./assets/graph.svg";
import plusIcon from "./assets/plusIcon.svg";

const IndicatorsSummary = (props: IndicatorsSummaryModel) => {
  const viewModel = useIndicatorsSummaryViewModel(props);

  if (viewModel.indicatorsSummary.thisMonth) {
    return (
      <div className="w-full max-w-[506px]">
        <div className="flex justify-between items-center mb-4">
          <p className="font-poppins text-[16px] text-[#312843]">Indicadores</p>
          <button className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#952323] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2">
            <img src={plusIcon} alt="" />
            <span>Atribuir Indicador</span>
          </button>
        </div>
        <div>
          {viewModel.indicatorsSummary.indicatorsArray.map(
            (indicatorCard, index) => {
              return (
                <IndicatorCard
                  number={index + 1}
                  thisMonth={viewModel.indicatorsSummary.thisMonth}
                  name={indicatorCard.name}
                  weight={indicatorCard.weight}
                  progress={indicatorCard.progress}
                  goal={indicatorCard.goal}
                  superGoal={indicatorCard.superGoal}
                  challenge={indicatorCard.challenge}
                />
              );
            }
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-[506px]">
        <div className="flex justify-between items-center mb-4">
          <p className="font-poppins text-[16px] text-[#312843]">Indicadores</p>
          <button className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#A3A3A3] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2 pointer-events-none">
            <img src={plusIcon} alt="" />
            <span>Atribuir Indicador</span>
          </button>
        </div>
        <div className="bg-[#f5f5f56b] rounded-[20px] p-6 mb-3 flex gap-7">
          <div className="flex items-center gap-3 w-2/3">
            <img src={graph} alt="" />
            <div>
              <p className="font-poppins text-[16px] text-[#312843]">
                Total do mês
              </p>
              <div className="flex items-center justify-start gap-1.5">
                <img src={starIcon} alt="" />
                <p className="font-poppins text-[32px] font-bold text-[#312843] translate-y-[1px]">
                  3,5
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 w-1/2">
            {viewModel.indicatorsSummary.indicatorsArray.map(
              (indicatorCard, index) => {
                let progress = 0;
                if (indicatorCard.progress < indicatorCard.goal) {
                  progress = 0;
                } else if (indicatorCard.progress < indicatorCard.superGoal) {
                  progress = 1;
                } else if (indicatorCard.progress < indicatorCard.challenge) {
                  progress = 2;
                } else {
                  progress = 3;
                }

                return (
                  <div
                    className={`relative pl-3 goalsBorder goalsBorder${progress} h-fit`}
                  >
                    <span className="font-poppins text-[16px] text-[#312843]">
                      #{index + 1}
                    </span>
                    <p className="font-poppins text-[20px] font-bold text-[#312843]">
                      {indicatorCard.progress}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div>
          {viewModel.indicatorsSummary.indicatorsArray.map(
            (indicatorCard, index) => {
              return (
                <IndicatorCard
                  number={index + 1}
                  thisMonth={viewModel.indicatorsSummary.thisMonth}
                  name={indicatorCard.name}
                  weight={indicatorCard.weight}
                  progress={indicatorCard.progress}
                  goal={indicatorCard.goal}
                  superGoal={indicatorCard.superGoal}
                  challenge={indicatorCard.challenge}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
};

export default IndicatorsSummary;
