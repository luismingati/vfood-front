import { useState } from "react";

import IndicatorCard from "../IndicatorCard/IndicatorCard";
import useIndicatorsSummaryViewModel from "./IndicatorsSummaryViewModel";

import starIcon from "./assets/starIcon.svg";
import graph from "./assets/graph.svg";
import plusIcon from "./assets/plusIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import backIcon from "./assets/backIcon.svg";

const IndicatorsSummary = (props: IndicatorsSummaryModel) => {
  const viewModel = useIndicatorsSummaryViewModel(props);
  const [modalFlag, setModalFlag] = useState(false);
  const [indicatorModalStep, setIndicatorModalStep] = useState(0);

  if (viewModel.indicatorsSummary.thisMonth) {
    return (
      <div className="w-full max-w-[506px]">
        <div className="flex justify-between items-center mb-4">
          <p className="font-poppins text-[16px] text-[#312843]">Indicadores</p>
          <button className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#952323] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2">
            <img src={plusIcon} alt="" />
            <span onClick={() => setModalFlag(true)}>Atribuir Indicador</span>
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

        {modalFlag && (
          <div className="fixed w-full h-full top-0 left-0 bg-[#00000067] flex justify-center items-center">
            <div className="w-full max-w-[393px] bg-white rounded-[10px] py-6 px-5">
              <div className="flex justify-center items-center w-full relative mb-7">
                <p className="font-poppins text-[18px] font-bold">
                  {indicatorModalStep == 1
                    ? "Criar novo indicador"
                    : indicatorModalStep == 2
                    ? "Atribuir indicador"
                    : "Atribuir indicador"}
                </p>
                <img
                  className="absolute right-4 cursor-pointer"
                  onClick={() => {
                    setModalFlag(false);
                    setIndicatorModalStep(0);
                  }}
                  src={closeIcon}
                  alt=""
                />
                {indicatorModalStep !== 0 && (
                  <img
                    className="absolute left-4 cursor-pointer"
                    onClick={() => {
                      setIndicatorModalStep(0);
                    }}
                    src={backIcon}
                    alt=""
                  />
                )}
              </div>

              {indicatorModalStep == 0 && (
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                  <button
                    onClick={() => setIndicatorModalStep(1)}
                    className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                  >
                    Criar novo indicador
                  </button>
                  <span className="font-poppins text-[16px]">ou</span>
                  <button
                    onClick={() => setIndicatorModalStep(2)}
                    className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                  >
                    Atribuir indicador já existente
                  </button>
                </div>
              )}

              {indicatorModalStep == 1 && (
                <div className="flex flex-col items-center justify-center gap-8 w-full">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor="IndicatorName"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Nome do indicador
                      </span>
                      <input
                        type="text"
                        id="IndicatorName"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>
                    <label
                      htmlFor="IndicatorWeight"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Peso
                      </span>
                      <input
                        type="text"
                        id="IndicatorWeight"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>
                    <label
                      htmlFor="IndicatorWeight"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Unidade de medida
                      </span>
                      <input
                        type="text"
                        id="IndicatorWeight"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>

                    <label
                      htmlFor="IndicatorGoal"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Meta
                      </span>
                      <input
                        type="text"
                        id="IndicatorGoal"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>

                    <label
                      htmlFor="IndicatorSupergoal"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Supermeta
                      </span>
                      <input
                        type="text"
                        id="IndicatorSupergoal"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>

                    <label
                      htmlFor="IndicatorChallenge"
                      className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                    >
                      <span className="font-poppins text-[14px] text-[#A3A3A3]">
                        Desafio
                      </span>
                      <input
                        type="text"
                        id="IndicatorChallenge"
                        placeholder=""
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                    </label>
                  </div>
                  <button className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold">
                    Concluir
                  </button>
                </div>
              )}

              {indicatorModalStep == 2 && (
                <div className="flex flex-col items-center justify-center gap-8 w-full">
                  <label
                    htmlFor="IndicatorName"
                    className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                  >
                    <span className="font-poppins text-[14px] text-[#A3A3A3]">
                      Nome do indicador
                    </span>
                    <input
                      type="text"
                      id="IndicatorName"
                      placeholder=""
                      className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    />
                  </label>
                  <button className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold">
                    Concluir
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
