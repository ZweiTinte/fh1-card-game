import * as React from "react";
import Headline from "../atoms/headline";
import ListItem from "../atoms/listItem";

const InfoList = ({ text, list }: InfoListProps) => {
  return (
    <div className="card">
      <Headline text={text} deckSize={list.length} style="infoboxHeadline" />
      {list.map((listItem) => {
        return (
          <div key={listItem.id}>
            <ListItem
              text={`${listItem.year} ${listItem.brand} ${listItem.model}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default InfoList;
