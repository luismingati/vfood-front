interface IndicatorCard {
  name: string;
  weight: number;
  progress: number;
  goal: number;
  superGoal: number;
  challenge: number;
}

interface IndicatorsSummaryModel {
  indicatorsArray: Array<IndicatorCard>;
  thisMonth: boolean;
}
