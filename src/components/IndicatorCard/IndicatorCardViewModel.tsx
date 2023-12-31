import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useIndicatorCardViewModel = (model: IndicatorCardModel) => {
  const [indicatorCard, setIndicatorCard] = useState<IndicatorCardModel>(model);

  const [editIndicatorModalFlag, setEditIndicatorModalFlag] = useState(false);
  const [editResultsModalFlag, setEditResultsModalFlag] = useState(false);

  const [unitOptionsFlag, setUnitOptionsFlag] = useState(false);
  const [unit, setUnit] = useState("");
  const [name, setName] = useState(indicatorCard.name.toString());
  const [weight, setWeight] = useState(indicatorCard.weight.toString());
  const [goal, setGoal] = useState(indicatorCard.goal.toString());
  const [superGoal, setSuperGoal] = useState(
    indicatorCard.superGoal.toString()
  );
  const [challenge, setChallenge] = useState(
    indicatorCard.challenge.toString()
  );

  const [progressNow, setProgressNow] = useState(999);
  const [progressColor, setProgressColor] = useState("#D9D9D9");

  useEffect(() => {
    setIndicatorCard(model);

    if (unit == "") {
      if (parseInt(indicatorCard.unit) == 0) {
        setUnit("Número");
      } else if (parseInt(indicatorCard.unit) == 1) {
        setUnit("Financeiro");
      } else {
        setUnit("Percentual");
      }
    }

    // Condicional para setar as cores e o progresso do indicador
    if (indicatorCard.progress < indicatorCard.goal) {
      setProgressNow(0);
      setProgressColor("#A3A3A3");
    } else if (indicatorCard.progress < indicatorCard.superGoal) {
      setProgressNow(1);
      setProgressColor("#AC72C1");
    } else if (indicatorCard.progress < indicatorCard.challenge) {
      setProgressNow(2);
      setProgressColor("#32B97C");
    } else {
      setProgressNow(3);
      setProgressColor("#6186D3");
    }
  }, [
    model,
    indicatorCard.thisMonth,
    indicatorCard.unit,
    indicatorCard.progress,
    indicatorCard.goal,
    indicatorCard.superGoal,
    indicatorCard.challenge,
    unit,
  ]);

  // Função para fechar o modal de editar indicador no background
  const handleOverlayClickEditIndicator = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setEditIndicatorModalFlag(false);
      }
    },
    []
  );

  // Função para fechar o modal de editar progresso do indicador no background
  const handleOverlayClickEditResults = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setEditResultsModalFlag(false);
      }
    },
    []
  );

  // Função para abrir ou fechar o modal de edição do indicador
  const changeEditIndicatorModalFlag = () =>
    setEditIndicatorModalFlag(!editIndicatorModalFlag);

  // Função para abrir ou fechar o modal de edição de progresso do indicador
  const changeEditResultsModalFlag = () =>
    setEditResultsModalFlag(!editResultsModalFlag);

  // Função para abrir ou fechar o select das unidades de medida
  const changeUnitOptionsFlag = () => setUnitOptionsFlag(!unitOptionsFlag);

  // Função para setar a unidade de medida escolhida
  const changeUnit = (newUnity: string) => {
    setUnit(newUnity);
  };

  const handleEditIndicator = async () => {
    await axios
      .patch(`http://localhost:3000/indicator/${model.indicID}`, {
        name: name,
        weight: parseFloat(weight),
        type: unit == "Número" ? 0 : unit == "Financeiro" ? 1 : 2,
        meta: unit == "Número" ? parseInt(goal) : parseFloat(goal),
        supermeta:
          unit == "Número" ? parseInt(superGoal) : parseFloat(superGoal),
        desafio: unit == "Número" ? parseInt(challenge) : parseFloat(challenge),
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setEditIndicatorModalFlag(false);
    model.indicatorCardUpdateData();
  };

  const handleEditIndicatorResult = () => {
    const input = document.querySelector(
      "#indicatorNewProgress"
    ) as HTMLInputElement;

    if (input) {
      const newProgress: number = parseInt(input.value);
      const patchData = {
        progress: newProgress,
      };

      axios
        .patch(
          `http://localhost:3000/fazer/${model.colabID}/${model.indicID}`,
          patchData
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Erro ao alterr indicador:", error);
        });

      if (newProgress < indicatorCard.goal) {
        setProgressNow(0);
        setProgressColor("#A3A3A3");
      } else if (newProgress < indicatorCard.superGoal) {
        setProgressNow(1);
        setProgressColor("#AC72C1");
      } else if (newProgress < indicatorCard.challenge) {
        setProgressNow(2);
        setProgressColor("#32B97C");
      } else {
        setProgressNow(3);
        setProgressColor("#6186D3");
      }

      setEditResultsModalFlag(false);
      model.indicatorCardUpdateData();
    }
  };

  return {
    indicatorCard,
    editIndicatorModalFlag,
    changeEditIndicatorModalFlag,
    editResultsModalFlag,
    changeEditResultsModalFlag,
    unitOptionsFlag,
    changeUnitOptionsFlag,
    unit,
    changeUnit,
    handleEditIndicator,
    handleEditIndicatorResult,
    progressNow,
    progressColor,
    setName,
    setWeight,
    setGoal,
    setSuperGoal,
    setChallenge,
    handleOverlayClickEditIndicator,
    handleOverlayClickEditResults,
  };
};

export default useIndicatorCardViewModel;
