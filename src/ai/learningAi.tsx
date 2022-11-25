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
  let carObject: CarFields = {
    topspeed: 0,
    power: 0,
    acceleration: 0,
    weight: 0,
    cylinder: 0,
    torgue: 0,
  };
  for (let i = 0; i < FIELDS.length; i++) {
    carObject[FIELDS[i] as keyof CarFields] = card[
      FIELDS[i] as keyof CarData
    ] as number;
  }
  return carObject;
}

export class LearningAi implements Ai {
  name: string = "Learning";

  getAiResponse(card: CarData) {
    console.log("learning ai");

    console.log(getCardObject(card));
    return FIELDS[Math.floor(Math.random() * 6)];
  }
}
