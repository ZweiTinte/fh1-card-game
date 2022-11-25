import { FIELDS } from "../consts";

export class RandomAi implements Ai {
  name: string = "Random";

  getAiResponse() {
    return FIELDS[Math.floor(Math.random() * 6)];
  }
}
