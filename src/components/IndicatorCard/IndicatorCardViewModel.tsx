import { useEffect, useState } from "react";
import axios from "axios";

const useIndicatorCardViewModel = (model: IndicatorCardModel) => {
  const [indicatorCard, setIndicatorCard] = useState<IndicatorCardModel>(model);

  const [editIndicatorModalFlag, setEditIndicatorModalFlag] = useState(false);
  const [editResultsModalFlag, setEditResultsModalFlag] = useState(false);

  const [unitOptionsFlag, setUnitOptionsFlag] = useState(false);
  const [unit, setUnit] = useState(indicatorCard.unit);

  const [progressNow, setProgressNow] = useState(999);
  const [progressColor, setProgressColor] = useState("#D9D9D9");

  useEffect(() => {
    setIndicatorCard(model);

    // Condicional para setar as cores e o progresso do indicador
    if (!indicatorCard.thisMonth) {
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
    }
  }, [
    indicatorCard.challenge,
    indicatorCard.goal,
    indicatorCard.progress,
    indicatorCard.superGoal,
    indicatorCard.thisMonth,
    model,
  ]);

  // Função para abrir ou fechar o modal de edição do indicador
  const changeEditIndicatorModalFlag = () =>
    setEditIndicatorModalFlag(!editIndicatorModalFlag);

  // Função para abrir ou fechar o modal de edição de progresso do indicador
  const changeEditResultsModalFlag = () =>
    setEditResultsModalFlag(!editResultsModalFlag);

  // Função para abrir ou fechar o select das unidades de medida
  const changeUnitOptionsFlag = () => setUnitOptionsFlag(!unitOptionsFlag);

  // Função para setar a unidade de medida escolhida
  const changeUnit = (newUnity: string) => setUnit(newUnity);

  const handleEditIndicator = () => {
    // Função que atualiza as informações do indicador
    // 1. Pegar o valor de todos os inputs
    // 2. Criar um indicador auxiliar com os valores dos inputs
    // 3. Trocar o indicador desatualizado pelo indicador auxiliar
  };

  const handleEditIndicatorResult = () => {
    const input = document.querySelector(
      "#indicatorNewProgress"
    ) as HTMLInputElement;

    if (input) {
      const newProgress : number = parseInt(input.value);
      const patchData = {
        progress: newProgress
      };
      axios.patch(`http://localhost:3000/fazer/${model.colabID}/${model.indicID}`, patchData)
      .then((response) => {
      })
      .catch((error) => {
        console.error("Erro ao alterr indicador:", error);
      });
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
  };
};

export default useIndicatorCardViewModel;
