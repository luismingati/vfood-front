import { useEffect, useState } from "react";

const useIndicatorsSummaryViewModel = (model: IndicatorsSummaryModel) => {
  const [indicatorsSummary, setIndicatorsSummary] =
    useState<IndicatorsSummaryModel>(model);

  useEffect(() => {
    setIndicatorsSummary(model);
  }, [model]);

  console.log(indicatorsSummary);
  return {
    indicatorsSummary,
  };
};

export default useIndicatorsSummaryViewModel;
