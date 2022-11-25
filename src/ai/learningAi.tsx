import { FIELDS } from "../consts";

interface CarFields {
  topspeed: number;
  power: number;
  acceleration: number;
  weight: number;
  cylinder: number;
  torgue: number;
}

function getCardObject(card: CarData): CarFields {
  let topspeed, power, acceleration, weight, cylinder, torgue;
  return ({ topspeed, power, acceleration, weight, cylinder, torgue } = card);
}

export class LearningAi implements Ai {
  name: string = "Learning";

  getAiResponse(card: CarData) {
    console.log("learning ai");

    console.log(getCardObject(card));
    return FIELDS[Math.floor(Math.random() * 6)];
  }
}
