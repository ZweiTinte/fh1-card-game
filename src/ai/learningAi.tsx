import { FIELDS, LOSE, WIN } from "../consts";

interface CarFields {
  topspeed: number;
  power: number;
  acceleration: number;
  weight: number;
  cylinder: number;
  torgue: number;
}

function increaseFieldChance(
  field: string,
  winLoss: string,
  aiCard: AiData
): AiData {
  if (winLoss === LOSE) {
    aiCard[field as keyof CarFields].win++;
  } else if (winLoss === WIN) {
    aiCard[field as keyof CarFields].lose++;
  } else {
    aiCard[field as keyof CarFields].win++;
    aiCard[field as keyof CarFields].lose++;
  }
  return aiCard;
}

function getBestField(aiCardData: AiData): string {
  let winnerFields: { field: string; winChance: number }[] = [];
  for (const [key, value] of Object.entries(aiCardData)) {
    if (key !== "id") {
      const winChance = value.win / (value.win + value.lose);
      if (winnerFields.length === 0) {
        winnerFields = winnerFields.concat([
          { field: key, winChance: winChance },
        ]);
      } else {
        if (winChance > winnerFields[0].winChance) {
          winnerFields = [{ field: key, winChance: winChance }];
        } else if (winChance === winnerFields[0].winChance) {
          winnerFields = winnerFields.concat([
            { field: key, winChance: winChance },
          ]);
        }
      }
    }
  }
  if (winnerFields.length > 1) {
    return winnerFields[Math.floor(Math.random() * winnerFields.length)].field;
  } else {
    return winnerFields[0].field;
  }
}

export class LearningAi implements Ai {
  name: string = "Learning";
  learning: boolean = true;
  data: AiData[] = [];

  learn(field: string, winLoss: string, card: CarData) {
    const aiCardData = this.data.find((c) => c.id === card.id);
    if (aiCardData) {
      this.data = this.data.map((aiCard) => {
        if (aiCard.id === aiCardData.id) {
          console.log("first increase", field, winLoss, aiCardData);
          return increaseFieldChance(field, winLoss, aiCardData);
        }
        return aiCard;
      });
    } else {
      const newAiData: AiData = {
        id: card.id,
        topspeed: { value: card.topspeed, win: 1, lose: 1 },
        power: { value: card.power, win: 1, lose: 1 },
        acceleration: { value: card.acceleration, win: 1, lose: 1 },
        weight: { value: card.weight, win: 1, lose: 1 },
        cylinder: { value: card.cylinder, win: 1, lose: 1 },
        torgue: { value: card.torgue, win: 1, lose: 1 },
      };
      console.log("second increase", field, winLoss, newAiData);
      this.data = this.data.concat([
        increaseFieldChance(field, winLoss, newAiData),
      ]);
    }
    console.log(this.data);
  }

  getAiResponse(card: CarData) {
    console.log("learning ai");

    const aiCardData = this.data.find((c) => c.id === card.id);
    if (aiCardData) {
      return getBestField(aiCardData);
    }
    return FIELDS[Math.floor(Math.random() * 6)];
  }
}
