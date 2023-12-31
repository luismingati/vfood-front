import React, { useState, useEffect, useRef } from "react";
import ColaboratorHeader from "../components/ColaboratorHeader/ColaboratorHeader";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import NotReachedIndicatorCard from "../components/NotReachedIndicatorCard/NotReachedIndicatorCard";
import Graph from "../components/Graph/Graph";
import ReachedIndicators from "../components/ReachedIndicators/ReachedIndicators";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReactToPrint from "react-to-print";

let useEffectFlag = 0;

const monthArray = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface Meta {
  indicatorID: number;
  progress: number;
}

interface Indicator {
  id: number;
  name: string;
  weight: number;
  meta: number;
  supermeta: number;
  desafio: number;
}

interface BackendData {
  indicators: Indicator[];
  metas: Meta[];
  supermetas: Meta[];
  desafios: Meta[];
  notCompleted: Meta[];
}

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

const findProgressForIndicator = (
  indicatorId: number,
  arrays: Meta[][]
): number => {
  for (const arr of arrays) {
    const found = arr.find((item: Meta) => item.indicatorID === indicatorId);
    if (found) return found.progress;
  }
  return 0;
};

interface IndicatorCard {
  name: string;
  weight: number;
  progress: number;
  unit: string;
  goal: number;
  superGoal: number;
  challenge: number;
  id: number;
}

interface NotReachedIndicatorCardData {
  name: string;
  month: string;
  score: number;
}
const mapNotReachedIndicatorsToFrontend = (
  backendData: BackendData
): Array<NotReachedIndicatorCardData> => {
  return backendData.notCompleted.map((item: Meta) => ({
    name:
      backendData.indicators.find(
        (indicator) => indicator.id === item.indicatorID
      )?.name || "",
    month: "",
    score: item.progress || 0,
  }));
};

const mapBackendNames = (backendData: BackendData): Array<IndicatorCard> => {
  return backendData.indicators.map((indicator: Indicator) => {
    const progress = findProgressForIndicator(indicator.id, [
      backendData.metas,
      backendData.supermetas,
      backendData.desafios,
      backendData.notCompleted,
    ]);

    return {
      id: indicator.id,
      name: indicator.name,
      weight: indicator.weight,
      progress: progress,
      unit: "",
      goal: indicator.meta,
      superGoal: indicator.supermeta,
      challenge: indicator.desafio,
    };
  });
};

const ProfilePDF: React.FC<ProfilePDFProps> = () => {
  let componentRef = useRef();

  const { id } = useParams<{ id: string }>();
  interface ColaboratorData {
    id: number;
    name: string;
    area: string;
    grade: number;
  }

  const [data, setData] = useState<ColaboratorData>({} as ColaboratorData);
  const [indicatorsArray, setIndicatorsArray] = useState<Array<IndicatorCard>>(
    []
  );
  const [challengePercentage, setChallengePercentage] = useState(0);
  const [goalPercentage, setGoalPercentage] = useState(0);
  const [superGoalPercentage, setSuperGoalPercentage] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [notReachedIndicators, setNotReachedIndicators] = useState<
    Array<NotReachedIndicatorCardData>
  >([]);
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);

  const fetchColaboratorData = async (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    try {
      const response = await axios.get(
        `http://localhost:3000/colaborator/${id}?month=${month}&year=${year}`
      );
      document.title = `${response.data.name} - ${monthArray[month - 1]}`;
      const transformedData = mapBackendNames(response.data);
      const challengePercentage =
        (response.data.desafios.length / response.data.indicators.length) *
          100 || 0;
      const goalPercentage =
        (response.data.metas.length / response.data.indicators.length) * 100 ||
        0;
      const superGoalPercentage =
        (response.data.supermetas.length / response.data.indicators.length) *
          100 || 0;
      const notReachedIndicators = mapNotReachedIndicatorsToFrontend(
        response.data
      );

      setData(response.data);
      setIndicatorsArray(transformedData);
      setNotReachedIndicators(notReachedIndicators);
      setChallengePercentage(challengePercentage);
      setGoalPercentage(goalPercentage);
      setSuperGoalPercentage(superGoalPercentage);
      setTotalPercentage(
        challengePercentage + goalPercentage + superGoalPercentage
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        `http://localhost:3000/graph/all-graph-data/${id}`
      );
      const data = await response.json();

      const graphData = transformApiResponse(data, new Date().getMonth());

      setGraphData(graphData);
    } catch (error) {
      console.log("Não foi possível resgatar os dados", error);
    }
  };
  useEffect(() => {
    if (!useEffectFlag) {
      fetchGraphData();
      fetchColaboratorData(new Date());
      useEffectFlag = 1;
    }
  });

  return (
    <div className="flex flex-col items-center gap-4 py-3 bg-[#952323]">
      <p className="font-poppins text-center text-[16px] text-white w-1/2 ">
        Aqui você pode ver o relatório do(a) colaborador(a) {data.name}. Se
        estiver tudo certo, clique no botão abaixo para fazer o download em PDF!
      </p>
      <ReactToPrint
        trigger={() => (
          <button className="font-poppins text-center text-[16px] text-[#952323] bg-white py-2 px-5 rounded-2xl hover:bg-[#381313] hover:text-white transition-all duration-300">
            Baixar relatório
          </button>
        )}
        content={() => componentRef}
      />
      <div
        ref={(el) => (componentRef = el)}
        className="p-8 flex flex-col items-center gap-5 w-full max-w-[1178px] mx-auto bg-white rounded-[20px]"
      >
        <ColaboratorHeader
          id={data.id}
          name={data.name}
          role={data.area}
          stars={data.grade}
          onMonthChange={() => {}}
          profilePDF={true}
        />

        <hr className="h-[1px] w-full " />

        <div className="flex gap-10">
          <div className="flex flex-col items-end w-full">
            <div className="flex justify-between gap-4 w-full">
              <ReachedIndicators
                challenge={challengePercentage}
                goal={goalPercentage}
                supergoal={superGoalPercentage}
                totalPercentage={totalPercentage}
              />
              <NotReachedIndicatorCard
                notReachedIndicatorCardData={notReachedIndicators}
              />
            </div>
          </div>
        </div>

        <IndicatorsSummary
          indicatorsArray={indicatorsArray}
          thisMonth={true}
          colabID={parseInt(
            window.location.href.charAt(window.location.href.length - 1)
          )}
          profilePDF={true}
          updateData={() => {}}
        />
        <Graph graphData={graphData} fullWidth={true} />
      </div>
    </div>
  );
};

export default ProfilePDF;

interface ProfilePDFProps {}
