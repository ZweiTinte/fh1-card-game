interface ButtonProps {
  text: string;
  onClick: (params: any) => any;
}

interface ImageProps {
  src: string;
  alt: string;
}

interface DataList extends Array<ButtonProps> {}

interface ButtonGroupProps {
  buttons: DataList;
}
