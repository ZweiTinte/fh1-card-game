interface ButtonProps {
  text: string;
  onClick: (params: any) => any;
}

interface DataList extends Array<ButtonProps> {}

interface ButtonGroupProps {
  buttons: DataList;
}
