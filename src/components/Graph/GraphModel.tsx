interface GraphData {
  nGoal: number;
  nSuperGoal: number;
  nChallenge: number;
  nFailed: number;
}

export interface GraphModel {
  graphData: Array<GraphData>;
  fullWidth: boolean;
}
