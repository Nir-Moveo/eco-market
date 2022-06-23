import * as React from "react";
import { Component } from "react";
import { getItemsByCategory, getItemsByGroup } from "../../../services/monday.api";
import { Categories, Groups, ICardList } from "../../../types/types";
import MenuItem from "../components/MenuItem";
import { SideBar, SideTitle, BottomBar } from "./SideMenuStyle";

interface SideMenuProps {
  cards: ICardList;
  setCards(cards: ICardList): void;
}

const SideMenu: React.FC<SideMenuProps> = (props: SideMenuProps) => {
  const { cards, setCards } = props;

  const categoryList = Object.keys(Categories);
  const subCategoryList = [
    { itemName: "Wishlist", itemIcon: "Wishlist" },
    { itemName: "Personal page", itemIcon: "Personal" },
  ];

  const selectCategory = async (category: Categories) => {
    const newCards =
      (category as String) === "All"
        ? await getItemsByGroup(Groups.Active)
        : await getItemsByCategory(category, Groups.Active);

    setCards(newCards);
  };
  return (
    <SideBar>
      <SideTitle>Menu</SideTitle>
      {categoryList.map((category, index) => (
        <div
          className="menu-item-container"
          key={`menu-item-${index}`}
          onClick={() => selectCategory(category as Categories)}
        >
          <MenuItem key={index} itemName={category} itemIcon={category} />
        </div>
      ))}
      <BottomBar>
        {subCategoryList.map((cat, index) => (
          <MenuItem key={index} itemName={cat.itemName} itemIcon={cat.itemIcon} />
        ))}
      </BottomBar>
    </SideBar>
  );
};

export default SideMenu;
