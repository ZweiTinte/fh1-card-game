export const TOPSPEED: string = "topspeed";
export const POWER: string = "power";
export const ACCELERATION: string = "acceleration";
export const WEIGHT: string = "weight";
export const CYLINDER: string = "cylinder";
export const TORGUE: string = "torgue";
export const QUESTIONMARK: string = "?";
export const UNKNOWN: string = "/images/cars/unknown.jpg";
export const EMPTY: string = "";
export const WIN: string = "winState";
export const LOSE: string = "loseState";
export const EQUAL: string = "equalState";
export const FIELDS: string[] = [
  TOPSPEED,
  POWER,
  ACCELERATION,
  WEIGHT,
  CYLINDER,
  TORGUE,
];
export const LOWER_FIELDS: string[] = [ACCELERATION, WEIGHT];
export const COLORS_EMPTY: PlayerColors = {
  plColor: [EMPTY, EMPTY],
  opColor: [EMPTY, EMPTY],
};
