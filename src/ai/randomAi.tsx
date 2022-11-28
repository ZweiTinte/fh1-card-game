import { FIELDS } from "../consts";

export class RandomAi implements Ai {
  name: string = "Random";
  learning: boolean = false;

  learn() {}

  getAiResponse(card: CarData) {
    console.log("random ai");
    return FIELDS[Math.floor(Math.random() * 6)];
  }
}
