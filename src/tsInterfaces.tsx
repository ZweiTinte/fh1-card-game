interface TextProps {
  text: string;
}

interface CardProps {
  deckSize: number;
}

interface ButtonProps extends TextProps {
  onClick: (params: any) => any;
}

interface CardHeadlineProps extends TextProps {
  deckSize: number;
}

interface ImageProps {
  src: string;
  alt: string;
}

interface DataList extends Array<ButtonProps> {}

interface ButtonGroupProps {
  buttons: DataList;
}

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
