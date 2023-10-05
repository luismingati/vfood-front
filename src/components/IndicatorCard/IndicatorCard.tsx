import useIndicatorCardViewModel from "./IndicatorCardViewModel";

import checkIcon from "./assets/checkIcon.svg";
import editIcon from "./assets/editIcon.svg";
import closeIcon from "./assets/closeIcon.svg";
import expandSelectIcon from "./assets/expandSelectIcon.svg";

const IndicatorCard = (props: IndicatorCardModel) => {
  const {
    indicatorCard,
    editIndicatorModalFlag,
    changeEditIndicatorModalFlag,
    editResultsModalFlag,
    changeEditResultsModalFlag,
    unitOptionsFlag,
    changeUnitOptionsFlag,
    unit,
    changeUnit,
    handleEditIndicator,
    handleEditIndicatorResult,
    progressNow,
    progressColor,
    setName,
    setWeight,
    setGoal,
    setSuperGoal,
    setChallenge,
    handleOverlayClickEditIndicator,
    handleOverlayClickEditResults,
  } = useIndicatorCardViewModel(props);

  return (
    <div className="bg-[#f5f5f56b] rounded-[20px] p-6">
      <div className="flex justify-between items-center gap-3 mb-8">
        <div>
          <div className="flex gap-2.5">
            <p className="font-poppins text-[16px] text-[#312843]">
              {indicatorCard.thisMonth ? "" : `#${indicatorCard.number} `}
              {indicatorCard.name}
            </p>
            <img
              onClick={() => changeEditIndicatorModalFlag()}
              className="cursor-pointer"
              src={editIcon}
              alt=""
            />
          </div>
          <span className="font-poppins text-[14px] text-[#A3A3A3]">
            Peso: {indicatorCard.weight}
          </span>
        </div>
        <div
          className={`flex justify-center items-center min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px] ${
            progressNow !== 999 ? `bg-[${progressColor}]` : "bg-[#D9D9D9]"
          } rounded-[50%] cursor-pointer`}
          onClick={() => changeEditResultsModalFlag()}
        >
          <p
            className={`pt-[1px] font-poppins text-[20px] font-bold ${
              progressNow !== 999 ? "text-white" : "text-[#312843]"
            }`}
          >
            {indicatorCard.progress}
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
                {indicatorCard.goal}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {indicatorCard.goal}
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
                {indicatorCard.superGoal}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {indicatorCard.superGoal}
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
                {indicatorCard.challenge}
              </p>
            </div>
          ) : (
            <p className="font-poppins text-[20px] font-bold text-[#312843]">
              {indicatorCard.challenge}
            </p>
          )}
        </div>
      </div>

      {editIndicatorModalFlag && (
        <div
          onClick={handleOverlayClickEditIndicator}
          className="fixed w-full h-full top-0 left-0 bg-[#00000067] flex justify-center items-center"
        >
          <div className="w-full max-w-[393px] bg-white rounded-[10px] py-6 px-5">
            <div className="flex justify-center items-center w-full relative mb-7">
              <p className="font-poppins text-[18px] font-bold">
                Editar indicador
              </p>
              <img
                className="absolute right-4 cursor-pointer"
                onClick={() => {
                  changeEditIndicatorModalFlag();
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
                    defaultValue={indicatorCard.name}
                    onChange={(e) => setName(e.target.value)}
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
                    defaultValue={indicatorCard.weight}
                    onChange={(e) => setWeight(e.target.value)}
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
                      unitOptionsFlag ? "hidden" : unit === "" ? "hidden" : ""
                    } mb-2 select-none caret-transparent disabled w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]`}
                    value={unit}
                    readOnly
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
                    defaultValue={indicatorCard.goal}
                    onChange={(e) => setGoal(e.target.value)}
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
                    defaultValue={indicatorCard.superGoal}
                    onChange={(e) => setSuperGoal(e.target.value)}
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
                    defaultValue={indicatorCard.challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                  />
                </label>
              </div>
              <button
                onClick={handleEditIndicator}
                className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {editResultsModalFlag && (
        <div
          onClick={handleOverlayClickEditResults}
          className="fixed w-full h-full top-0 left-0 bg-[#00000067] flex justify-center items-center"
        >
          <div className="w-full max-w-[393px] bg-white rounded-[10px] py-6 px-5">
            <div className="flex justify-center items-center w-full relative mb-7">
              <p className="font-poppins text-[18px] font-bold">
                Inserir resultado
              </p>
              <img
                className="absolute right-4 cursor-pointer"
                onClick={() => {
                  changeEditResultsModalFlag();
                }}
                src={closeIcon}
                alt=""
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label
                  htmlFor="indicatorNewProgress"
                  className="overflow-hidden rounded-[10px] border border-[#A3A3A3] px-3 pt-1 pb-2 shadow-none w-full"
                >
                  <span className="font-poppins text-[14px] text-[#A3A3A3]">
                    Resultado obtido
                  </span>
                  <input
                    type="text"
                    id="indicatorNewProgress"
                    placeholder=""
                    className="w-full border-none focus:border-transparent focus:outline-none focus:ring-0 font-poppins text-[16px] text-[#312843]"
                    defaultValue={indicatorCard.progress}
                  />
                </label>
              </div>
              <button
                onClick={handleEditIndicatorResult}
                className="w-full max-w-[352px] min-h-[60px] bg-[#952323] rounded-[10px] text-white font-poppins text-[16px] font-semibold"
              >
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
