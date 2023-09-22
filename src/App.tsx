import IndicatorsSummary from "./components/IndicatorsSummary/IndicatorsSummary";

const indicatorsArray = [
  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 18,
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 22,
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 33,
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },

  {
    name: "Converter 20 novos clientes",
    weight: 0.4,
    progress: 44,
    goal: 20,
    superGoal: 30,
    challenge: 40,
  },
];

export function App() {
  return (
    <div className="p-4">
      <IndicatorsSummary thisMonth={true} indicatorsArray={indicatorsArray} />
    </div>
  );
}
