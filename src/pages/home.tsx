import React, { useEffect, useState } from "react";
import Graph from "../components/Graph/Graph";
import Searchbar from "../components/Searchbar/Searchbar";
import MonthHighlight from "../components/MonthHighlight/MonthHighlight";
import ColaboratorCard from "../components/ColaboratorCard/ColaboratorCard";
import axios from "axios";

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
  const [colaboratorsArray, setColaboratorsArray] = useState<
    ColaboratorCardModel[]
  >([]);

  const handleSearch = (query: string) => {
    setValorDigitado(query);
  };

  useEffect(() => {
    const colaboratorsDiv = document.querySelector(
      "#colaboratorsCardHomeDiv"
    ) as HTMLElement;
    const colaboratorsDivWidth = colaboratorsDiv.offsetWidth;

    setNumberOfCards(Math.floor(colaboratorsDivWidth / 174));

    axios
      .get("http://localhost:3000/colaborator/")
      .then((response) => {
        const colaboratorsData = response.data.map(
          (item: { name: string; area: string; grade: number }) => ({
            name: item.name,
            role: item.area,
            stars: item.grade,
          })
        );
        colaboratorsData.sort(function (a: { name: string; role: string; stars: number }, b: { name: string; role: string; stars: number }) {
          return a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0;
        });
        setColaboratorsArray(colaboratorsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores:", error);
      });
  }, [colaboratorsArray]);

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
                id={colaborator.id}
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
