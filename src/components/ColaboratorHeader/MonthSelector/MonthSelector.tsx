import React from "react";
import MonthSelectorModel from "./MonthSelectorModel";
import useMonthSelectorViewModel from "./MonthSelectorViewModel";

const MonthSelector: React.FC<MonthSelectorModel> = ({ onMonthChange }) => {
  const viewModel = useMonthSelectorViewModel({ onMonthChange });

  return (
    <div className="flex flex-row items-center justify-center gap-[19px] h-[40px] border-[2px] border-[#A3A3A3] rounded-[10px]">
      <button
        onClick={viewModel.goToPreviousMonth}
        className="h-[24px]"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <p className="font-poppins text-[18px] text-center w-[150px]">{viewModel.selectedMonth.toLocaleDateString("default", { month: "long", year: "numeric" })}</p>
      
      <button onClick={viewModel.goToNextMonth} className="h-[24px]" disabled={viewModel.shouldDisableNextMonth()}>
        <span className={`material-symbols-outlined ${viewModel.shouldDisableNextMonth() ? "text-[#A3A3A3]" : ""}`}>chevron_right</span>
      </button>
    </div>
  );
};

export default MonthSelector;
