import { useEffect, useState } from "react";
import { GraphModel } from "./GraphModel";

const useGraphViewModel = (model: GraphModel) => {
  const [graph, setGraph] = useState<GraphModel>(model);
  const [labels, setLabels] = useState<Array<string>>([]);

  useEffect(() => {
    setGraph(model);

    getLabels();
  }, [model]);

  const getLabels = () => {
    const months = [
      "Jan", // 0
      "Fev", // 1
      "Mar", // 2
      "Abr", // 3
      "Mai", // 4
      "Jun", // 5
      "Jul", // 6
      "Ago", // 7
      "Set", // 8
      "Out", // 9
      "Nov", // 10
      "Dez", // 11
    ] as Array<string>;

    const today = new Date();
    const newLabel = [];

    let aux;

    for (let i = 6; i > 0; i -= 1) {
      aux = new Date(today.getFullYear(), today.getMonth() - i, 1);

      const month = months[aux.getMonth()];
      newLabel.push(month);
    }

    setLabels(newLabel);
  };
  return {
    graph,
    labels,
  };
};

export default useGraphViewModel;
