import { navigate } from "gatsby";
import * as React from "react";
import Button from "../atoms/button";
import Headline from "../atoms/headline";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Headline text={"Menu"} style="sidebarHeadline" />
      <Button
        color={"sidebarButton"}
        onClick={() => navigate("/")}
        text={"New Game"}
      />
    </div>
  );
};

export default Sidebar;
