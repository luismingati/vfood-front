export enum GoalsTypes {
  GOAL = "GOAL",
  SUPERGOAL = "SUPERGOAL",
  CHALLENGE = "CHALLENGE",
  NOT_REACHED = "NOT_REACHED",
}

interface Data {
  id: number
  name: string
  area: string
  grade: number
}

export interface CardHighlightProps {
  metaType: GoalsTypes;
  altText?: string;
  count: number;
  message: string;
  data: Array<Data>
}
