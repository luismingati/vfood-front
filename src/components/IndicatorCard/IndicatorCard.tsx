import { useEffect, useState } from "react";

import useIndicatorCardViewModel from "./IndicatorCardViewModel";

import checkIcon from "./assets/checkIcon.svg";

const IndicatorCard = (props: IndicatorCardModel) => {
  const viewModel = useIndicatorCardViewModel(props);

  const [progressNow, setProgressNow] = useState(999);
  const [progressColor, setProgressColor] = useState("#D9D9D9");

  useEffect(() => {
    if (!viewModel.card.thisMonth) {
      if (viewModel.card.progress < viewModel.card.goal) {
        setProgressNow(0);
        setProgressColor("#F16062");
      } else if (viewModel.card.progress < viewModel.card.superGoal) {
        setProgressNow(1);
        setProgressColor("#AC72C1");
      } else if (viewModel.card.progress < viewModel.card.challenge) {
        setProgressNow(2);
        setProgressColor("#32B97C");
      } else {
        setProgressNow(3);
        setProgressColor("#6186D3");
      }
    }
  }, [viewModel, progressNow, progressColor]);

  return (
    <div className="bg-[#f5f5f56b] rounded-[20px] p-6 mb-3">
      <div className="flex justify-between items-center gap-3 mb-8">
        <div>
          <p className="font-poppins text-[16px] text-[#312843]">
            {viewModel.card.thisMonth ? "" : `#${viewModel.card.number} `}
            {viewModel.card.name}
          </p>
          <span className="font-poppins text-[14px] text-[#A3A3A3]">
            Peso: {viewModel.card.weight}
          </span>
        </div>
        <div
          className={`flex justify-center items-center min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] ${
            progressNow !== 999 ? `bg-[${progressColor}]` : "bg-[#D9D9D9]"
          } rounded-[50%]`}
        >
          <p
            className={`pt-[1px] font-poppins text-[20px] font-bold ${
              progressNow !== 999 ? "text-white" : "text-[#312843]"
            }`}
          >
            {viewModel.card.progress !== 0 ? viewModel.card.progress : "0"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-14">
        <div
          className={`relative pl-3 ${
            progressNow == 1 ? "goalsBorder goalsBorder1" : "goalsBorder"
          }`}
        >
          <span className="font-poppins text-[16px] text-[#312843]">Meta</span>
          {progressNow == 1 ? (
            <div
              className={`w-fit flex justify-center items-center gap-[10px] px-[10px] rounded-[10px] bg-[${progressColor}]`}
            >
              <img src={checkIcon} alt="" />
              <p className="font-poppins text-[20px] font-bold text-white translate-y-[1.3px]">
                {viewModel.card.goal}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {viewModel.card.goal}
            </p>
          )}
        </div>
        <div
          className={`relative pl-3 ${
            progressNow == 2 ? "goalsBorder goalsBorder2" : "goalsBorder"
          }`}
        >
          <span className="font-poppins text-[16px] text-[#312843]">
            Supermeta
          </span>
          {progressNow == 2 ? (
            <div
              className={`w-fit flex justify-center items-center gap-[10px] px-[10px] rounded-[10px] bg-[${progressColor}]`}
            >
              <img src={checkIcon} alt="" />
              <p className="font-poppins text-[20px] font-bold text-white translate-y-[1.3px]">
                {viewModel.card.superGoal}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {viewModel.card.superGoal}
            </p>
          )}
        </div>
        <div
          className={`relative pl-3 ${
            progressNow == 3 ? "goalsBorder goalsBorder3" : "goalsBorder"
          }`}
        >
          <span className="font-poppins text-[16px] text-[#312843]">
            Desafio
          </span>
          {progressNow == 3 ? (
            <div
              className={`w-fit flex justify-center items-center gap-[10px] px-[10px] rounded-[10px] bg-[${progressColor}]`}
            >
              <img src={checkIcon} alt="" />
              <p className="font-poppins text-[20px] font-bold text-white translate-y-[1.3px]">
                {viewModel.card.challenge}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {viewModel.card.challenge}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndicatorCard;
