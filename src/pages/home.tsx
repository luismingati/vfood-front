import React, { useEffect, useState } from "react";
import Graph from "../components/Graph/Graph";
import Searchbar from "../components/Searchbar/Searchbar";
import MonthHighlight from "../components/MonthHighlight/MonthHighlight";
import ColaboratorCard from "../components/ColaboratorCard/ColaboratorCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ApiResponse {
  [month: string]: {
    [type: string]: number;
  };
}

interface GraphDataItem {
  nGoal: number;
  nSuperGoal: number;
  nChallenge: number;
  nFailed: number;
}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [valorDigitado, setValorDigitado] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(6);
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);

  const date = new Date();
  const currentMonth = date.toLocaleDateString("pt-BR", { month: "long" });
  const currentMonthCapitalized =
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

  const [colaboratorsArray, setColaboratorsArray] = useState<
    ColaboratorCardModel[]
  >([]);

  const handleSearch = (query: string) => {
    if (query !== "") {
      navigate(`/colaborators`);
    }
  };

  useEffect(() => {
    const colaboratorsDiv = document.querySelector(
      "#colaboratorsCardHomeDiv"
    ) as HTMLElement;
    const colaboratorsDivWidth = colaboratorsDiv.offsetWidth;

    setNumberOfCards(Math.floor(colaboratorsDivWidth / 174));

    function transformApiResponse(
      apiResponse: ApiResponse,
      currentMonth: number
    ): GraphDataItem[] {
      const graphData: GraphDataItem[] = [];

      for (let i = 0; i < 6; i++) {
        const monthData = apiResponse[currentMonth.toString()] || {};

        const nGoal = monthData["1"] || 0;
        const nSuperGoal = monthData["2"] || 0;
        const nChallenge = monthData["3"] || 0;
        const nFailed = monthData["0"] || 0;

        graphData.unshift({ nGoal, nSuperGoal, nChallenge, nFailed });

        currentMonth--;
        if (currentMonth < 1) {
          break;
        }
      }

      return graphData;
    }

    const fetchGraphData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/graph/all-graph-data"
        );
        const data = await response.json();

        const graphData = transformApiResponse(data, new Date().getMonth());

        setGraphData(graphData);
      } catch (error) {
        console.log("Não foi possível resgatar os dados", error);
      }
    };

    fetchGraphData();

    axios
      .get("http://localhost:3000/colaborator/")
      .then((response) => {
        const colaboratorsData = response.data.map(
          (item: {
            id: number;
            name: string;
            area: string;
            grade: number;
          }) => ({
            id: item.id,
            name: item.name,
            role: item.area,
            stars: item.grade,
          })
        );
        colaboratorsData.sort(function (
          a: { name: string; role: string; stars: number },
          b: { name: string; role: string; stars: number }
        ) {
          return a.stars > b.stars ? -1 : a.stars < b.stars ? 1 : 0;
        });
        setColaboratorsArray(colaboratorsData);
      })
      .catch((error) => {
        console.error("Erro ao buscar colaboradores:", error);
      });
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
          <MonthHighlight month={currentMonthCapitalized} />
        </div>
      </div>
      <div>
        <p className="font-poppins text-[18px] text-[#312843] my-4">
          Ranking de colaboradores
        </p>
        <div id="colaboratorsCardHomeDiv" className="flex w-full gap-3">
          {colaboratorsArray
            .slice(0, numberOfCards)
            .map((colaborator, index) => {
              return (
                <ColaboratorCard
                  key={index}
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
