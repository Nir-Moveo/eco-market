import * as React from "react";
import { Component } from "react";
import { ItemContainer, ItemIcon, ItemTitle } from "./MenuItemStyle";
interface MenuItemProps {
  itemName: string;
  itemIcon: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ itemName, itemIcon }) => {
  const formatName = (name: string) => {
    return name.replaceAll("_", " ");
  };
  return (
    <ItemContainer>
      {/* <ItemIcon src={require("../assets/" + `${itemIcon}` + ".svg")} /> */}
      <ItemTitle>{formatName(itemName)}</ItemTitle>
    </ItemContainer>
  );
};

export default MenuItem;
