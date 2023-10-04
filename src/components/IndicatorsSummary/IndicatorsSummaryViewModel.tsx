import { useEffect, useState } from "react";

const useIndicatorsSummaryViewModel = (model: IndicatorsSummaryModel) => {
  const [indicatorsSummary, setIndicatorsSummary] =
    useState<IndicatorsSummaryModel>(model);

  const [modalFlag, setModalFlag] = useState(false);
  const [indicatorModalStep, setIndicatorModalStep] = useState(0);

  const [unitOptionsFlag, setUnitOptionsFlag] = useState(false);
  const [unit, setUnit] = useState("");

  const [indicatorsSearchResultsArray, setIndicatorsSearchResultsArray] =
    useState<Array<IndicatorCard>>([]);
  const [indicatorsSearchValue, setIndicatorsSearchValue] = useState("");

  useEffect(() => {
    setIndicatorsSummary(model);
  }, [model]);

  // Funções para abrir e fechar o modal
  const openModal = () => setModalFlag(true);
  const closeModal = () => setModalFlag(false);

  // Função para mudar a etapa do modal
  const changeModalStep = (step: number) => setIndicatorModalStep(step);

  // Função para abrir ou fechar o select das unidades de medida
  const changeUnitOptionsFlag = () => setUnitOptionsFlag(!unitOptionsFlag);

  // Função para setar a unidade de medida escolhida
  const changeUnit = (newUnity: string) => setUnit(newUnity);

  // Função para mostrar opções de indicadores coerentes com a busca
  const handleSearchIndicators = (e: React.FormEvent<HTMLInputElement>) => {
    setIndicatorsSearchValue(e.currentTarget.value);

    if (indicatorsSearchValue != "") {
      const result = indicatorsSummary.indicatorsArray.filter((indicator) =>
        indicator.name.includes(indicatorsSearchValue)
      );

      setIndicatorsSearchResultsArray(result);
    } else {
      setIndicatorsSearchResultsArray([]);
    }
  };

  // Função para escolher o indicador ao clicar na opção
  const handleChangeInputValue = (indicatorName: string) => {
    setIndicatorsSearchValue(indicatorName);
    setIndicatorsSearchResultsArray([]);
  };

  // Função para pegar o nome dos labels do gráfico
  const getGraphLabels = () => {
    const labelsArray = [] as Array<string>;
    indicatorsSummary.indicatorsArray.forEach((_indicator, index) => {
      labelsArray.push(`#${index + 1}`);
    });
    labelsArray.push("#0");
    return labelsArray;
  };

  // Função para pegar os dados do gráfico
  const getGraphData = () => {
    const dataArray = [0, 0, 0, 0] as Array<number>;
    // Posições do Array = [ goal, superGoal, challenge, not completed ]

    indicatorsSummary.indicatorsArray.forEach((indicator) => {
      if (indicator.progress < indicator.goal) {
        dataArray[3]++;
      } else if (indicator.progress < indicator.superGoal) {
        dataArray[0]++;
      } else if (indicator.progress < indicator.challenge) {
        dataArray[1]++;
      } else {
        dataArray[2]++;
      }
    });

    return dataArray;
  };

  const handleSaveNewIndicator = () => {
    // Função de concluir criação do novo indicador e adicionar o novo indicador ao colaborador
    // 1. Adicionar o novo indicador no DB de indicadores
    // 2. Adicionar o indicador na lista de indicadores do colaborador
    // 3. Atualizar o front para aparecer o novo indicador na lista
  };
  const handleAttachIndicator = () => {
    // Função de adicionar indicador existente ao colaborador
    // 1. Adicionar o indicador na lista de indicadores do colaborador
    // 2. Atualizar o front para aparecer o novo indicador na lista
  };

  return {
    indicatorsSummary,
    modalFlag,
    openModal,
    closeModal,
    indicatorModalStep,
    changeModalStep,
    unitOptionsFlag,
    changeUnitOptionsFlag,
    unit,
    changeUnit,
    indicatorsSearchResultsArray,
    handleSearchIndicators,
    indicatorsSearchValue,
    handleChangeInputValue,
    getGraphLabels,
    getGraphData,
    handleSaveNewIndicator,
    handleAttachIndicator,
  };
};

export default useIndicatorsSummaryViewModel;
