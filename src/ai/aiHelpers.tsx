import { LearningAi } from "./learningAi";
import { RandomAi } from "./randomAi";

export const aiList = [
  { id: 1, value: new RandomAi() },
  { id: 2, value: new LearningAi() },
];
