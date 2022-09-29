import * as React from "react";
import CardHeadline from "../atoms/cardHeadline";
import ListItem from "../atoms/listItem";

const InfoList = ({ text, list }: InfoListProps) => {
  return (
    <div className="card">
      <CardHeadline text={text} deckSize={list.length} infobox />
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
