interface CarData {
  id: number;
  year: number;
  brand: string;
  model: string;
  topspeed: number;
  power: number;
  acceleration: number;
  weight: number;
  cylinder: number;
  torgue: number;
  img: string;
}

interface TextProps {
  text: string;
}

interface CardProps {
  deck: Array<CarData>;
  hidden: Boolean;
  disabled: Boolean;
  compareFields: (params: string) => void;
  highlight: Array<string>;
}

interface ButtonProps extends TextProps {
  color: string;
  onClick: (params: any) => void;
}

interface InfoListProps extends TextProps {
  list: Array<CarData>;
}

interface HeadlineProps extends TextProps {
  deckSize?: number;
  style?: string;
}

interface ImageProps {
  src: string;
  alt: string;
}

interface ButtonGroupProps {
  buttons: Array<ButtonProps>;
  disabled: Boolean;
}

interface CardSectionProps {
  playerCards: Array<CarData>;
  showResults: Boolean;
  playerTurn: Boolean;
  plColor: Array<string>;
  opColor: Array<string>;
  opponentCards: Array<CarData>;
  setWinLoss: (field: string, winLoss: string[]) => void;
  setShowResults: React.Dispatch<React.SetStateAction<Boolean>>;
}

interface CardSubSectionProps {
  showResults: Boolean;
  playerTurn: Boolean;
  bonus: Array<CarData>;
  next: () => void;
}
