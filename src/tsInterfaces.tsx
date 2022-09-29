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

interface CardHeadlineProps extends TextProps {
  deckSize: number;
  infobox?: boolean;
}

interface ImageProps {
  src: string;
  alt: string;
}

interface DataList extends Array<ButtonProps> {}

interface ButtonGroupProps {
  buttons: DataList;
  disabled: Boolean;
}
