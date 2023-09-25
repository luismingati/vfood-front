import React from "react";
import Graph from "../components/Graph/Graph";

const graphData = [
  {
    nGoal: 70,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
  {
    nGoal: 80,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
  {
    nGoal: 85,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
  {
    nGoal: 80,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
  {
    nGoal: 90,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
  {
    nGoal: 80,
    nSuperGoal: 60,
    nChallenge: 30,
    nFailed: 15,
  },
];

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="flex flex-1 h-full w-full bg-white rounded-[20px] py-9 px-12">
      <Graph graphData={graphData} fullWidth={true} />
    </div>
  );
};

export default Home;

interface HomeProps {}
