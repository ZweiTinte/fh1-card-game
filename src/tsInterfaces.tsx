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
  deck: CarData[];
  hidden: boolean;
  disabled: boolean;
  compareFields: (params: string) => void;
  highlight: string[];
}

interface ButtonProps extends TextProps {
  color?: string;
  onClick: (params: any) => void;
}

interface InfoListProps extends TextProps {
  list: CarData[];
}

interface ImageProps {
  src: string;
  alt: string;
}

interface ButtonGroupProps {
  buttons: ButtonProps[];
  disabled: boolean;
}

interface CardSectionProps {
  plCards: CarData[];
  showResults: boolean;
  playerTurn: boolean;
  gameEnded: boolean;
  colors: PlayerColors;
  opCards: CarData[];
  setWinLoss: (field: string, winLoss: string[]) => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CardSubSectionProps {
  showResults: boolean;
  playerTurn: boolean;
  bonus: CarData[];
  next: () => void;
  gameEnded: boolean;
}

interface GameAreaProps {
  gameEnded: boolean;
  playerTurn: boolean;
  showResults: boolean;
  colors: PlayerColors;
  opCards: CarData[];
  plCards: CarData[];
  setWinLoss: (field: string, winLoss: string[]) => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  bonus: CarData[];
  next: () => void;
}

interface PlayerColors {
  plColor: string[];
  opColor: string[];
}

interface Game {
  deckSize: number;
  ai: Ai;
}

interface GameProps {
  game: Game;
  setGame?: (newGame: Game) => void;
}
