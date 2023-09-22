import { useEffect, useState } from "react";

import useIndicatorCardViewModel from "./IndicatorCardViewModel";

import checkIcon from "./assets/checkIcon.svg";
import editIcon from "./assets/editIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import expandSelectIcon from "./assets/expandSelectIcon.svg";

const IndicatorCard = (props: IndicatorCardModel) => {
  const viewModel = useIndicatorCardViewModel(props);

  const [editIndicatorModalFlag, setEditIndicatorModalFlag] = useState(false);
  const [editResultsModalFlag, setEditResultsModalFlag] = useState(false);
  const [unitOptionsFlag, setUnitOptionsFlag] = useState(false);
  const [unit, setUnit] = useState("");

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
          <div className="flex gap-2.5">
            <p className="font-poppins text-[16px] text-[#312843]">
              {viewModel.card.thisMonth ? "" : `#${viewModel.card.number} `}
              {viewModel.card.name}
            </p>
            <img
              onClick={() => setEditIndicatorModalFlag(true)}
              className="cursor-pointer"
              src={editIcon}
              alt=""
            />
          </div>
          <span className="font-poppins text-[14px] text-[#A3A3A3]">
            Peso: {viewModel.card.weight}
          </span>
        </div>
        <div
          className={`flex justify-center items-center min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] ${
            progressNow !== 999 ? `bg-[${progressColor}]` : "bg-[#D9D9D9]"
          } rounded-[50%] cursor-pointer`}
          onClick={() => setEditResultsModalFlag(true)}
        >
          <p
            className={`pt-[1px] font-poppins text-[20px] font-bold ${
              progressNow !== 999 ? "text-white" : "text-[#312843]"
            }`}
          >
            {viewModel.card.progress}
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

      {editIndicatorModalFlag && (
        <div className="fixed w-full h-full top-0 left-0 bg-[#00000067] flex justify-center items-center">
          <div className="w-full max-w-[393px] bg-white rounded-[10px] py-6 px-5">
            <div className="flex justify-center items-center w-full relative mb-7">
              <p className="font-poppins text-[18px] font-bold">
                Editar indicador
              </p>
              <img
                className="absolute right-4 cursor-pointer"
                onClick={() => {
                  setEditIndicatorModalFlag(false);
                }}
                src={closeIcon}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="indicatorName"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Nome do indicador
                  </span>
                  <input
                    type="text"
                    id="indicatorName"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.name}
                  />
                </label>
                <label
                  htmlFor="indicatorWeight"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Peso
                  </span>
                  <input
                    type="text"
                    id="indicatorWeight"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.weight}
                  />
                </label>
                <label
                  htmlFor="indicatorUnit"
                  className={`overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 py-2.5 shadow-none w-full  ${
                    unitOptionsFlag
                      ? "max-h-[144px]"
                      : unit === ""
                      ? "max-h-[42px]"
                      : "max-h-[68px]"
                  } transition-all duration-300`}
                >
                  <div
                    onClick={() => setUnitOptionsFlag(!unitOptionsFlag)}
                    className="flex justify-between items-center pr-2 cursor-pointer"
                  >
                    <span className="font-poppins text-[14px] text-[#A3A3A3]">
                      Unidade de medida
                    </span>
                    <img
                      className={`${
                        unitOptionsFlag ? "" : "rotate-180"
                      } transition-all duration-300`}
                      src={expandSelectIcon}
                      alt=""
                    />
                  </div>
                  <input
                    type="text"
                    id="indicatorUnit"
                    className={`${
                      unitOptionsFlag ? "hidden" : unit === "" ? "hidden" : ""
                    } mb-2 select-none caret-transparent disabled w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]`}
                    value={unit}
                  />
                  <ul
                    className={`flex flex-col gap-1 ${
                      unit === ""
                        ? "mt-4"
                        : unitOptionsFlag
                        ? "mt-4"
                        : ""
                    } font-poppins text-[16px] text-[#312843] transition-all duration-300`}
                  >
                    <li
                      className={`cursor-pointer ${
                        unit == "Número" ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        setUnit("Número");
                        setUnitOptionsFlag(!unitOptionsFlag);
                      }}
                    >
                      Número
                    </li>
                    <li
                      className={`cursor-pointer ${
                        unit == "Financeiro" ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        setUnit("Financeiro");
                        setUnitOptionsFlag(!unitOptionsFlag);
                      }}
                    >
                      Financeiro
                    </li>
                    <li
                      className={`cursor-pointer ${
                        unit == "Percentual" ? "font-bold" : ""
                      }`}
                      onClick={() => {
                        setUnit("Percentual");
                        setUnitOptionsFlag(!unitOptionsFlag);
                      }}
                    >
                      Percentual
                    </li>
                  </ul>
                </label>
                <label
                  htmlFor="indicatorGoal"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Meta
                  </span>
                  <input
                    type="text"
                    id="indicatorGoal"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.goal}
                  />
                </label>
                <label
                  htmlFor="indicatorSupergoal"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Supermeta
                  </span>
                  <input
                    type="text"
                    id="indicatorSupergoal"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.superGoal}
                  />
                </label>
                <label
                  htmlFor="indicatorChallenge"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Desafio
                  </span>
                  <input
                    type="text"
                    id="indicatorChallenge"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.challenge}
                  />
                </label>
              </div>
              <button className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold">
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {editResultsModalFlag && (
        <div className="fixed w-full h-full top-0 left-0 bg-[#00000067] flex justify-center items-center">
          <div className="w-full max-w-[393px] bg-white rounded-[10px] py-6 px-5">
            <div className="flex justify-center items-center w-full relative mb-7">
              <p className="font-poppins text-[18px] font-bold">
                Inserir resultado
              </p>
              <img
                className="absolute right-4 cursor-pointer"
                onClick={() => {
                  setEditResultsModalFlag(false);
                }}
                src={closeIcon}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="indicatorWeight"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Resultado obtido
                  </span>
                  <input
                    type="text"
                    id="indicatorWeight"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    value={viewModel.card.progress}
                  />
                </label>
              </div>
              <button className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold">
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndicatorCard;
