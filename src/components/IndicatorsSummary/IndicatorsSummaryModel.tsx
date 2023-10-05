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

interface IndicatorsSummaryModel {
  indicatorsArray: Array<IndicatorCard>;
  thisMonth: boolean;
  colabID: number;
  profilePDF: boolean;
  updateData: () => void;
}
