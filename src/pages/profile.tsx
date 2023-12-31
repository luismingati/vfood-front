import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import ColaboratorHeader from "../components/ColaboratorHeader/ColaboratorHeader";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import NotReachedIndicatorCard from "../components/NotReachedIndicatorCard/NotReachedIndicatorCard";
import Graph from "../components/Graph/Graph";
import ReachedIndicators from "../components/ReachedIndicators/ReachedIndicators";
import { useParams } from "react-router-dom";
import axios from "axios";

import pdfIcon from "./assets/pdfFile.svg";
import { useNavigate } from "react-router-dom";
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

interface Meta {
  indicatorID: number;
  progress: number;
}

interface Indicator {
  id: number;
  name: string;
  weight: number;
  unit: string;
  type: string;
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
  goal: number;
  unit: string;
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

interface ProfileProps {}

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
      unit: indicator.type,
      goal: indicator.meta,
      superGoal: indicator.supermeta,
      challenge: indicator.desafio,
    };
  });
};

const Profile: React.FC<ProfileProps> = () => {
  const navigate = useNavigate();
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
  const [useEffectFlag, setUseEffectFlag] = useState(0);
  const [handleMonthFlag, setHandleMonthFlag] = useState(0);
  const [month, setMonth] = useState<Date>();

  const [isCurrentDate, setIsCurrentDate] = useState(true);
  const [valorDigitado, setValorDigitado] = useState("");

  const handleSearch = (value: string) => {
    setValorDigitado(value);
  };

  const updateData = () => {
    setUseEffectFlag(0);
  };

  const updateMonth = (date: Date) => {
    setHandleMonthFlag(0);
    setMonth(date);
  };

  const fetchColaboratorData = async (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    try {
      const response = await axios.get(
        `http://localhost:3000/colaborator/${id}?month=${month}&year=${year}`
      );
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
    fetchGraphData();

    if (!useEffectFlag) {
      fetchColaboratorData(new Date());
      setUseEffectFlag(1);
    }

    if (!handleMonthFlag) {
      if (
        month &&
        month.getMonth() + 1 === new Date().getMonth() + 1 &&
        month.getFullYear() === new Date().getFullYear()
      ) {
        setIsCurrentDate(true);
      } else {
        if (month == undefined) {
          setIsCurrentDate(true);
        } else {
          setIsCurrentDate(false);
        }
      }

      if (month) {
        fetchColaboratorData(month);
        fetchGraphData();
      }
      setHandleMonthFlag(1);
    }
  }, [id, useEffectFlag, month]);
  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full bg-white rounded-[20px] py-9 px-12 overflow-y-auto no-scrollbar">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch} />
      <div className="mt-4"></div>
      <ColaboratorHeader
        id={data.id}
        name={data.name}
        role={data.area}
        stars={data.grade}
        onMonthChange={updateMonth}
        profilePDF={false}
      />
      <div className="mb-3"></div>

      <div className="flex gap-10 mb-5">
        <div className="w-full">
          <IndicatorsSummary
            indicatorsArray={indicatorsArray}
            thisMonth={isCurrentDate}
            colabID={Number(id)}
            profilePDF={false}
            updateData={updateData}
          />
        </div>
        <div className="flex flex-col items-end w-full">
          <div
            className="flex items-center gap-3 mb-[14px] cursor-pointer"
            onClick={() => window.open(`/colaborators/pdf/${id}`)}
          >
            <img src={pdfIcon} alt="" />
            <p className="font-poppins text-[16px] text-[#7c7c7c] underline">
              Baixar resultados
            </p>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <ReachedIndicators
              challenge={parseFloat(challengePercentage.toFixed(0))}
              goal={parseFloat(goalPercentage.toFixed(0))}
              supergoal={parseFloat(superGoalPercentage.toFixed(0))}
              totalPercentage={parseFloat(totalPercentage.toFixed(0))}
            />
            <NotReachedIndicatorCard
              notReachedIndicatorCardData={notReachedIndicators}
            />
          </div>
        </div>
      </div>
      <Graph graphData={graphData} fullWidth={true} />
    </div>
  );
};

export default Profile;
