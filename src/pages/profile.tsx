import React, { useState, useEffect } from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import ColaboratorHeader from "../components/ColaboratorHeader/ColaboratorHeader";
import IndicatorsSummary from "../components/IndicatorsSummary/IndicatorsSummary";
import NotReachedIndicatorCard from "../components/NotReachedIndicatorCard/NotReachedIndicatorCard";
import Graph from "../components/Graph/Graph";
import ReachedIndicators from "../components/ReachedIndicators/ReachedIndicators";
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

const findProgressForIndicator = (indicatorId: number, arrays: (Meta[])[]): number => {
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
}

interface NotReachedIndicatorCardData {
  name: string;
  month: string;
  score: number;
}
const mapNotReachedIndicatorsToFrontend = (backendData: BackendData): Array<NotReachedIndicatorCardData> => {
  return backendData.notCompleted.map((item: Meta) => ({
      name: backendData.indicators.find((indicator) => indicator.id === item.indicatorID)?.name || '',
      month: '',
      score: item.progress || 0
  }));
};

const mapBackendNames = (backendData: BackendData): Array<IndicatorCard> => {
  return backendData.indicators.map((indicator: Indicator) => {
    const progress = findProgressForIndicator(indicator.id, [
      backendData.metas, 
      backendData.supermetas, 
      backendData.desafios, 
      backendData.notCompleted
    ]);

    return {
      name: indicator.name,
      weight: indicator.weight,
      progress: progress,
      unit: "",  
      goal: indicator.meta,
      superGoal: indicator.supermeta,
      challenge: indicator.desafio
    };
  });
};


const Profile: React.FC<ProfileProps> = () => {
  const { id } = useParams<{id: string}>();
  interface ColaboratorData {
    name: string;
    area: string;
    grade: number;
  }

  const [data, setData] = useState<ColaboratorData>({} as ColaboratorData);
  const [indicatorsArray, setIndicatorsArray] = useState<Array<IndicatorCard>>([]);
  const [challengePercentage, setChallengePercentage] = useState(0);
  const [goalPercentage, setGoalPercentage] = useState(0);
  const [superGoalPercentage, setSuperGoalPercentage] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [notReachedIndicators, setNotReachedIndicators] = useState<Array<NotReachedIndicatorCardData>>([]);

  const [valorDigitado, setValorDigitado] = useState("");
  const handleSearch = (value: string) => {
    setValorDigitado(value);
  };

  const fetchColaboratorData = async (date: Date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    try {
      const response = await axios.get(`http://localhost:3000/colaborator/${id}?month=${month}&year=${year}`);
      const transformedData = mapBackendNames(response.data);
      const challengePercentage = (response.data.desafios.length / response.data.indicators.length) * 100 || 0;
      const goalPercentage = (response.data.metas.length / response.data.indicators.length) * 100 || 0;
      const superGoalPercentage = (response.data.supermetas.length / response.data.indicators.length) * 100 || 0;
      const notReachedIndicators = mapNotReachedIndicatorsToFrontend(response.data);

      setData(response.data); 
      setIndicatorsArray(transformedData);
      setNotReachedIndicators(notReachedIndicators);
      setChallengePercentage(challengePercentage);
      setGoalPercentage(goalPercentage);
      setSuperGoalPercentage(superGoalPercentage);
      setTotalPercentage((challengePercentage + goalPercentage + superGoalPercentage));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMonthChange = (date: Date) => {
    fetchColaboratorData(date);
  };

  useEffect(() => {
    fetchColaboratorData(new Date());
  }, [id]);

  return (
    <div className="flex flex-1 flex-col justify-between h-full w-full bg-white rounded-[20px] py-9 px-12">
      <Searchbar colaborators={colaboratorsArray} onSearch={handleSearch} />
      <ColaboratorHeader name={data.name} role={data.area} stars={data.grade} onMonthChange={handleMonthChange}/>
      
      <div className="flex gap-10">
        <div className="w-full">
          <IndicatorsSummary
            indicatorsArray={indicatorsArray}
            thisMonth={true}
          />
        </div>
        <div className="flex flex-col items-end w-full">
          <p className="h-[36px]">Baixar</p>
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
      <Graph graphData={graphData} fullWidth={true} />
    </div>
  );
};

export default Profile;

interface ProfileProps {}
