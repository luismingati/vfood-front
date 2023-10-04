import React, { useState } from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import ColaboratorHeader from "../components/ColaboratorHeader/ColaboratorHeader";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import NotReachedIndicatorCard from "../components/NotReachedIndicatorCard/NotReachedIndicatorCard";
import Graph from "../components/Graph/Graph";
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

const colaboratorsArray: ColaboratorCardModel[] = [
  {
    name: "Thales",
    role: "Dev",
    stars: 5,
    id: 1,
  },
  {
    name: "Luis Felipe",
    role: "Dev",
    stars: 5,
    id: 2,
  },
  {
    name: "Luis Otavio",
    role: "Dev",
    stars: 5,
    id: 3,
  },
  {
    name: "Lucas",
    role: "Dev",
    stars: 5,
    id: 4,
  },
  {
    name: "Antonio",
    role: "Dev",
    stars: 5,
    id: 5,
  },
  {
    name: "Bruno",
    role: "Dev",
    stars: 4.1,
    id: 6,
  },
  {
    name: "Ana Clara",
    role: "Dev",
    stars: 4.5,
    id: 7,
  },
  {
    name: "Ana Beatriz",
    role: "Dev",
    stars: 3.2,
    id: 8,
  },
  {
    name: "Carlos Eduardo",
    role: "Dev",
    stars: 2.5,
    id: 9,
  },
  {
    name: "Ze",
    role: "Dev",
    stars: 1.5,
    id: 10,
  },
  {
    name: "Pedro",
    role: "Dev",
    stars: 0.5,
    id: 11,
  },
  {
    name: "Joao",
    role: "Dev",
    stars: 0.2,
    id: 12,
  },
  {
    name: "Maria",
    role: "Dev",
    stars: 4,
    id: 13,
  },
  {
    name: "Luis pedro",
    role: "Dev",
    stars: 3.1,
    id: 14,
  },
];

const notReachedArray = [
  {
    name: "Vender 5 caixas",
    month: "Janeiro",
    score: 3,
  },
  {
    name: "Vender 10 produtos",
    month: "Fevereiro",
    score: 6,
  },
  {
    name: "Concluir relatório de vendas",
    month: "Março",
    score: 2,
  },
  // Você pode adicionar mais dados fictícios aqui
];

const Profile: React.FC<ProfileProps> = () => {
  const [valorDigitado, setValorDigitado] = useState("");

  const handleSearch = (query: string) => {
    setValorDigitado(query);
  };

  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full bg-white rounded-[20px] py-9 px-12">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch} />
      <ColaboratorHeader
        name={"Alice Martins"}
        role={"Manager"}
        stars={4.5}
        id={2}
      />

      <div className="flex gap-10">
        <div className="w-full">
          <IndicatorsSummary
            indicatorsArray={indicatorsArray}
            thisMonth={true}
            colabID={parseInt(
              window.location.href.charAt(window.location.href.length - 1)
            )}
          />
        </div>
        <div className="flex flex-col items-end w-full">
          <p className="h-[36px]">Baixar</p>
          <div className="flex justify-between gap-4 w-full">
            <ReachedIndicators
              challenge={10}
              goal={50}
              supergoal={20}
              totalPercentage={80}
            />
            <NotReachedIndicatorCard
              notReachedIndicatorCardData={notReachedArray}
            />
          </div>
        </div>
      </div>
      <Graph graphData={graphData} fullWidth={true} />
    </div>
  );
};

export default Profile;

interface ProfileProps {}
