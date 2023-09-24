export enum GoalsTypes {
  GOAL = "GOAL",
  SUPERGOAL = "SUPERGOAL",
  CHALLENGE = "CHALLENGE",
  NOT_REACHED = "NOT_REACHED",
}

export interface CardHighlightProps {
  metaType: GoalsTypes;
  altText?: string;
  count: number;
  message: string;
}
