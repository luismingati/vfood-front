import React from "react";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import ReachedIndicators from "../components/ReachedIndicators/ReachedIndicators";

const indicatorsArray = [
  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 18,
    unit: "Número",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 40 novos clientes",
    weight: 0.4,
    progress: 22,
    unit: "Financeiro",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 30 novos clientes",
    weight: 0.4,
    progress: 33,
    unit: "Percentual",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 10 novos clientes",
    weight: 0.4,
    progress: 44,
    unit: "Número",
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
];

interface ColaboratorsProps {}

const Colaborators: React.FC<ColaboratorsProps> = () => {
  return (
    <div className="flex flex-1 h-full w-full bg-white rounded-[20px] py-9 px-12">
      <IndicatorsSummary thisMonth={true} indicatorsArray={indicatorsArray} />
      <ReachedIndicators challenge={10} goal={60} supergoal={20} totalPercentage={90} />
    </div>
  );
};

export default Colaborators;
