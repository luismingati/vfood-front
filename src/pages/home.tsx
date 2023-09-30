import React, { useEffect, useState } from "react";
import Graph from "../components/Graph/Graph";
import Searchbar from "../components/Searchbar/Searchbar";
import MonthHighlight from "../components/MonthHighlight/MonthHighlight";
import ColaboratorCard from "../components/ColaboratorCard/ColaboratorCard";

const colaboratorsArray: ColaboratorCardModel[] = [
  {
    name: "Thales",
    role: "Dev",
    stars: 5,
  },
  {
    name: "Luis Felipe",
    role: "Dev",
    stars: 5,
  },
  {
    name: "Luis Otavio",
    role: "Dev",
    stars: 5,
  },
  {
    name: "Lucas",
    role: "Dev",
    stars: 5,
  },
  {
    name: "Antonio",
    role: "Dev",
    stars: 5,
  },
  {
    name: "Bruno",
    role: "Dev",
    stars: 4.1,
  },
  {
    name: "Ana Clara",
    role: "Dev",
    stars: 4.5,
  },
  {
    name: "Ana Beatriz",
    role: "Dev",
    stars: 3.2,
  },
  {
    name: "Carlos Eduardo",
    role: "Dev",
    stars: 2.5,
  },
  {
    name: "Ze",
    role: "Dev",
    stars: 1.5,
  },
  {
    name: "Pedro",
    role: "Dev",
    stars: 0.5,
  },
  {
    name: "Joao",
    role: "Dev",
    stars: 0.2,
  },
  {
    name: "Maria",
    role: "Dev",
    stars: 4,
  },
  {
    name: "Luis pedro",
    role: "Dev",
    stars: 3.1,
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

const Home: React.FC<HomeProps> = () => {
  const [valorDigitado, setValorDigitado] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(6);
  
  const handleSearch = (query: string) => {
    console.log(valorDigitado)
    setValorDigitado(query);
  };

  useEffect(() => {
    const colaboratorsDiv = document.querySelector(
      "#colaboratorsCardHomeDiv"
    ) as HTMLElement;
    const colaboratorsDivWidth = colaboratorsDiv.offsetWidth;

    setNumberOfCards(Math.floor(colaboratorsDivWidth / 174));
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-evenly h-full w-full bg-white rounded-[20px] py-9 px-12">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch} />
      <header className="mt-4 mb-3">
        <h1 className="font-poppins text-[32px] font-bold text-[#312843]">
          Dashboard
        </h1>
      </header>
      <div>
        <p className="font-poppins text-[18px] text-[#312843] mb-4">
          Resultados
        </p>
        <div className="flex gap-6">
          <Graph graphData={graphData} fullWidth={true} />
          <MonthHighlight month="Setembro" />
        </div>
      </div>
      <div>
        <p className="font-poppins text-[18px] text-[#312843] my-4">
        Ranking de colaboradores
        </p>
        <div id="colaboratorsCardHomeDiv" className="flex w-full gap-3">
          {colaboratorsArray.slice(0, numberOfCards).map((colaborator) => {
            return (
              <ColaboratorCard
                name={colaborator.name}
                role={colaborator.role}
                stars={colaborator.stars}
                avatar={colaborator.avatar}
                bg={colaborator.bg}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

interface HomeProps {}
