import { Router } from "./router";
import IndicatorsSummary from "./components/IndicatorsSummary/IndicatorsSummary";

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

export function App() {
  return (
    <>
      <IndicatorsSummary thisMonth={true} indicatorsArray={indicatorsArray} />
      <Router />
    </>
  );
}
