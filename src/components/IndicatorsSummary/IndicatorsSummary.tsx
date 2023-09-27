import IndicatorCard from "../IndicatorCard/IndicatorCard";
import useIndicatorsSummaryViewModel from "./IndicatorsSummaryViewModel";

import starIcon from "./assets/starIcon.svg";
import plusIcon from "./assets/plusIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import backIcon from "./assets/backIcon.svg";
import expandSelectIcon from "./assets/expandSelectIcon.svg";

import { Doughnut } from "react-chartjs-2";

// Sem essas linhas ele dá um erro dizendo que o elemento "arc" não foi registrado
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
// Sem essas linhas ele dá um erro dizendo que o elemento "arc" não foi registrado

const IndicatorsSummary = (props: IndicatorsSummaryModel) => {
  const {
    indicatorsSummary,
    modalFlag,
    openModal,
    closeModal,
    indicatorModalStep,
    changeModalStep,
    unitOptionsFlag,
    changeUnitOptionsFlag,
    unit,
    changeUnit,
    indicatorsSearchResultsArray,
    handleSearchIndicators,
    indicatorsSearchValue,
    handleChangeInputValue,
    getGraphLabels,
    getGraphData,
    handleSaveNewIndicator,
    handleAttachIndicator,
  } = useIndicatorsSummaryViewModel(props);

  if (indicatorsSummary.indicatorsArray.length == 0) {
    return (
      <div className="w-full max-w-[508px] pr-[2px] max-h-[289px] overflow-auto no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <p className="font-poppins text-[16px] text-[#312843]">Indicadores</p>
        </div>

        <div className="bg-[#f5f5f56b] h-[202px] rounded-[20px] p-6 mb-3 flex flex-col justify-center items-center gap-7">
          <p className="font-poppins text-[16px] text-[#312843] max-w-[325px] text-center">
            Nenhum indicador foi atribuído à este colaborador.
          </p>
          <button
            onClick={() => openModal()}
            className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#952323] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2"
          >
            <img src={plusIcon} alt="" />
            <span>Atribuir Indicador</span>
          </button>
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
                    closeModal();
                    changeModalStep(0);
                  }}
                  src={closeIcon}
                  alt=""
                />
                {indicatorModalStep !== 0 && (
                  <img
                    className="absolute left-4 cursor-pointer"
                    onClick={() => {
                      changeModalStep(0);
                    }}
                    src={backIcon}
                    alt=""
                  />
                )}
              </div>

              {indicatorModalStep == 0 && (
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                  <button
                    onClick={() => changeModalStep(1)}
                    className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                  >
                    Criar novo indicador
                  </button>
                  <span className="font-poppins text-[16px]">ou</span>
                  <button
                    onClick={() => changeModalStep(2)}
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
                        onClick={() => changeUnitOptionsFlag()}
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
                          unitOptionsFlag
                            ? "hidden"
                            : unit === ""
                            ? "hidden"
                            : ""
                        } mb-2 select-none caret-transparent disabled w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]`}
                        value={unit}
                      />
                      <ul
                        className={`flex flex-col gap-1 ${
                          unit === "" ? "mt-4" : unitOptionsFlag ? "mt-4" : ""
                        } font-poppins text-[16px] text-[#312843] transition-all duration-300`}
                      >
                        <li
                          className={`cursor-pointer ${
                            unit == "Número" ? "font-bold" : ""
                          }`}
                          onClick={() => {
                            changeUnit("Número");
                            changeUnitOptionsFlag();
                          }}
                        >
                          Número
                        </li>
                        <li
                          className={`cursor-pointer ${
                            unit == "Financeiro" ? "font-bold" : ""
                          }`}
                          onClick={() => {
                            changeUnit("Financeiro");
                            changeUnitOptionsFlag();
                          }}
                        >
                          Financeiro
                        </li>
                        <li
                          className={`cursor-pointer ${
                            unit == "Percentual" ? "font-bold" : ""
                          }`}
                          onClick={() => {
                            changeUnit("Percentual");
                            changeUnitOptionsFlag();
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
                      />
                    </label>
                  </div>
                  <button
                    onClick={handleSaveNewIndicator}
                    className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                  >
                    Concluir
                  </button>
                </div>
              )}

              {indicatorModalStep == 2 && (
                <div className="flex flex-col items-center justify-center gap-8 w-full">
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
                      onKeyUp={(e) => handleSearchIndicators(e)}
                      onInput={(e) => handleSearchIndicators(e)}
                      onKeyDown={(e) => handleSearchIndicators(e)}
                      onMouseMove={(e) => handleSearchIndicators(e)}
                      value={indicatorsSearchValue}
                      className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    />
                    <ul className="font-poppins text-[16px] text-[#7c7c7c] [&>*:first-child]:mt-2 [&>*:first-child]:border-t-2 [&>*:first-child]:pt-2 flex flex-col gap-1">
                      {indicatorsSearchResultsArray.map((indicator, index) => {
                        return (
                          <li
                            className="hover:text-[#312843] cursor-pointer"
                            onClick={() =>
                              handleChangeInputValue(indicator.name)
                            }
                            key={index}
                          >
                            {indicator.name}
                          </li>
                        );
                      })}
                    </ul>
                  </label>
                  <button
                    onClick={handleAttachIndicator}
                    className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                  >
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
    if (indicatorsSummary.thisMonth) {
      return (
        <div className="w-full max-w-[508px] pr-[2px] max-h-[289px] overflow-auto  no-scrollbar [&>*:last-child]:flex [&>*:last-child]:flex-col [&>*:last-child]:gap-3">
          <div className="flex justify-between items-center mb-4">
            <p className="font-poppins text-[16px] text-[#312843]">
              Indicadores
            </p>
            <button
              onClick={() => openModal()}
              className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#952323] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2"
            >
              <img src={plusIcon} alt="" />
              <span>Atribuir Indicador</span>
            </button>
          </div>
          <div>
            {indicatorsSummary.indicatorsArray.map((indicatorCard, index) => {
              return (
                <IndicatorCard
                  key={index}
                  number={index + 1}
                  thisMonth={indicatorsSummary.thisMonth}
                  name={indicatorCard.name}
                  weight={indicatorCard.weight}
                  progress={indicatorCard.progress}
                  unit={indicatorCard.unit}
                  goal={indicatorCard.goal}
                  superGoal={indicatorCard.superGoal}
                  challenge={indicatorCard.challenge}
                />
              );
            })}
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
                      closeModal();
                      changeModalStep(0);
                    }}
                    src={closeIcon}
                    alt=""
                  />
                  {indicatorModalStep !== 0 && (
                    <img
                      className="absolute left-4 cursor-pointer"
                      onClick={() => {
                        changeModalStep(0);
                      }}
                      src={backIcon}
                      alt=""
                    />
                  )}
                </div>

                {indicatorModalStep == 0 && (
                  <div className="flex flex-col items-center justify-center gap-5 w-full">
                    <button
                      onClick={() => changeModalStep(1)}
                      className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                    >
                      Criar novo indicador
                    </button>
                    <span className="font-poppins text-[16px]">ou</span>
                    <button
                      onClick={() => changeModalStep(2)}
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
                          onClick={() => changeUnitOptionsFlag()}
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
                            unitOptionsFlag
                              ? "hidden"
                              : unit === ""
                              ? "hidden"
                              : ""
                          } mb-2 select-none caret-transparent disabled w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]`}
                          value={unit}
                        />
                        <ul
                          className={`flex flex-col gap-1 ${
                            unit === "" ? "mt-4" : unitOptionsFlag ? "mt-4" : ""
                          } font-poppins text-[16px] text-[#312843] transition-all duration-300`}
                        >
                          <li
                            className={`cursor-pointer ${
                              unit == "Número" ? "font-bold" : ""
                            }`}
                            onClick={() => {
                              changeUnit("Número");
                              changeUnitOptionsFlag();
                            }}
                          >
                            Número
                          </li>
                          <li
                            className={`cursor-pointer ${
                              unit == "Financeiro" ? "font-bold" : ""
                            }`}
                            onClick={() => {
                              changeUnit("Financeiro");
                              changeUnitOptionsFlag();
                            }}
                          >
                            Financeiro
                          </li>
                          <li
                            className={`cursor-pointer ${
                              unit == "Percentual" ? "font-bold" : ""
                            }`}
                            onClick={() => {
                              changeUnit("Percentual");
                              changeUnitOptionsFlag();
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
                        />
                      </label>
                    </div>
                    <button
                      onClick={handleSaveNewIndicator}
                      className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                    >
                      Concluir
                    </button>
                  </div>
                )}

                {indicatorModalStep == 2 && (
                  <div className="flex flex-col items-center justify-center gap-8 w-full">
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
                        onKeyUp={(e) => handleSearchIndicators(e)}
                        onInput={(e) => handleSearchIndicators(e)}
                        onKeyDown={(e) => handleSearchIndicators(e)}
                        onMouseMove={(e) => handleSearchIndicators(e)}
                        value={indicatorsSearchValue}
                        className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                      />
                      <ul className="font-poppins text-[16px] text-[#7c7c7c] [&>*:first-child]:mt-2 [&>*:first-child]:border-t-2 [&>*:first-child]:pt-2 flex flex-col gap-1">
                        {indicatorsSearchResultsArray.map(
                          (indicator, index) => {
                            return (
                              <li
                                className="hover:text-[#312843] cursor-pointer"
                                onClick={() =>
                                  handleChangeInputValue(indicator.name)
                                }
                                key={index}
                              >
                                {indicator.name}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </label>
                    <button
                      onClick={handleAttachIndicator}
                      className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
                    >
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
        <div className="w-full max-w-[508px] pr-[2px] max-h-[289px] overflow-auto no-scrollbar [&>*:last-child]:flex [&>*:last-child]:flex-col [&>*:last-child]:gap-3">
          <div className="flex justify-between items-center mb-4">
            <p className="font-poppins text-[16px] text-[#312843]">
              Indicadores
            </p>
            <button className="font-poppins text-[16px] font-bold text-[#FDFDFD] bg-[#A3A3A3] px-4 py-[6px] rounded-lg flex justify-between items-center gap-2 pointer-events-none">
              <img src={plusIcon} alt="" />
              <span>Atribuir Indicador</span>
            </button>
          </div>
          <div className="bg-[#f5f5f56b] rounded-[20px] p-6 mb-3 flex gap-7">
            <div className="flex items-center gap-3 w-2/3">
              <div className="max-w-[104px] max-h-[104px]">
                <Doughnut
                  data={{
                    labels: getGraphLabels(),
                    datasets: [
                      {
                        label: "Month Results",
                        data: getGraphData(),
                        backgroundColor: [
                          "#AC72C1",
                          "#32B97C",
                          "#6186D3",
                          "#A3A3A3",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
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
              {indicatorsSummary.indicatorsArray.map((indicatorCard, index) => {
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
              })}
            </div>
          </div>
          <div>
            {indicatorsSummary.indicatorsArray.map((indicatorCard, index) => {
              return (
                <IndicatorCard
                  number={index + 1}
                  thisMonth={indicatorsSummary.thisMonth}
                  name={indicatorCard.name}
                  weight={indicatorCard.weight}
                  progress={indicatorCard.progress}
                  unit={indicatorCard.unit}
                  goal={indicatorCard.goal}
                  superGoal={indicatorCard.superGoal}
                  challenge={indicatorCard.challenge}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
};

export default IndicatorsSummary;
