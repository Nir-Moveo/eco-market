import * as React from "react";
import { ItemTitle,ItemIcon } from "./MenuItemStyle";
interface MenuItemProps {
  itemName: string;
  itemIcon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ itemName, itemIcon }) => {
  const formatName = (name: string) => {
    return name.replaceAll("_", " ");
  };
  return (
    <>
      {/* <ItemIcon src={require("../assets/" + `${itemIcon}` + ".svg")} /> */}
      {/* <ItemIcon
src={require("../assets/" + `${itemIcon}` + ".svg")}
onError={({ currentTarget }) => {
currentTarget.onerror = null;
currentTarget.src = require("../assets/" + `${'exit'}` + ".svg");
}}
/> */}
      <ItemTitle>{formatName(itemName)}</ItemTitle>
    </>
  );
};

export default MenuItem;
