interface Ai {
  name: string;
  learning: boolean;
  data?: AiData[] | [];
  learn: (field: string, winLoss: string, cardId: CarData) => void;
  getAiResponse: (card: CarData) => string;
}

interface WinChance {
  value: number;
  win: number;
  lose: number;
}

interface AiData {
  id: number;
  topspeed: WinChance;
  power: WinChance;
  acceleration: WinChance;
  weight: WinChance;
  cylinder: WinChance;
  torgue: WinChance;
}
